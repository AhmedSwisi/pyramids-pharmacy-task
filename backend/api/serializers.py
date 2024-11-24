from django.contrib.auth.models import User
from .models import Medication, Manufacturer, RefillRequest
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

class RegisterSerializer(serializers.ModelSerializer):
    
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username','email','password','password_confirm']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password":"passwords do not match"})
        return data 
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class MedicationSerializer(serializers.ModelSerializer):

    manufacturer_name = serializers.StringRelatedField(source='manufacturer')
    manufacturer_id = serializers.PrimaryKeyRelatedField(source='manufacturer', read_only=True)
    class Meta:
        model = Medication
        fields = ['id','name','description','manufacturer_id','manufacturer_name']

class RefillRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = RefillRequest
        fields = '__all__'
        read_only_fields = ['user','requested_at','status']