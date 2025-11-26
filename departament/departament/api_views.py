from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token

class LoginAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful", 
                "user": user.username,
                "token": token.key
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPI(APIView):
    def post(self, request):
        # Delete the token to force logout
        if request.user.is_authenticated:
            request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
