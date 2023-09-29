from django.urls import path
from . import views

#URLConf
urlpatterns = [

    # display pages
    path(route='', view=views.dashboard_page, name='auth_page_viewer'), 
    path(route='scrapper/', view=views.scrapper_page, name='auth_page_viewer'), 
    path(route='favourite/', view=views.favourite_page, name='auth_page_viewer'),  
    path(route='preference/', view=views.preference_page, name='auth_page_viewer'), 

    
    path(route='job_scrapper_process/', view=views.job_scrapper_process, name='job_scrapper_process'),
    path(route='add_to_fav/', view=views.add_to_fav, name='add_to_fav'),
    path(route='view_fav/', view=views.view_fav, name='view_fav'),
    path(route='delete_fav/', view=views.delete_fav, name='delete_fav'),
    path(route='accstatus/', view=views.accStatus, name='accstatus'),

    
    
]   