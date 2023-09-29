
console.log(getCookie("csrftoken"));

 
// approved Shop search operation
// $(`.searchShopsDump`).html(`<h3 class="text-lg font-bold text-white m-5">Search Shops</h3>`)
$(`.gsearchShops`).keyup(function (e) { 

    let search_param = $(this).val()
    if(!search_param) { 
        $(`.searchShopsDump`).html(`<h3 class="text-lg font-bold text-white m-5">Shops Not Found</h3>`)
    } else {  

        let data = {
            'uSVqbNNvj3MO': search_param, 
        }

        try {
            transporter('GET', '/g/searchShop/', data, false, (status, res) => {
                console.log(res);
                $(".searchShopsDump").empty();
                if(status && res.success) {  
                    if(!res.data.ts_data.hits.length) {
                        $(`.searchShopsDump`).html(`<h3 class="text-lg font-bold text-white m-5">Shops Not Found</h3>`)
                    } else {
                        res.data.ts_data.hits.map((item, index) => {
 
                            console.log(item);
                            $(`.searchShopsDump`).append(`

                                <tr class="  border-b  bg-slate-900  border-gray-700 ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0"> 
                                                <img class="w-12 h-12 rounded-full" src="https://testp.feelyprivacy.com/upload/${item.document.user_id}/shop_images/shop_id_${item.document.shop_id}/${item.document.shop_images[0]}" alt="Shop image">
                                            </div> 
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    ${item.document.shop_name}
                                                </p>
                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400 truncate">
                                                    ${item.document.shop_address} 
                                                </p>
                                            </div> 
                                        </div>  
                                    </th> 
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                        ${item.document.user_name}
                                    </th> 
                                    <td class="px-6 py-4"> 
                                        <button data-modal-toggle="shop-${item.document.shop_id}-images-modal" type="button" class="pb-1 px-2 text-white bg-blue-900 rounded-lg">
                                            shop images                                            
                                        </button> 
                                    </td> 
                                    <td class="px-6 py-4 font-semibold"> 
                                        ${item.document.opening_time} - ${item.document.closing_time} 
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

  

//  searching query FAQ
 $(`.gsearchQuery`).keyup(function (e) { 

    let search_param = $(this).val()
    if(!search_param) { 
        $(`.searchQueryDump`).html(`<h3 class="text-lg font-bold text-white m-5">Query Not Found</h3>`)
    } else {  

        let data = {
            'VmqiIZ2woQ': search_param, 
        }
        try { 
            transporter('GET', '/g/searchQuery/', data, false, (status, res) => {
                console.log(res);
                $(".searchQueryDump").empty();
                if(status && res.success) {  
                    if(!res.data.ts_data.hits.length) {
                        $(`.searchQueryDump`).html(`<h3 class="text-lg font-bold text-white m-5">Query Not Found</h3>`)
                    } else {
                        res.data.ts_data.hits.map((item, index) => {

                            var my_datetime = new Date(item.document.created_at);
                            var date = my_datetime.toLocaleDateString();
                            var time = my_datetime.toLocaleTimeString(); 
 
                            console.log(item);

                            $(`.searchQueryDump`).append(`
                                <div class="p-4 border border-gray-800 rounded-lg drop-shadow-2xl ">
                                    <div class="flex mb-3">
                                        <div class="flex mr-3">
                                            <h3 class="text-gray-400 mr-2 text-sm font-normal">asked by: </h3>
                                            <h3 class="text-white  text-sm font-semibold">${item.document.user_name}</h3>
                                        </div>  
                                        <div class="flex mr-3">
                                            <h3 class="text-gray-400 mr-2 text-sm font-normal">asked on: </h3>
                                            <h3 class="text-white  text-sm font-semibold">${date} ${time}</h3>
                                        </div>  
                                    </div>
                                    <div class="p-2 flex">
                                        <span class="font-bold text-mg text-red-300">Q: </span>
                                        <div class="ml-3 ">
                                            <h3 class="text-white text-md font-semibold">${item.document.query_title}</h3>
                                            <p class="text-gray-400 text-dm font-normal">${item.document.query_text}</p>
                                        </div>
                                    </div>
                                    <div class="p-2 flex">
                                        <span class="font-bold text-mg text-green-300">A: </span>
                                        <div class="ml-3 ">
                                            <h3 class="text-white text-md font-semibold">${item.document.query_ans}</h3> 
                                        </div>
                                    </div> 
                                </div>
                            `)
                        })
                    }
                }
            })
        } catch (error) {
            toastMessage(`query excception: ${error}`, 'warning');
        }

    }
});


