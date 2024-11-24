from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from django.db.models import Count, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, RegisterSerializer, MedicationSerializer, RefillRequestSerializer
from .models import Medication, RefillRequest

class HelloWorldView(APIView):
    def get(self, request):
        return Response({"message": "Hello, world!"})
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = IsAdminUser

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():

            user = serializer.save()

            authenticated_user = authenticate(username=user.username, password=request.data.get("password"))
            if authenticated_user is None:
                return Response({"error": "Authentication failed"}, status=status.HTTP_400_BAD_REQUEST)

            refresh = RefreshToken.for_user(authenticated_user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response(
                {
                    "message": "User registered successfully",
                    "access": access_token,
                    "refresh": refresh_token,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password = password)
        if user:
            refresh = RefreshToken.for_user(user= user)

            response =  Response({
                "refresh":str(refresh),
                "access":str(refresh.access_token)
            }, status=status.HTTP_200_OK)
            response.set_cookie("access_token", str(refresh.access_token), httponly=True, secure=True)
            response.set_cookie("refresh_token",str(refresh),httponly=True,secure=True)
            return response
        return Response({"message":"Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
class MedicationListView(generics.ListAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    permission_classes = [IsAuthenticated]

class RefillRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = RefillRequestSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save(user = request.user )
            return Response({"message":"Refill requested successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RefillRequestStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stats = RefillRequest.objects.values('medication__name').annotate(
            total=Count('id'),
            pending=Count('id', filter=Q(status=RefillRequest.Status.PENDING)),
            approved=Count('id', filter=Q(status=RefillRequest.Status.APPROVED)),
            rejected=Count('id', filter=Q(status=RefillRequest.Status.REJECTED))
        )

        overall_stats = RefillRequest.objects.aggregate(
            total=Count('id'),
            pending=Count('id', filter=Q(status=RefillRequest.Status.PENDING)),
            approved=Count('id', filter=Q(status=RefillRequest.Status.APPROVED)),
            rejected=Count('id', filter=Q(status=RefillRequest.Status.REJECTED))
        )

        formatted_stats = [
            {
                'medication_name': stat['medication__name'],
                'total': stat['total'],
                'pending': stat['pending'],
                'approved': stat['approved'],
                'rejected': stat['rejected']
            }
            for stat in stats
        ]

        response_data = {
            'overall': overall_stats,
            'by_medication': formatted_stats
        }

        return Response(response_data, status=status.HTTP_200_OK)
        



