from django.shortcuts import render, redirect
from django.contrib import messages
from django.views import View
from django.views.generic import ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import PoliceOfficer
from .forms import PoliceOfficerForm
from django.urls import reverse_lazy
from django.http import FileResponse, Http404
from django.db.models import Q
from .consts import DEPARTMENTS, STATUS


class PoliceOfficerList(LoginRequiredMixin, ListView):
    model = PoliceOfficer
    context_object_name = "officers"
    template_name = "police/list.html"
    paginate_by = 10 

    def get_queryset(self):
        queryset = super().get_queryset()
        
        search_query = self.request.GET.get('search')
        department = self.request.GET.get('department')
        status = self.request.GET.get('status')

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(badge_number__icontains=search_query)
            )

        if department:
            queryset = queryset.filter(department=department)

        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        context['departments'] = DEPARTMENTS
        context['status_choices'] = STATUS
        
        return context


class PoliceOfficerCreate(LoginRequiredMixin, View):
    def get(self, request):
        form = PoliceOfficerForm()
        return render(request, "police/create.html", {"form": form})

    def post(self, request):
        form = PoliceOfficerForm(request.POST, request.FILES)

        if form.is_valid():
            try:
                form.save()
                return redirect("police-list")
            except Exception as e:
                messages.error(request, f"Error creating officer: {str(e)}")
        else:
            messages.error(request, "Please correct the errors below.")

        return render(request, "police/create.html", {"form": form})
    
class PoliceOfficerUpdate(UpdateView):
    model = PoliceOfficer
    form_class = PoliceOfficerForm
    template_name = "police/update.html"
    context_object_name = "officer"
    success_url = reverse_lazy("police-list")
    
class OfficerPhotoView(View):
    def get(self, request, filename):
        officer = PoliceOfficer.objects.filter(photo__icontains=filename).first()

        if not officer or not officer.photo:
            raise Http404("Photo not found.")

        try:
            return FileResponse(officer.photo.open('rb'), content_type="image/jpeg")
        except FileNotFoundError:
            raise Http404("File missing on server.")
        except Exception as e:
            raise Http404(f"Error loading image: {str(e)}")
        
class PoliceOfficerDelete(LoginRequiredMixin, DeleteView):
    model = PoliceOfficer
    template_name = "police/delete.html"
    context_object_name = "officer"
    success_url = reverse_lazy("police-list")