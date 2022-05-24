// function getData() {
    //
    // document.getElementById('input').innerHTML = "";
    // var query = firebase.firestore().collection("videos").orderBy(firebase.firestore.FieldPath.documentId());
    //
    // query.get()
    //     .then(function(querySnapshot) {
    //
    //         querySnapshot.forEach(function(doc) {
    //             // const last = querySnapshot.size;
    //
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //             var docId = doc.id;
    //             var docDescription = doc.data().description;
    //             $( "#input" ).append('<div id="'+ docId +' " class=" test col-lg-6 mb-4"> <div  class=" card h-100"> <iframe class=" card-img-top video_frame"  src="https://www.youtube.com/embed/'+ docId +'" frameborder="0"   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <button id="'+ docId +'" class="delete_video" onclick="deleteDoc(\'' + docId + '\')">' + "X" + '</button> <p class="card-text"> '+ docDescription +' </p> </div> </div>');
    //
    //         });
    //
    //     })
    //     .catch(function(error) {
    //         console.log("Error getting documents: ", error);
    //     });


// }

    function getData() {
        var name = 'demo1';
        var container = $('#pagination-' + name);


        firebase.firestore().collection("videos").orderBy(firebase.firestore.FieldPath.documentId())
            .get().then((querySnapshot) => {
            var result = [];
            querySnapshot.forEach((doc) => {
                // var docId = doc.id;
                // var docDescription = doc.data().description;
                var el = {
                    id: doc.id,
                    description: doc.data().description
                }

                result.push(el);
            })
            console.log(result + "data from arr.result")

            var options = {
                dataSource: result,
                callback: function (response, pagination) {
                    window.console && console.log(response, pagination);

                    var dataHtml = '';

                    $.each(response, function (index, item) {
                        // dataHtml += '<li>' + item + '</li>';
                        var docId = item.id;
                        var description = item.description;
                        dataHtml +=('<div id="' + docId + ' " class=" test col-lg-6 mb-4"> <div  class=" card h-100"> <iframe class=" card-img-top video_frame"  src="https://www.youtube.com/embed/' + docId + '" frameborder="0"   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <button id="' + docId + '" class="delete_video" onclick="deleteDoc(\'' + docId + '\')">' + "X" + '</button> <p class="text-center card-text">' + description + ' </p> </div> </div>');

                    });

                    // dataHtml += '</ul>';

                    container.prev().html(dataHtml);
                }
            };
            //$.pagination(container, options);

            container.addHook('beforeInit', function () {
                window.console && console.log('beforeInit...');
            });
            container.pagination(options);

            container.addHook('beforePageOnClick', function () {
                window.console && console.log('beforePageOnClick...');
                //return false
            });


        })


    };

//for customers reduces data
function getDataReduced() {
    var name = 'demo1';
    var container = $('#pagination-' + name);
    var container = $('#pagination-' + name);


    firebase.firestore().collection("videos").orderBy('timeStamp', 'desc')
        .get().then((querySnapshot) => {
        var result = [];
        querySnapshot.forEach((doc) => {
            // var docId = doc.id;
            // var docDescription = doc.data().description;
            var el = {
                id: doc.id,
                description: doc.data().description
            }

            result.push(el);
        })
        console.log(result + "data from arr.result")

        var options = {
            dataSource: result,
            pageRange: 2,
            callback: function (response, pagination) {
                window.console && console.log(response, pagination);

                var dataHtml = '';

                $.each(response, function (index, item) {
                    // dataHtml += '<li>' + item + '</li>';
                    var docId = item.id;
                    var description = item.description;
                    dataHtml +=('<div id="'+ docId +' " class=" test col-lg-6 mb-4"> <div  class=" card h-100"> <iframe class=" card-img-top video_frame"  src="https://www.youtube.com/embed/'+ docId +'" frameborder="0"   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  <p class="text-center card-text"> '+ description +' </p> </div> </div>');

                });

                // dataHtml += '</ul>';

                container.prev().html(dataHtml);
            }
        };
        //$.pagination(container, options);

        container.addHook('beforeInit', function () {
            window.console && console.log('beforeInit...');
        });
        container.pagination(options);

        container.addHook('beforePageOnClick', function () {
            window.console && console.log('beforePageOnClick...');
            //return false
        });


    })


};

