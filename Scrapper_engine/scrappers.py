import os
import csv
import requests
from bs4 import BeautifulSoup


##############################################################################################################################
                                                    # ''' LINKED IN [START] ''' #
##############################################################################################################################

def linkedin(skill='UI/UX designer', location='US', no_of_pages=1) :
    scrapped_jobs = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
    }

    for page in range(no_of_pages):
        url = f'https://www.linkedin.com/jobs/search/?currentJobId=3603710976&geoId=102713980&keywords={skill}&location={location}' 
        response = requests.get(url, headers)
        html = response.text 
        soup = BeautifulSoup(html, 'html.parser') 
        jobs = soup.find_all('div', class_='base-card')  

        for job in jobs:
            job_title = job.find('h3',class_='base-search-card__title').text.strip()
            company_name = job.find('h4', class_='base-search-card__subtitle').text.strip() 
            apply_link = job.find('a', class_='base-card__full-link')['href']
            company_icon = job.img['data-delayed-url']
            location = job.find('span', class_='job-search-card__location').text.strip()
            salary = job.find('span', class_='job-search-card__salary-info') 
            salary = '-' if salary is None else salary.text.strip().replace(' ', '').replace('\n', ' ')
            listdate = job.find('time', class_='job-search-card__listdate').text.strip()
            listdate = '-' if listdate is None else listdate
            benefits__text = job.find('span', class_='result-benefits__text') 
            benefits__text = '-' if benefits__text is None else benefits__text.text.strip().replace('\n', ' ') 
    
            temp = {
                'job_title': job_title,
                'company_name': company_name,
                'company_icon': company_icon,
                'apply_link': apply_link,
                'location': location,
                'salary': salary,
                'listdate': listdate,
                'benefits__text': benefits__text,
                'benefits__icon': benefits__text, 
            }
            
            scrapped_jobs.append(temp)  

    return scrapped_jobs

##############################################################################################################################
                                                    # ''' LINKED IN [END] ''' #
##############################################################################################################################


