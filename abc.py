import os, json, requests
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import pandas as pd
 
skill = 'Devops'
place = 'Pune'
no_of_pages = 1

scrapped_jobs = []

#  94.0.4606.81

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "Cookie": 'indeed_rcc=CTK; CTK=1gsf162i8hsme801; hpnode=1; RF="wKGgxUwMHWV1aKM-FTjqiMrjRY8zAroFxocW7SGr9uJASaKa98Jda29TEymDVLcsmEvuK92ca2Dtd5yKNhNcUI6H6Ok4Js8mtQvX4JMliQppV5ALI0Ua9tbD5ABasYZLNOKq4Tgj1wFLp616fLeUfw=="; LOCALE=en; PPID=""; LOCALE=en; PREF="TM=1684688545588:L=pune"; ROJC=3ee3f8b5325d4ca1; _cfuvid=lGnctLjSm7d1VfD4LHO4vqHvxq3TIOph1m2VFgPUQd0-1685332074461-0-604800000; CSRF=UUdVWjnKsSKEhuPHAf6f0srMlirIkPuN; INDEED_CSRF_TOKEN=yR5a0TN58oo5v3WzA11Gn1amnx4zIhxS; SURF=NSj1yGZVIJ6ntWhPCUSTMtXLmk6nD2NF; SHARED_INDEED_CSRF_TOKEN=yR5a0TN58oo5v3WzA11Gn1amnx4zIhxS; jaSerpCount=2; UD="LA=1685332146:CV=1685332087:TS=1685332087:SG=401722b3833d062e8f0244edcb475f06"; RQ="q=devops&l=pune&ts=1685332146587&pts=1685196240610:q=Government+Cyber+Security&l=&ts=1684642060867:q=devops+engineer&l=Pune%2C+Maharashtra&ts=1684041843667"; LC="co=IN"; LV="LA=1685332146:LV=1685196240:CV=1685332087:TS=1683211204"; JSESSIONID=3179B8491BB780E8421EDCB08B8334EF; mp_8920a80048e2c0ab5edd7839d1977ce2_mixpanel=%7B%22distinct_id%22%3A%20%2218818b2661ab59-08ac2d4b6f395f-26031a51-12cc00-18818b2661bcb2%22%2C%22%24device_id%22%3A%20%2218818b2661ab59-08ac2d4b6f395f-26031a51-12cc00-18818b2661bcb2%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22utm_source%22%3A%20%22%2Fm%2F%22%2C%22utm_medium%22%3A%20%22redir%22%2C%22utm_campaign%22%3A%20%22dt%22%7D; __cf_bm=5Gx0Ocwagw9Lw6TbJkxNRNXN4sBFIf5QXT8BsKkmltE-1685332160-0-AX3oLmukJ0HeGW/eBRrBiOIAmEwfF76/YDoG3Q6AKfYXJCD9eqbWQ0lK3F7lOzUkm3k8wfPJfQep0osXffD4w4Zok2rYLu3zkgNcbuEq/hEpyoIg2koJzq9cxCXGH+AtRa3EKRFS3h1sHi0xPbt5JY0=; ac=y0+S8P3TEe2osavUB8lQmg#y1AIIP3TEe2osavUB8lQmg; gonetap=4; indeed_rcc="LOCALE:PREF:LV:CTK:RQ:UD"; PTK=tk=1h1ipt8jfjl1l800&type=jobsearch&subtype=topsearch'
}

for page in range(no_of_pages): 
    # url = 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_key_loc&searchType=adv&keyword=devops&location=india&pageNo=1'
    # url = 'https://www.naukri.com/devops-jobs-in-india?k=devops&l=india'
    # url = 'https://in.indeed.com/jobs?q=devops&l=pune&from=searchOnHP&vjk=3ee3f8b5325d4ca1'
    # url = 'https://www.foundit.in/middleware/jobsearch?sort=1&limit=15&query=devops&locations=india&searchId=04f092c7-38ce-49b0-be3c-f7061924e108'
    # url = 'https://www.naukri.com/devops-jobs-in-india'


    import httpx
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Connection": "keep-alive",
        "Accept-Language": "en-US,en;q=0.9,lt;q=0.8,et;q=0.7,de;q=0.6",
    }

    response = httpx.get("https://www.indeed.com/jobs?q=devops&l=India", headers=HEADERS)
    print(response)
 
    # response = requests.get(url, headers)
    # html = response.text
     
    # soup = BeautifulSoup(html, 'html.parser')
    # print(soup) 
    
    # jobs = soup.find_all('div', class_='base-card') 
    
    # print(jobs)

    # for job in jobs:

    #     job_title = job.find('h3',class_='base-search-card__title').text.strip()
    #     company_name = job.find('h4', class_='base-search-card__subtitle').text.strip() 
    #     apply_link = job.find('a', class_='base-card__full-link')['href']
    #     company_icon = job.img['data-delayed-url']
    #     location = job.find('span', class_='job-search-card__location').text.strip()
    #     salary = job.find('span', class_='job-search-card__salary-info') 
    #     salary = '-' if salary is None else salary.text.strip().replace(' ', '').replace('\n', ' ')
    #     listdate = job.find('time', class_='job-search-card__listdate').text.strip()  
    #     benefits__text = job.find('span', class_='result-benefits__text') 
    #     benefits__text = '-' if benefits__text is None else benefits__text.text.strip().replace('\n', ' ') 
 
    #     temp = {
    #         'job_title': job_title,
    #         'company_name': company_name,
    #         'company_icon': company_icon,
    #         'apply_link': apply_link,
    #         'location': location,
    #         'salary': salary,
    #         'listdate': listdate,
    #         'benefits__text': benefits__text,
    #         'benefits__icon': benefits__text, 
    #     }
        
    #     scrapped_jobs.append(temp) 
        # print(scrapped_jobs)


        
# print(scrapped_jobs)

 
    