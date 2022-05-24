// // (function() {
// //DB init
// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
// }
// this.database = firebase.database();
//




// write data
function writeData() {


    var url = document.getElementById("videoField").value;
    var description = document.getElementById("descriptionField").value;
    // firebase.firestore().collection("videos").doc(url).set({})

    firebase.firestore().collection("videos").doc(url).set({
        description: description,
        timeStamp: new Date()
    }).then(function() {

        console.log("Document successfully written!");
        getData();

    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        alert("Error writing document");

    });
}


// function getData() {
//
//    document.getElementById('input').innerHTML = "";
//     var query = firebase.firestore().collection("videos").orderBy(firebase.firestore.FieldPath.documentId());
//
//     query.get()
//     .then(function(querySnapshot) {
//
//         querySnapshot.forEach(function(doc) {
//
//
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//             var docId = doc.id;
//             var docDescription = doc.data().description;
//             $( "#input" ).append('<div id="'+ docId +' " class=" test col-lg-6 mb-4"> <div  class=" card h-100"> <iframe class=" card-img-top video_frame"  src="https://www.youtube.com/embed/'+ docId +'" frameborder="0"   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <button id="'+ docId +'" class="delete_video" onclick="deleteDoc(\'' + docId + '\')">' + "X" + '</button> <p class="card-text"> '+ docDescription +' </p> </div> </div>');
//
//         });
//          last = querySnapshot.docs[querySnapshot.docs.length-1];
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
//
//
// }
//




function deleteDoc(docId) {

    firebase.firestore().collection('videos').doc(docId).delete().then(function() {
        console.log("Document successfully deleted!");
        // TODO find button by docId and delete it
        $( "#docId" ).remove();
        getData();//to update elements and clear old ones

    }).catch(function(error) {
        console.error("Error removing document: ", error);
        alert('unable to delete, try again')
    });
}
// }());


