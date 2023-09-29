from django.db import models
from django.contrib.postgres.fields import ArrayField
from Auth.models import users


# Create your models here.
class Preferences(models.Model) : 
    user = models.ForeignKey(users, on_delete=models.CASCADE, null=True) 
    jobs_platform = ArrayField(models.CharField(max_length=200), null=True)
    
    

class FavJob(models.Model) :
    job_title = models.CharField(max_length=600, null=True)
    job_link = models.CharField(max_length=600, null=True)  
    job_company = models.CharField(max_length=600, null=True)
    job_location = models.CharField(max_length=600, null=True)
    company_icon = models.CharField(max_length=600, null=True)
    listdate = models.CharField(max_length=600, null=True) 
    user = models.ForeignKey(users, on_delete=models.CASCADE, null=True) 