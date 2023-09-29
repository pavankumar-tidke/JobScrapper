import os, json
import requests
from bs4 import BeautifulSoup

 
skill = 'Devops'
place = 'India'
no_of_pages = 1

scrapped_jobs = []

#  94.0.4606.81

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "App-Id": "109",
    "SystemId": "109"
}

for page in range(no_of_pages):
    url = f'https://www.linkedin.com/jobs/search/?currentJobId=3603710976&geoId=102713980&keywords={skill}&location={place}'

 
    response = requests.get(url, headers)
    html = response.text
     
    soup = BeautifulSoup(html, 'html.parser')
    # print(soup) 
    
    jobs = soup.find_all('div', class_='base-card') 
    
    # print(jobs)

    for job in jobs:

        job_title = job.find('h3',class_='base-search-card__title').text.strip()
        company_name = job.find('h4', class_='base-search-card__subtitle').text.strip() 
        apply_link = job.find('a', class_='base-card__full-link')['href']
        company_icon = job.img['data-delayed-url']
        location = job.find('span', class_='job-search-card__location').text.strip()
        salary = job.find('span', class_='job-search-card__salary-info') 
        salary = '-' if salary is None else salary.text.strip().replace(' ', '').replace('\n', ' ')
        listdate = job.find('time', class_='job-search-card__listdate').text.strip()  
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
        # print(scrapped_jobs)


        
print(scrapped_jobs)

 
    