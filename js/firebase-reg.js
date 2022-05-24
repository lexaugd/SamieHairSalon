(function() {//registration

    //get elements
    var txtEmail = document.getElementById("txtEmail");
    var txtPassword = document.getElementById("txtPassword");
    var btnSignUp = document.getElementById("btnSignUp");
    var btnPasswordVerif = document.getElementById("txtPasswordVerif");
   // var btnRetryVerification = document.getElementById("btnRetryVerification");


    // register event
    btnSignUp.addEventListener('click', e => {
        //get email and pass
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var passVerif = btnPasswordVerif.value;
        function validateEmail(email) {
            const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return re.test(String(email).toLowerCase());
        }

        if (email.length === 0 && pass.length === 0){
            alert('The form is empty');
        }
        else if (pass !== passVerif){
            alert('Password fields do not match');
        }
        else if (!validateEmail(email)){
            alert('Email is invalid or may contain an error');
        }
        else if (email.length === 0){
            alert('Email field is empty');
        }
        else if (pass.length === 0) {
            alert('Password field is empty');
        }
        else if (pass.length <= 8)
        {
            alert('password must contain at least 9 characters');
        }
        else {


            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (error) {


                var user = firebase.auth().currentUser;
                if (firebase.auth().currentUser) {
                    // user logged in
                    if (user.emailVerified === false) {
                        // firebase.auth().signOut();//logout when sending email to avoid reloading page and being verified

                        user.sendEmailVerification().then(function () {
                            // Email sent.
                            alert("Verification email has been sent");
                            window.location.replace('login-page.html');
                        }).catch(function (error) {
                            // An error happened.
                            alert("Verification email has NOT been sent");
                        });
                    }
                    // alert("You are now registered in but not verified");


                }
            }).catch(function (error) {

                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("register Failed, invalid email and/or password");
                // ...
            });
        }
    }); //register end


    //logout
    // btnLogOut.addEventListener('click', e => {
    //     firebase.auth().signOut();
    //     alert("Signed out")
    // }); //logout end






}());