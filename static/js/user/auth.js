
// Toggle between the signup and login view
$('.signup-section').hide()
$('.login-link').click( (e) => {
    $('.login-section').show();
    $('.signup-section').hide();
}) ;
$('.signup-link').click( (e) => {
    $('.login-section').hide();
    $('.signup-section').show();
}) ;


// Account create action
$('.signup-submit').click( (e) => {

  let data = {
    name: $("input[name='name']").val(),
    // username: $("input[name='username']").val(),
    email: $("input[name='email']").val(),
    password: $("input[name='password']").val(),
    operation: 'signup',
  }

  try{
    transporter('POST', `authenticateUser/`, data, false, (status, res) => {
      let type = (status && res.success) ? 'success' : 'yellow';
      toastMessage(res.data.alertMsg, type)
    });
  } catch (error) {
    toastMessage(`signup exception: ${error}`, danger);
  }

});


$(".loading-animation").hide();
// login 
$('.login-submit').click( (e) => {

  let data = { 
    email: $("input[name='loginEmail']").val(), 
    password: $("input[name='loginPassword']").val(),
    operation: 'login',
  }
  
  try {
    transporter("POST", `authenticateUser/`, data, false, (status, res) => { 

      if(status && res.success) { 
        $(".auth-container, .auth-nav").hide();
        $(".loading-animation").show();
          setTimeout(function() {
            if(screen.width < 768) {
              console.log('zcx');
              window.location.href = '/'
            } else {
              window.location.href = res.data.redirect_url  
            }
        // }, 7000);
        }, 1000);
      } else {
         toastMessage(res.data.alertMsg, 'danger');
      }
    });
  } catch (error) {
    toastMessage(`login exception: ${error}`, danger);
  }
 
});


// user logout button
function logoutUser() {

  try {
    transporter("POST", `/auth/userlogout/`, data, false, (status, res) => { 
      // (status && res.success) ? window.location.href = res.data.redirect_url : toastMessage(res.data.alertMsg, 'danger');
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      
      console.log(res);


    });
  } catch (error) {
    toastMessage(`login exception: ${error}`, danger);
  }


}


// google sign in
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}



 
// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '{your-app-id}',
//     cookie     : true,
//     xfbml      : true,
//     version    : '{api-version}'
//   });
    
//   FB.AppEvents.logPageView();   
    
// };

// (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));
