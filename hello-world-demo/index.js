const firebaseConfig = {

   
    apiKey: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
    authDomain: '${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}',
    measurementId: '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}',
  
  };
  firebase.initializeApp(firebaseConfig);


var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var img = document.querySelector(".img");
var percentVal;
var fileItem;
var fileName;


function getFile(e){
fileItem = e.target.files[0];
fileName = fileItem.name;
fileText.innerHTML = fileName;
}



function uploadImage(){
    let storageRef = firebase.storage().ref("image/"+fileName);
     let uploadTask = storageRef.put(fileItem);

     uploadTask.on("state_changed", (snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)* 100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal + "%";
        progress.style.width = percentVal + "%";
     },(error)=>{ 
        console.log("Error is ", error);
     },()=>{

        uploadTask.snapshot.ref.getDownloadURL().then((url)=> {
            console.log("URL", url);

            if(url != ""){
                img.setAttribute("src",url);
                img.style.display = "block ";

            }
        })
     } )
  
}