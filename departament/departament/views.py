from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from cases.models import Case

class Login(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("dashboard")  
        return render(request, "login.html")

    def post(self, request):
        usuario = request.POST.get("usuario")
        senha = request.POST.get("senha")

        user = authenticate(request, username=usuario, password=senha)

        if user is not None and user.is_active:
            login(request, user)
            return redirect("dashboard")

        messages.error(request, "Usuário ou senha inválidos.")
        return redirect("login")


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect("login")
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardView(View):
    def get(self, request):
        total_cases = Case.objects.count()
        open_cases = Case.objects.filter(status=1).count()
        closed_cases = Case.objects.filter(status=2).count()
        cold_cases = Case.objects.filter(status=3).count()
        
        latest_cases = Case.objects.select_related('killer').prefetch_related('officers').order_by('-date_opened')[:5]
        
        context = {
            'total_cases': total_cases,
            'open_cases': open_cases,
            'closed_cases': closed_cases,
            'cold_cases': cold_cases,
            'latest_cases': latest_cases,
        }
        return render(request, "dashboard.html", context)