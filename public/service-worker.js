/* eslint-disable no-restricted-globals */
// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
// const urlB64ToUint8Array = base64String => {
//     const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//     const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
//     const rawData = atob(base64)
//     const outputArray = new Uint8Array(rawData.length)
//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i)
//     }
//     return outputArray
// }

// saveSubscription saves the subscription to the backend
// const saveSubscription = async subscription => {
//     const SERVER_URL = 'https://fierce-headland-02005.herokuapp.com/save-subscription'
//     const response = await fetch(SERVER_URL, {
//         method: 'post',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(subscription),
//     })
//     return response.json()
// }

self.addEventListener('install',function(e){
    e.waitUntil(
        caches.open('ngapalin').then((cache)=>{
            const contentToCache = [
                '/',
                '/favicon.ico',
                '/index.html',
                '/manifest.json',
                '/app.js',
                '/logo.png'
            ]
            return cache.addAll(contentToCache)
        })
    )
})

// self.addEventListener('fetch', function(event) {
//     console.log(event.request.url);
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//     );
// });


// self.addEventListener('activate',async ()=>{
//     try{    
//         const applicationServerKey = urlB64ToUint8Array('BGffNEayVQv13jepXYiEW5mgNiwPit1PVWp2IUX0l96Cgav9JSv1q9z3WKu38A7mrimahloCTCQrlxs-3IBjU0g')
//         const options = { applicationServerKey, userVisibleOnly: true }
//         const subscription = await self.registration.pushManager.subscribe(options)
//         const response = await saveSubscription(subscription)
//         // console.log(response)
//     }catch(err){
//         console.log('ERROR',err)
//     }
// })

// self.addEventListener('push', function(event) {
//     if (event.data) {
//         const data = JSON.parse(event.data.text())
//         showLocalNotification(data.title,data.message,self.registration);
//     } else {
//         console.log('Push event but no data')
//     }
// })
// const showLocalNotification = (title, body, swRegistration)=>{
//     const options = {
//         body,
//     };
//     swRegistration.showNotification(title,options);
// }

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request).then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request).then(function(res) {
//             return caches.open('dynamic').then(function(cache) {
//               cache.put(event.request.url, res.clone());
//               return res;
//             });
//           });
//         }
//       })
//     );
//   });
   