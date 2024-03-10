from django.urls import path 

from . import views

urlpatterns = [
     path("", views.index, name="index"),
     path("ponio", views.ponio, name="ponio"),
     path("<str:name>", views.greet, name="greet")
]