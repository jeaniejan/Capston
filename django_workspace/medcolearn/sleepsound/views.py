from django.shortcuts import render
from rest_framework import viewsets
from .models import Sound
from .serializers import SoundSerializer

class MeasureView(viewsets.ModelViewSet):
     queryset = Sound.objects.all()
     serializer_class = Sound