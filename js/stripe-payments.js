// (function() {
// DB init
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
this.database = firebase.database();



/**
 * Firebase auth configuration
 */


const STRIPE_PUBLISHABLE_KEY = 'pk_live_51HSCrEDFZLcOSV2NZQ8iCRjKooCwNgOLVtpTbOI8mXWsn78MOGvc3eagjkskOJV3qY9nYRCqsHoIYqTQyD8rjMZR00L6SAXOjV';


// Replace with your tax ids
// https://dashboard.stripe.com/tax-rates
const taxRates = ['txr_1HVSUBDFZLcOSV2NIgwdE5jm']


// Replace with your cloud functions location
const functionLocation = 'us-central1'



firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {

        currentUser = firebaseUser.uid;
        startDataListeners();
    } else {

        firebaseUI.start('#firebaseui-auth-container', firebaseUiConfig);
    }
});



/**
 * Data listeners
 */
function startDataListeners() {
    // Get all our products and render them to the page
    const products = document.querySelector('.products');
    const template = document.querySelector('#product');
    firebase.firestore().collection('products')
        .where('active', '==', true)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                const priceSnap = await doc.ref
                    .collection('prices')
                    .orderBy('unit_amount')
                    .get();


                if (!'content' in document.createElement('template')) {
                    console.error('Your browser doesn’t support HTML template elements.');
                    return;
                }

                const product = doc.data();
                const container = template.content.cloneNode(true);
                    if (product.description!=null) {
                        container.querySelector('h2').innerText = product.name.toUpperCase();
                        container.querySelector('.description').innerText =
                            product.description.toUpperCase() || '';
                    }
                // Prices dropdown
                priceSnap.docs.forEach((doc) => {
                    const priceId = doc.id;
                    const priceData = doc.data();
                    const content = document.createTextNode(
                        `${new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: priceData.currency,
                        }).format((priceData.unit_amount / 100).toFixed(2))} per ${
                            priceData.interval
                        }`
                    );
                    const option = document.createElement('option');
                    option.value = priceId;
                    option.appendChild(content);
                    container.querySelector('#price').appendChild(option);
                });

                if (product.images.length) {
                    const img = container.querySelector('img');
                    img.src = product.images[0];
                    img.alt = product.name;
                }

                const form = container.querySelector('form');
                form.addEventListener('submit', subscribe);

                products.appendChild(container);
            });
        });
    // Get all subscriptions for the customer
    firebase.firestore().collection('customers')
        .doc(currentUser)
        .collection('subscriptions')
        .where('status', 'in', ['trialing', 'active'])
        .onSnapshot(async (snapshot) => {

            if (snapshot.empty) {
                // Show products
                document.querySelector('#subscribe').style.display = 'block';

                return;
            }

            document.querySelector('#subscribe').style.display = 'none';
            document.querySelector('#my-subscription').style.display = 'block';
            // In this implementation we only expect one Subscription to exist
            const subscription = snapshot.docs[0].data();
            const priceData = (await subscription.price.get()).data();



            document.querySelector(
                '#my-subscription p'
            ).textContent = `You are paying ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: priceData.currency,
            }).format((priceData.unit_amount / 100).toFixed(2))} per ${
                priceData.interval
            }. Thank you for subscribing!`;

            // add this to the role: ${await getCustomClaimRole()}.

        });
}

/**
 * Event listeners
 */


// Checkout handler
async function subscribe(event) {

    event.preventDefault();
    event.target.querySelector('button').disabled = true;
    const formData = new FormData(event.target);

    const docRef = await firebase.firestore()
        .collection('customers')
        .doc(currentUser)
        .collection('checkout_sessions')
        .add({
            price: formData.get('price'),
            allow_promotion_codes: true,
            tax_rates: taxRates,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
            metadata: {
                tax_rate: '13% sales tax exclusive',
            },
        });
    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot((snap) => {

        const { sessionId } = snap.data();
        if (sessionId) {
            // We have a session, let's redirect to Checkout
            // Init Stripe
            const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
            stripe.redirectToCheckout({ sessionId });
        }
    });
}

// Billing portal handler
document
    .querySelector('#billing-portal-button')
    .addEventListener('click', async (event) => {
        event.target.disabled = true;

        // Call billing portal function
        const functionRef = firebase
            .app()
            .functions(functionLocation)
            .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
        const { data } = await functionRef({ returnUrl: 'https://hairbysamiiee.ca/index.html' });
        window.location.assign(data.url);
    });

// Get custom claim role helper
async function getCustomClaimRole() {
    await firebase.auth().currentUser.getIdToken(true);
    const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
    return decodedToken.claims.stripeRole;
}


//test
// firebase.auth().onAuthStateChanged(firebaseUser => {
//
//
//     if (firebaseUser) {
//         async function foo() {
//             currentUser = firebaseUser.uid;
//             console.log("start")
//             var customerRef = firebase.firestore().collection('customers')
//                 .doc(currentUser)
//                 .collection('subscriptions')
//                 .where('status', 'in', ['active'])
//
//
//             try {
//                 var SnapShot = await customerRef.get();
//                 if(SnapShot.empty){
//                     alert("aint nithing");
//                 }
//
//                 SnapShot.forEach(doc => {
//                     console.log(doc.id, '=>', doc.data());
//                 });
//                 console.log("end")
//             } catch (err) {
//                 console.log('Error getting documents', err);
//             }
//         }
//
//         foo();
//     }
//
// });
