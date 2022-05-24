(function() {//login

    //get elements
    var txtEmail = document.getElementById("txtEmail");
    var txtPassword = document.getElementById("txtPassword");
    var btnLogin = document.getElementById("btnLogin");
    var btnLogOut = document.getElementById("btnLogOut");

    // login event
  btnLogin.addEventListener('click', e => {

    //get email and pass
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var user = firebase.auth().currentUser;
    //sign in
      function validateEmail(email) {
          const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return re.test(String(email).toLowerCase());
      }


      if (email.length === 0 && pass.length === 0){
          alert('The form is empty');
      }
       else if (email.length === 0){
        alert('Email field is empty');
      }
      else if (!validateEmail(email)){
          alert('Email is invalid or may contain an error');
      }
      else if (pass.length === 0) {
           alert('Password field is empty');
      }
      else if (pass.length <= 8)
      {
          alert('password must contain at least 9 characters');
      }
else {

    firebase.auth().signInWithEmailAndPassword(email, pass).then(function () {


        if (user && firebase.auth().currentUser.emailVerified) {
            // user logged in
            alert("You are now logged in and verified");
            errLogIn.classList.add('hide');

            window.location.replace('payment-page.html');
        }
        if (user && !firebase.auth().currentUser.emailVerified) {
            alert("Verify your email, please");
            errLogIn.classList.add('hide');


        }


    }).catch(function (error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // alert("There is an error with your email and/or password");
        errLogIn.classList.remove('hide');
        // ...
    });
    }


     }); //login end


    // resend verification form
    btnRetryVerification.addEventListener('click', e => {
        var user = firebase.auth().currentUser;
        if (firebase.auth().currentUser) {
            if (user.emailVerified === false) {
                user.sendEmailVerification().then(function() {
                    // Email sent.
                    alert("Verification email has been sent again");
                }).catch(function(error) {
                    // An error happened.
                    alert("Verification email has NOT been sent. Please, try again in a minute");
                });
            }
            console.log("You are registered in but not verified");
        }


    }); //reVerification end


    //logout
    // btnLogOut.addEventListener('click', e => {
    //     firebase.auth().signOut();
    //     alert("Signed out")
    // }); //logout end





}());