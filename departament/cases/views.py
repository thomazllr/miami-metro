from django.shortcuts import render
from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Case
from .forms import CaseForm

class CaseList(ListView):
    model = Case
    template_name = 'cases/list.html'
    context_object_name = 'cases'

class CaseCreate(CreateView):
    model = Case
    form_class = CaseForm
    template_name = 'cases/create.html'
    success_url = reverse_lazy('case-list')

class CaseDetail(DetailView):
    model = Case
    template_name = 'cases/detail.html'
    context_object_name = 'case'

class CaseUpdate(UpdateView):
    model = Case
    form_class = CaseForm
    template_name = 'cases/create.html'
    success_url = reverse_lazy('case-list')

class CaseDelete(DeleteView):
    model = Case
    template_name = 'cases/delete.html'
    success_url = reverse_lazy('case-list')

