
console.log(screen.width);

if (screen.width < 768) { 
  $('.sidebar').toggle(); 
  $('.hero').toggleClass('ml-64');
  // document.body.style.backgroundColor = 'white'; 

} else { 
  $('.bottom-nav').hide();
  
}


 
 

//** page loading**/
$(window).on('load', function() {
  $('.loading').hide();
})

//** SIDEBAR toggle **/
$('#sidebar-toggle-button').click(function() {
  $('.sidebar').toggle(); 
  $('.hero').toggleClass('ml-64'); 
})

//** THEME CHANGER **/ 
$('.theme-toggle-button').click(function() {
  $('body, body *').toggleClass('text-gray-900');  
  $('body, body *').toggleClass('bg-white');
})

$('._m_theme-toggle-button').click(function() {
     
})


//** THEME CHANGER **//
function extend_card(mosque_card_id) {
  
}



//** MOBILE VIEW REDIRECTOR **//
function redirectToMobileUrl(event, mobileUrl) {
  var mobileThreshold = 768;

  // Check if the current width is less than the mobile threshold
  if (window.innerWidth < mobileThreshold) {
    event.preventDefault(); 
    window.location.href = mobileUrl; 
  }
}






//******************************* GLOBAL FUNCTIONS ************************************/ 

/**
 * random number generator function description
 * @param { Number } from Range starting from where the random number should be generate
 * @param { Number } to Range ending till where the random number should be generate
 **/
function rnum(from=1111, to=9999) {
  try {
    return Math.floor(Math.random() * to) + from;
  } catch (error) {  
    console.error("andom number generator error => ", error);
    toastMessage("Random number generator error", "danger")
  }
}


/**
 * get_cookie function description
 * @param { String } name Name of which cookie you want
 **/
function getCookie(name) {
  try {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  } catch (error) {
    console.error("Cookie error => ", error);
    toastMessage("Cookie error", "danger")
  }
}


/**
 * get_cookie function description
 * @param { String } method Type of method (POST, GET, PUT, DELETE)
 * @param { String } url Name of route 
 * @param { String } data Data which been send  
 * @param { Boolean } form Is this a formData or not
 **/
function transporter(method='GET', url='/', data={}, form=false, callback=null ) {
  
  try { 
    if(form) {
      $.ajax({
        type: method,
        url: url,
        contentType: false,
        processData: false,
        data: data,
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        success: (response) => {
          callback(true, JSON.parse(response)); 
        },
        error: (xhr, status, error) => { 
          callback(false, JSON.parse(error));
        },
      }); 

    } else {
      $.ajax({
        type: method,
        url: url, 
        dataType: "json",
        data: data,
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        success: (response) => {
          callback(true, response); 
        },
        error: (xhr, status, error) => { 
          callback(false, error);
        },
      });  
    }
    
  } catch (error) {
    console.error("AJAX transporter exception: => ", error);
    toastMessage(`AJAX transporter exception: ${error}`, "danger")
  }
}





// toast messager settings //
var icons = {
  'success': `<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Check icon</span>
            </div>`,
  'danger': `<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Error icon</span>
            </div>`,
  'warning': `<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Warning icon</span>
              </div>`,
  'info': `<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Fire icon</span>
          </div>`,
}
var types = {
  'success': 'green',
  'danger': 'red',
  'warning': 'yellow',
  'info': 'blue',
}
// $('.toast-msg').hide()

/**
 * toast message showing description
 * @param { String } message To provide alert message to the user 
 * @param { String } type Type of alert (success, danger, info, warning)
 * @param { String } id To identify the each alert seperately (if not provided it will automatically given)
 **/
function toastMessage(message='message_not_given', type='yellow', id=rnum()) {
  try {
    let a = `<div id="toast-id-${id}" class="toast-msg z-50   fixed top-5 right-5 drop-shadow-lg flex items-center w-full max-w-xs p-4 rounded-lg shadow text-gray-400 bg-slate-700" role="alert">
              ${icons[type]}
            <div class="ml-3 text-sm text-${types[type]}-500 font-bold">${message}.</div> 
          </div>`;
    $('.alert').append(a).animate();
    // $('#toast-').show() 
    setTimeout(() => {
      $(`#toast-id-${id}`).remove().animate();
    }, 3000)
  } catch (error) {
    return `Following exception found while showing alert. ==>  ${error}`;
  }
}


 