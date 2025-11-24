from django.shortcuts import render, redirect
from django.views import View
from .models import Killer, KillerPhoto
from .forms import KillerForm, KillerPhotoForm
from django.views.generic import ListView, DeleteView, CreateView, DetailView
from django.urls import reverse_lazy
from django.forms import inlineformset_factory # <--- IMPORTANTE

KillerPhotoFormSet = inlineformset_factory(
    Killer,             
    KillerPhoto,        
    fields=['image'],   
    extra=3,            
    can_delete=True     
)

class KillerList(ListView):
    model = Killer
    template_name = "killer/list.html"
    context_object_name = "killers"
    
    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.GET.get('search')
        status = self.request.GET.get('status')
        
        if search:
            queryset = queryset.filter(
                name__icontains=search
            ) | queryset.filter(
                nickname__icontains=search
            ) | queryset.filter(
                crimes__icontains=search
            )
        
        if status:
            queryset = queryset.filter(status=status)
            
        return queryset.order_by('-created_at')


class KillerCreate(CreateView):
    model = Killer
    fields = ['name', 'nickname', 'danger_level', 'crimes', 'status']
    template_name = 'killer/create.html'
    success_url = reverse_lazy('killer-list')

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['photos_formset'] = None 
        return data
        
class KillerDetail(DetailView):
    model = Killer
    template_name = "killer/detail.html"
    context_object_name = "killer"

class KillerUpdate(View):
    def get(self, request, pk):
        killer = Killer.objects.get(pk=pk)

        form = KillerForm(instance=killer)
        photos_formset = KillerPhotoFormSet(instance=killer)

        return render(request, "killer/create.html", {
            "form": form,
            "photos_formset": photos_formset,
            "killer": killer,
        })

    def post(self, request, pk):
        killer = Killer.objects.get(pk=pk)

        form = KillerForm(request.POST, instance=killer)
        photos_formset = KillerPhotoFormSet(
            request.POST,
            request.FILES,
            instance=killer
        )

        if form.is_valid() and photos_formset.is_valid():
            form.save()
            photos_formset.save()
            return redirect("killer-update", pk=killer.pk)   

        return render(request, "killer/update.html", {
            "form": form,
            "photos_formset": photos_formset,
            "killer": killer,
        })

class KillerDelete(DeleteView):
    model = Killer
    template_name = "killer/delete.html"
    success_url = reverse_lazy("killer-list")