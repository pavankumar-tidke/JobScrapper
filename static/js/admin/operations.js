
console.log(getCookie("csrftoken"));


//***** USERS OPERATION *****//
// user approval oparation
function approveUser(user_id) {
    console.log(user_id);

    let toggle_state = $(`.approve-checkbox-id-${user_id}`).is(':checked');
    let mode_of_operation = (toggle_state) ? 'approve_user' : 'remove_from_approved';
    (toggle_state) ? $(`.reject-checkbox-id-${user_id}`).attr('disabled', 'true') : $(`.reject-checkbox-id-${user_id}`).removeAttr('disabled')

    let data = {
        '5OhBltgy8lVK': user_id,
        'SqOXvChEZ9GB': mode_of_operation
    }

    transporter('POST', '/a/approveUser/', data, false, (status, res) => {
        console.log("ress-- ", res);
        if(status) {
            if(res.success1){
                $(`.approve-checkbox-id-${user_id}`).attr('checked', true)
                $(`.status-id-${user_id}`).text('pending')
                $(`.status-id-${user_id}`).removeClass('text-green-500')
                $(`.status-id-${user_id}`).addClass('text-yellow-500') 
                toastMessage(res.data.alertMsg, 'success')
            }
            else if(res.success2){
                $(`.approve-checkbox-id-${user_id}`).attr('checked', true)
                $(`.status-id-${user_id}`).text('approved')
                $(`.status-id-${user_id}`).addClass('text-green-500')
                $(`.status-id-${user_id}`).removeClass('text-yellow-500')
                toastMessage(res.data.alertMsg, 'success')

            } else { 
                toastMessage(res.data.alertMsg, 'yellow')
            }
        } else { 
            toastMessage(res.data.alertMsg, 'yellow')
        }
    })
    
}

// user rejecting oparation
function rejectUser(user_id) {
 
    let toggle_state = $(`.reject-checkbox-id-${user_id}`).is(':checked');
    let mode_of_operation = (toggle_state) ? 'reject_user' : 'remove_from_rejected';
    (toggle_state) ? $(`.approve-checkbox-id-${user_id}`).attr('disabled', 'true') : $(`.approve-checkbox-id-${user_id}`).removeAttr('disabled')

    let data = {
        '5OhBltgy8lVK': user_id,
        'SqOXvChEZ9GB': mode_of_operation
    }

    try {
        transporter('POST', '/a/rejectUser/', data, false, (status, res) => {
            console.log("ress-- ", res);
            if(status && res.success1){
                $(`.reject-checkbox-id-${user_id}`).attr('checked', true)
                $(`.status-id-${user_id}`).text('pending')
                $(`.status-id-${user_id}`).removeClass('text-red-500');
                $(`.status-id-${user_id}`).addClass('text-yellow-500') 
                toastMessage(res.data.alertMsg, 'success');
            }
            else if(status && res.success2){
                $(`.reject-checkbox-id-${user_id}`).attr('checked', true)
                $(`.status-id-${user_id}`).text('rejected')
                $(`.status-id-${user_id}`).addClass('text-red-500');
                $(`.status-id-${user_id}`).removeClass('text-yellow-500')
                toastMessage(res.data.alertMsg, 'success');
            } else { 
                toastMessage(res.data.alertMsg, 'warning');
            }
        });

    } catch (error) {
        toastMessage(`reject user exception: ${error}`, 'warning');
    }

}
 
// approved user search operation
$(`.searchUsersDump`).html(`<h3 class="text-lg font-bold text-white m-5">Search Users</h3>`)
$(`.searchUsersInput`).keyup(function (e) { 

    let search_param = $(this).val()
    if(!search_param) { 
        $(`.searchUsersDump`).html(`<h3 class="text-lg font-bold text-white m-5">User Not Found</h3>`)
    } else {  

        let data = {
            'uSVqbNNvj3MO': search_param, 
        }

        try {
            transporter('GET', '/a/searchUser/', data, false, (status, res) => {
                $(".searchUsersDump").empty();  
                if(status && res.success) {
                    if(!res.data.ts_data.hits.length) {
                        $(`.searchUsersDump`).html(`<h3 class="text-lg font-bold text-white m-5">User Not Found</h3>`)
                    } else {
                        res.data.ts_data.hits.map((item, index) => {
                            $(`.searchUsersDump`).append(`
                                <tr class=" border-b  bg-gray-800 border-gray-700">
                                    <th
                                    scope="row"
                                    class="px-6 py-4 font-medium whitespace-nowrap text-white"
                                    >
                                    ${index+1}
                                    </th>
                                    <th
                                    scope="row"
                                    class="px-6 py-4 font-medium whitespace-nowrap text-white"
                                    >
                                    ${item.document.name}
                                    </th>
                                    <td class="px-6 py-4">${item.document.email}</td>
                                    <td class="text-green-500 font-medium px-6 py-4">${item.document.updated_at}</td> 
                                    <td class="status-id-${item.document.id} text-green-500 font-medium px-6 py-4">approved</td> 
                                    <td class="text-green-500 font-medium px-6 py-4">
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" onchange="approveUser(${item.document.id})" class="approve-checkbox-id-${item.document.id} sr-only peer" checked>
                                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                        </label>
                                    </td>
                                </tr>
                            `)  
                        })
                    }
                } else {
                    toastMessage(res.data.alertMsg, 'danger');
                }
            });

        } catch (error) {
            toastMessage(`search user excception: ${error}`, 'warning');
        }

    }
});



 //***** SHOPS OPERATION *****//
 
// shop approval oparation
function approveShop(shopid, user_id, user_name) {
    console.log(shopid);

    let toggle_state = $(`.approve-shop-checkbox-id-${shopid}`).is(':checked');
    let mode_of_operation = (toggle_state) ? 'approve_shop' : 'remove_from_approved';
    (toggle_state) ? $(`.reject-shop-checkbox-id-${shopid}`).attr('disabled', 'true') : $(`.reject-shop-checkbox-id-${shopid}`).removeAttr('disabled')

    let method = 'POST'
    let url = `/a/approveShop/` 
    let data = {
        '5OhBltgy8lVK': shopid,
        'ZZso5ABHyj36': user_id,
        'fHpLiksmOsUC': user_name,
        'SqOXvChEZ9GB': mode_of_operation
    }

    try {
        transporter(method, url, data, false, (status, res) => {
            console.log("ress-> ", res); 
            if(status && res.success1){
                $(`.approve-shop-checkbox-id-${shopid}`).attr('checked', true)
                $(`.shop-status-id-${shopid}`).text('pending')
                $(`.shop-status-id-${shopid}`).removeClass('text-green-500')
                $(`.shop-status-id-${shopid}`).addClass('text-yellow-500') 
                toastMessage(res.data.alertMsg, 'success')
            }
            else if(status && res.success2){
                $(`.approve-shop-checkbox-id-${shopid}`).attr('checked', true)
                $(`.shop-status-id-${shopid}`).text('approved')
                $(`.shop-status-id-${shopid}`).addClass('text-green-500')
                $(`.shop-status-id-${shopid}`).removeClass('text-yellow-500')
                toastMessage(res.data.alertMsg, 'success')
        
            } else { 
                toastMessage(res.data.alertMsg, 'warning')
            }
        });
    } catch (error) {
        toastMessage(`aprove shop excception: ${error}`, 'warning');
    }

}

//***** user rejecting oparation *****//
function rejectShop(shopid) {
 
    let toggle_state = $(`.reject-shop-checkbox-id-${shopid}`).is(':checked');
    let mode_of_operation = (toggle_state) ? 'reject_shop' : 'remove_from_rejected';
    (toggle_state) ? $(`.approve-shop-checkbox-id-${shopid}`).attr('disabled', 'true') : $(`.approve-shop-checkbox-id-${shopid}`).removeAttr('disabled')

    let data = {
        '5OhBltgy8lVK': shopid,
        'SqOXvChEZ9GB': mode_of_operation
    }

    try {
        transporter('POST', `/a/rejectShop/`, data, false, (status, res) => {
            console.log("ress-- ", res);
            if(status && res.success1){
                $(`.reject-shop-checkbox-id-${shopid}`).attr('checked', true)
                $(`.shop-status-id-${shopid}`).text('pending')
                $(`.shop-status-id-${shopid}`).removeClass('text-red-500')
                $(`.shop-status-id-${shopid}`).addClass('text-yellow-500') 
                toastMessage(res.data.alertMsg, 'success')
            }
            else if(status && res.success2){
                $(`.reject-shop-checkbox-id-${shopid}`).attr('checked', true)
                $(`.shop-status-id-${shopid}`).text('rejected')
                $(`.shop-status-id-${shopid}`).addClass('text-red-500')
                $(`.shop-status-id-${shopid}`).removeClass('text-yellow-500')
                toastMessage(res.data.alertMsg, 'success')
            } else {
                toastMessage(res.data.alertMsg, 'danger')
            }
        });
    } catch (error) {
        toastMessage(`reject shop excception: ${error}`, 'warning');
    }
 
}
 
//***** approved Shop search operation *****//
$(`.searchShopsDump`).html(`<h3 class="text-lg font-bold text-white m-5">Search Approved Shops</h3>`)
$(`.searchShopsInput`).keyup(function (e) { 

    let search_param = $(this).val()
    if(!search_param) { 
        $(`.searchShopsDump`).html(`<h3 class="text-lg font-bold text-white m-5">Shops Not Found</h3>`)
    } else {  

        let data = {
            'uSVqbNNvj3MO': search_param, 
        }

        try {
            transporter('GET', '/a/searchShop/', data, false, (status, res) => {
                console.log(res);
                $(".searchShopsDump").empty();
                if(status && res.success) {  
                    if(!res.data.ts_data.hits.length) {
                        $(`.searchShopsDump`).html(`<h3 class="text-lg font-bold text-white m-5">Shops Not Found</h3>`)
                    } else {
                        res.data.ts_data.hits.map((item, index) => {
                            $(`.searchShopsDump`).append(`
                                <tr class="  border-b  bg-gray-800  border-gray-700 ">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                                        >
                                        ${index+1}
                                    </th>
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium whitespace-nowrap text-white"
                                        >
                                        ${item.document.shop_name}
                                    </th>
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium  whitespace-nowrap text-white"
                                        >
                                        ${item.document.user_name}
                                    </th>
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                                        >
                                        ${item.document.shop_address}
                                    </th>
                                    <td class="px-6 py-4">
                                    ${item.document.shop_images.map((item, index) => {
                                        `
                                        <span class="material-symbols-outlined cursor-pointer"> wallpaper </span>
                                        <img src="my-image.jpg" alt="Image preview" class="hidden absolute top-0 left-0 w-20 h-20">
                                        `
                                    })}
                                    </td>
                                    <td class="text-green-500 font-medium px-6 py-4">${item.document.created_at}</td> 
                                    <td class="shop-status-id-${item.document.id} text-green-500 font-medium px-6 py-4">approved</td> 
                                    <td class="text-green-500 font-medium px-6 py-4">
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" onchange="approveShop(${item.document.id}, ${item.document.user_id}, '${item.document.user_name}')" class="approve-shop-checkbox-id-${item.document.id} sr-only peer" checked>
                                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                        </label>
                                    </td>
                                </tr>
                            `)  
                        })
                    }
                } else {
                    toastMessage(res.data.alertMsg, 'warning');
                }
            })
        } catch (error) {
            toastMessage(`shop user excception: ${error}`, 'warning');
        }
  
    }
});


 
 //***** QUERY OPERATION *****//
function submitAnswer(queryId, userId, queryfolderId) {
    console.log('rtf');
    
    let queryAns = $(`.queryAns-${queryId}`).val();

    let data = {
        'QfeyKvH4NW': queryAns,
        'JqZ0C8vQGt': queryId,
        'kfEboObRKw': userId,
        'p9w3RDEOvc': queryfolderId,
    }
    
    try {
        transporter('POST', '/a/queryanswer/', data, false, (status, res) => {
            console.log(res);
            if(status && res.success) {
                $(`#query-${queryId}-modal-closeBtn`).trigger("click");
                $(`.query-status-id-${queryId}`).text('answered')
                $(`.query-status-id-${queryId}`).addClass('text-green-500')
                toastMessage(res.data.alertMsg, 'success')
            } else {
                toastMessage(res.data.alertMsg, 'danger')
            }
        });
    } catch (error) {
        console.log(error);
        toastMessage(res.data.alertMsg, 'danger')
    }
}


 //***** Make Anounancement  *****//
function anounance() { 
    let anounCategory = $(`.anounCategory`).val();
    let anounText = $(`.anounText`).val().trim();

    let data = {
        'GWupWue0GP': anounCategory, 
        'QfeyKvH4NW': anounText, 
    }

    if(anounText != '' && anounCategory != 'None') {
        console.log(anounText);
        try {
            transporter('POST', '/a/anounancement/', data, false, (status, res) => {
                console.log(res);
                if(status && res.success) {
                    $(`#anounance-modal-close_btn`).trigger("click");  
                    toastMessage(res.data.alertMsg, 'success')
                } else {
                    toastMessage(res.data.alertMsg, 'danger')
                }
            });
        } catch (error) {
            console.log(error);
            toastMessage(res.data.alertMsg, 'danger')
        }
    } else {
        toastMessage('fields should not be blank', 'warning')
    }
    
}


//***** MAKE POST ******// 
$('#makepost').submit(function (e) { 
    e.preventDefault();


    $('.postSubmitBtn').attr('disable', true)
    $('.postSubmitBtn').html(`
        <div role="flex">
            <div role="status">
                <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <span class="ml-4">Loading...</span>
        </div>
    `)
    

    var form = new FormData();

    form.append('post_title', $("input[name='post_title']").val());
    form.append('post_tag', $(".post_tag").val());
    form.append('post_short_desc', $(`.post_short_desc`).val().trim());
    form.append('post_text', $(`.post_text`).val().trim()); 
    
    // console.log($("input[name='scrftoken']").val()); 

    var files = $("input[name='post_image']").prop('files');


    for (var i = 0; i < files.length; i++) {
        form.append('files', files[i]);
    }
 
    try {
        transporter('POST', '/a/makepost/', form, true, (status, res) => {
            console.log(res, status);
            if(status && res.success) {

                $('#makepost')[0].reset();
                $('.postSubmitBtn').attr('disable', false).text('Post') 
                toastMessage(res.data.alertMsg, 'success')
            } else {
                $('.postSubmitBtn').attr('disable', false).text('Post') 
                toastMessage(res.data.alertMsg, 'danger')
            }
        });
    } catch (error) {
        toastMessage(`adding shop exception: ${error}`, 'warning')
    }
}); 








/****************************************************************************************************/









// fetcching collection data
function fetchCollectionData() {
    fetch('/a/fetchCollectionData', {
        headers: {
            'X-CSRFToken': getCookie("csrftoken")
        },
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}



// fetcching collection data
function fetchCollectionData() {
    fetch('/a/fetchCollectionData', {
        headers: {
            'X-CSRFToken': getCookie("csrftoken")
        },
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// delete collection 
function deleteCollection() {
    fetch('/a/deleteCollection', {
        headers: {
            'X-CSRFToken': getCookie("csrftoken")
        },
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// fetcching all collection 
function fetchAllCollections() {
    fetch('/a/fetchAllCollections', {
        headers: {
            'X-CSRFToken': getCookie("csrftoken")
        },
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// create collection 
function createCollection() {
    fetch('/a/createCollection', {
        headers: {
            'X-CSRFToken': getCookie("csrftoken")
        },
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

// create collection 
function checkCollection() {
    fetch('/a/checkCollection', {
        headers: {
            'X-CSRFToken': getCookie("csrftoken")
        },
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}
