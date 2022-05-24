(function() {
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAl11_UjzOoCfYZ_PqExeW-dIz6mfxct30",
        authDomain: "hairbysamiiee.firebaseapp.com",
        databaseURL: "https://hairbysamiiee.firebaseio.com",
        projectId: "hairbysamiiee",
        storageBucket: "hairbysamiiee.appspot.com",
        messagingSenderId: "227993564221",
        appId: "1:227993564221:web:749eacfa86cd3b7df92654",
        measurementId: "G-ZRCDH5KBZE"
    };


 



    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    firebase.analytics();

    //get elements


    //logout
    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
        alert("Signed out")
    }); //logout end




    //add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => { //state for all pages


        if (firebase.auth().currentUser) {
            console.log(firebaseUser);
            document.getElementById("userName").innerText = "Logged in with email: " + firebase.auth().currentUser.email;


            // document.getElementById("userName").innerHTML = user.email;;
            btnLogOut.classList.remove('hide');
            // alert('Status: logged in');
        } else {
            console.log('Status: not logged in');
            document.getElementById("userName").innerText = "";
            btnLogOut.classList.add('hide');
            // alert('Status: not logged in');
        }


    }); //realtime listener end


}());