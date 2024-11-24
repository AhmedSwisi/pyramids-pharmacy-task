from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, LoginView, RegisterView, MedicationListView, RefillRequestView, RefillRequestStatsView

router = routers.DefaultRouter()
router.register(r'users',UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('medications/',MedicationListView.as_view(), name='medications'),
    path('refill-requests/', RefillRequestView.as_view(), name='refill_requests'),
    path('refill-requests/statistics/',RefillRequestStatsView.as_view(),name='refill_requests_statistics')
]