



//** like unlike **//
function addToFav(elem, randomNumericId) { 
    let value = $(`#fav_${randomNumericId} span`).attr('value');  
    (value == 0) ? $(`#fav_${randomNumericId} span`).attr('value', 1).css('font-variation-settings', $(`#fav_${randomNumericId} span`).css('font-variation-settings').replace(`"FILL" 0`, `"FILL" 1`)) : $(`#fav_${randomNumericId} span`).attr('value', 0).css('font-variation-settings', $(`#fav_${randomNumericId} span`).css('font-variation-settings').replace(`"FILL" 1`, `"FILL" 0`)) ;


    console.log(elem);

    let form = new FormData();

    form.append('job_title', elem.job_title);
    form.append('company_icon', elem.company_icon);
    form.append('company_name', elem.job_company);
    form.append('location', elem.location);
    form.append('listdate', elem.listdate);
    form.append('apply_link', elem.apply_link);

    try {
        transporter('POST', '/add_to_fav/', form, true, (status, res) => {
            console.log(res);
            if(status && res.success) {   
                toastMessage(res.data.alertMsg, 'success');  
            } else {
                toastMessage(res.data.alertMsg, 'danger');
            }
        });
    } catch (error) {
        console.log(error);
    }
    
}




//** job scrapping **//
$(`#job-scrap-start-btn`).on('click', (e) => {
    let skill = $(`input[name='skill']`).val();
    let location = $(`input[name='location']`).val();

    let data = {
        'skill': skill.charAt(0).toUpperCase() + skill.slice(1),
        'location': location.charAt(0).toUpperCase() + location.slice(1),
    }    
 

    try {
        transporter('POST', '/job_scrapper_process/', data, false, (status, res) => {
            console.log(res);
            if(status && res.success) {   
                toastMessage(res.data.alertMsg, 'success'); 
                $('.scrapper-search').hide();
                $('.scrapper-result-heading').html(`<span class="material-symbols-outlined align-middle mr-4 cursor-pointer" onclick="$('.scrapper-result').empty(); $('.scrapper-search').show();">keyboard_backspace</span> Scrapped Jobs from your selected platforms `);
                
                const results = res.data.results['linkedin']; 
                results.map((elem) => { 
                    const randomNumericId = Math.floor(Math.random() * 100000000);
                    // console.log(randomNumericId);
                    
                    $('.job_card_list').append(`
                        <div id="card-id-${randomNumericId}" class="w-full border border-gray-500 p-2 rounded-lg  shadow-lg hover:bg-blue-50 cursor-pointer ">
                            <div class="flex w-full">
                                <div class="flex w-full">
                                    <img src="${elem.company_icon}" class="mr-1 w-fit w-16 h-16" />
                                    <div class=" w-full">
                                        <h3 class="text-xl font-bold text-black tracking-wide">${elem.job_title} </h3>
                                        <h3 class="text-[14px] font-semibold text-gray-500 ">${elem.company_name}</h3>
                                        <h3 class="text-md font-normal text-gray-800 ">${elem.location}</h3>
                                    </div>  
                                </div> 
                                <div id="fav_${randomNumericId}" class="flex justify-end w-full space-x-2 ">
                                    <span onClick="addToFav({'job_title': '${elem.job_title}', 'company_icon': '${elem.company_icon}', 'job_company': '${elem.company_name}', 'location':' ${elem.location}', 'listdate': '${elem.listdate}', 'apply_link': '${elem.apply_link}'}, ${randomNumericId})" class="material-symbols-outlined text-red-700" style="font-variation-settings: 'FILL' 0;"  value="0">favorite</span> 
                                </div>  
                            </div>
                            <div class="mt-4 ml-16 flex w-full space-x-3">
                                <h3 class="text-md text-center  font-semibold text-gray-900 tracking-wide flex "><span class="material-symbols-outlined text-blue-700" style="font-variation-settings: 'FILL' 0, 'opsz' 20;">schedule</span>${elem.listdate} </h3>
                                <h3 class="text-md text-center  font-semibold text-gray-900 tracking-wide flex "><span class="material-symbols-outlined text-blue-700" style="font-variation-settings: 'FILL' 0, 'opsz' 20;">currency_rupee</span>${elem.salary} </h3>
                                <h3 class="text-md text-center  font-semibold text-gray-900 tracking-wide flex "><span class="material-symbols-outlined text-blue-700" style="font-variation-settings: 'FILL' 0, 'opsz' 20;">info</span>${elem.benefits__text} </h3>
                            </div>     
                            <div class="mt-4 ml-16 flex w-full space-x-3"> 
                                <h3 class="text-md text-center  font-semibold text-gray-900 tracking-wide flex "><img src="/static/media/image/linkedin.png" class=" mr-1 w-fit w-5 h-5" />LinkedIn </h3> 
                            </div>     
                            <div class="flex justify-end w-full"> 
                                <a href="${elem.apply_link}" target="_blank" type="button" id="job-scrap-start-btn" class="align-middle text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Apply Now</a>
                            </div>     
                        </div>
                    `);
                });
                
 
            } else {
                toastMessage(res.data.alertMsg, 'danger');
            }
        });
    }
    catch (error) {
        toastMessage(`QueryCreat exception: ${error}`, 'danger');
    }
});

 

//** delete fav **//
function deleteFav(id) {
    console.log(id);
    try {
        transporter('POST', '/delete_fav/', {'pk': id}, false, (status, res) => {
            console.log(res);
            if(status && res.success) {
                toastMessage(res.data.alertMsg, 'success');
                $(`#card-id-${id}`).remove();
            } else {
                toastMessage(res.data.alertMsg, 'danger');
            }
        });
    } catch (error) {
        console.log(error);
    }
    
}


//** fav view **//
function view_favorite() {
    try {
        transporter('POST', '/view_fav/', {}, false, (status, res) => {
            console.log(res);
            if(status && res.success) {
                toastMessage(res.data.alertMsg, 'success');
                const res_array = JSON.parse(res.data.results);
 
                res_array.map((item) => { 
                    const randomNumericId = Math.floor(Math.random() * 100000000);
                    // console.log(randomNumericId);

                    let elem = item.fields;
                    
                    $('.fav-card-list').append(`
                        <div id="card-id-${item.pk}" class="w-full border border-gray-500 p-2 rounded-lg  shadow-lg hover:bg-blue-50 cursor-pointer ">
                            <div class="flex w-full">
                                <div class="flex w-full">
                                    <img src="${elem.company_icon}" class="mr-1 w-fit w-16 h-16" />
                                    <div class=" w-full">
                                        <h3 class="text-xl font-bold text-black tracking-wide">${elem.job_title} </h3>
                                        <h3 class="text-[14px] font-semibold text-gray-500 ">${elem.job_company}</h3>
                                        <h3 class="text-md font-normal text-gray-800 ">${elem.job_location}</h3>
                                    </div>  
                                </div> 
                                <div id="fav_${randomNumericId}" class="flex justify-end w-full space-x-2 ">
                                    <span onClick="deleteFav(${item.pk})" class="material-symbols-outlined text-red-700" style="font-variation-settings: 'FILL' 0;" >delete</span> 
                                </div>  
                            </div>
                            <div class="mt-4 ml-16 flex w-full space-x-3">
                                <h3 class="text-md text-center  font-semibold text-gray-900 tracking-wide flex "><span class="material-symbols-outlined text-blue-700" style="font-variation-settings: 'FILL' 0, 'opsz' 20;">schedule</span>${elem.listdate} </h3> 
                            </div>     
                            <div class="flex justify-end w-full"> 
                                <a href="${elem.apply_link}" target="_blank" type="button" id="job-scrap-start-btn" class="align-middle text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Apply Now</a>
                            </div>     
                        </div>
                    `);
                });
                
                
            } else {
                toastMessage(res.data.alertMsg, 'danger');
            }
        });
    }
    catch (error) {
        toastMessage(`QueryCreat exception: ${error}`, 'danger');
    }
}


if (window.location.pathname.includes('favourite')) {
    view_favorite();
}


//** De-activating / activating account **//
function acc_action() {

    let toggle_state = $(`.deactive-toggle`).is(':checked');
    let mode_of_operation = (toggle_state) ? 'active' : 'deactive';
    // (toggle_state) ? $(`.deactive-toggle`).attr('disabled', 'true') : $(`.deactive-toggle`).removeAttr('disabled')

    console.log(toggle_state);
    console.log(mode_of_operation);
    
    let data = { 
        'SqOXvChEZ9GB': mode_of_operation
    }

    try {
        transporter('POST', '/accstatus/', data, false, (status, res) => {
            if(status && res.success) { 
                $('.acc_status_text').text((toggle_state) ? 'De-activate Account' : 'Activate Account')
                window.location.reload();
                toastMessage(res.data.alertMsg, 'info');
                // fetchNotesFolder()
            } else {
                toastMessage(res.data.alertMsg, 'danger');
            }
        });
    } catch (error) {
        toastMessage(`QueryCreat exception: ${error}`, 'danger');
    }

}
