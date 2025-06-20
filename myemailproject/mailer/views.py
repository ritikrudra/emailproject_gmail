from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework import status

class SendMailView(APIView):
    def post(self, request):
        to_email = request.data.get('email')
        message = request.data.get('message')

        if not to_email or not message:
            return Response({"error": "Email and message required"}, status=400)

        try:
            send_mail(
                subject="Message from Django Mail App",
                message=message,
                from_email="assistantmng533@gmail.com",  
                recipient_list=[to_email],
                fail_silently=False,
            )
            return Response({"success": "Mail sent!"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
