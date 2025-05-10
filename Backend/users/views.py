from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username is None or password is None:
        return Response({'error': 'Please provide username and password'}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def signups(request):
    username = request.data.get('username')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    password = request.data.get('password')
    repassword = request.data.get('repassword')
    if username is None or password is None:
        return Response({'error': 'Please provide username and password'}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    if password != repassword:
        return Response({'error': 'Password does not match'}, status=400)
    user = User.objects.create_user(
        username=username, first_name=first_name, last_name=last_name, password=password)
    return Response({'message': 'User created successfully'})
