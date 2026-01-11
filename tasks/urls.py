from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/tasks/', views.task_list, name='task_list'),
    path('api/tasks/<int:pk>/', views.task_detail, name='task_detail'),
]
