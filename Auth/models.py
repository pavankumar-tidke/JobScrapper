from django.db import models
 
 
class users(models.Model):
    name = models.CharField(max_length=50) 
    email = models.CharField(max_length=50, null=True) 
    activate = models.BooleanField(max_length=6, default=True)
    password = models.CharField(max_length=256, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    