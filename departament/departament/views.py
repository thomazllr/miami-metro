from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


class Login(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("/police")  
        return render(request, "login.html")

    def post(self, request):
        usuario = request.POST.get("usuario")
        senha = request.POST.get("senha")

        user = authenticate(request, username=usuario, password=senha)

        if user is not None and user.is_active:
            login(request, user)
            return redirect("/police")

        messages.error(request, "Usuário ou senha inválidos.")
        return redirect("login")


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect("login")
    
@method_decorator(login_required(login_url='login'), name='dispatch')
class DashboardView(View):
    def get(self, request):
        return render(request, "police.html")