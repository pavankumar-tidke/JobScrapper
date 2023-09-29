from django.shortcuts import render, redirect
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseServerError  
from Auth.models import users
from .models import Preferences, FavJob
from faker import Faker
from Main.globals import GLOBALS 
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from Scrapper_engine.scrappers import linkedin
import json, random, typesense 
ph = PasswordHasher()
g = GLOBALS()

# Create your views here.

# dashboard
def dashboard_page(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth') 
    
    user_id = g.getUserSession(request, g.session_name)['id']
    userDetails = users.objects.get(id=user_id)
    return render(request, 'pages/dashboard.html', {'userDetails': userDetails})

def scrapper_page(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth') 
    
    user_id = g.getUserSession(request, g.session_name)['id']
    userDetails = users.objects.get(id=user_id)
    return render(request, 'pages/scrapper.html', {'userDetails': userDetails})

def favourite_page(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth') 
    
    user_id = g.getUserSession(request, g.session_name)['id']
    userDetails = users.objects.get(id=user_id)
    return render(request, 'pages/fav.html', {'userDetails': userDetails})

def preference_page(request) :
    if (g.session_name not in request.session) :
        return redirect('/auth') 
    
    user_id = g.getUserSession(request, g.session_name)['id']
    userDetails = users.objects.get(id=user_id)
    return render(request, 'pages/preference.html', {'userDetails': userDetails})


'''JOB SCRRAPPING PORCESS  '''
@csrf_exempt
def job_scrapper_process(request) :
    try: 
        skill = request.POST.get('skill')
        location = request.POST.get('location')
        scrapped_jobs = {}
        linkedin_jobs = linkedin(skill=skill, location=location)
        scrapped_jobs.update({'linkedin': linkedin_jobs})
        
        return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'data': {'alertMsg': 'Job Scrapping done !', 'results': scrapped_jobs, 'redirect_url': None}}))  
        
    except Exception as e:
        return HttpResponse(json.dumps({'success': False, 'errorMsg': True, 'data': {'alertMsg': f'Exception --> {e}', 'redirect_url': None}}))  


@csrf_exempt
def add_to_fav(request) :
    try :
        user_id = g.getUserSession(request, g.session_name)['id'] 
        job_title = request.POST.get('job_title')
        job_company = request.POST.get('company_name')
        job_location = request.POST.get('location')
        job_link = request.POST.get('apply_link') 
        listdate = request.POST.get('listdate') 
        company_icon = request.POST.get('company_icon')
         
        fav_job = FavJob.objects.create(user_id=user_id, job_title=job_title, job_company=job_company, job_location=job_location, job_link=job_link, listdate=listdate, company_icon=company_icon)
        
        return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'data': {'alertMsg': 'Job added to favourite !', 'redirect_url': None}}))

    except Exception as e:
        return HttpResponse(json.dumps({'success': False, 'errorMsg': True, 'data': {'alertMsg': f'Exception --> {e}', 'redirect_url': None}}))
        


@csrf_exempt
def view_fav(request) :
    try :
        user_id = g.getUserSession(request, g.session_name)['id'] 
        fav_jobs = FavJob.objects.filter(user_id=user_id)
        serialized_jobs = serializers.serialize('json', fav_jobs)
        return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'data': {'alertMsg': 'Favourite Jobs !', 'results': serialized_jobs, 'redirect_url': None}}))

    except Exception as e:
        return HttpResponse(json.dumps({'success': False, 'errorMsg': True, 'data': {'alertMsg': f'Exception --> {e}', 'redirect_url': None}}))

@csrf_exempt
def delete_fav(request) :
    try :
        user_id = g.getUserSession(request, g.session_name)['id'] 
        job_id = request.POST.get('pk') 
        fav_job = FavJob.objects.get(id=job_id)
        fav_job.delete()
        
        return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'data': {'alertMsg': 'Job deleted from favourite !', 'redirect_url': None}}))

    except Exception as e:
        return HttpResponse(json.dumps({'success': False, 'errorMsg': True, 'data': {'alertMsg': f'Exception --> {e}', 'redirect_url': None}}))



# de-ativate account
@csrf_exempt
def accStatus(request) :
    try: 
        
        user_id = g.getUserSession(request, g.session_name)['id']
        
        if request.POST.get('SqOXvChEZ9GB') == 'deactive' : 
            user_info = users.objects.get(id=user_id) 
            user_info.activate = False
            user_info.save() 
                
            return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'data': {'alertMsg': 'Account Deactivated !'}}))

        else : 
            user_info = users.objects.get(id=user_id) 
            user_info.activate = True
            user_info.save() 
            
            return HttpResponse(json.dumps({'success': True, 'errorMsg': False, 'data': {'alertMsg': 'Account Activated !'}}))
        
    except Exception as e:
        return HttpResponse(json.dumps({'success': False, 'errorMsg': True, 'data': {'alertMsg': f'Exception - {e}', 'redirect_url': None}}))  
      