from django.urls import path
from .views import SendMailView

urlpatterns = [
    path('send-mail/', SendMailView.as_view()),
]
