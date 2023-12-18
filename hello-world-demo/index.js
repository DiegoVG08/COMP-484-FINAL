
const firebaseConfig = {   
    apiKey: "AIzaSyBfehJV7iy0qXLNXt-ViY7wKJzkwOTDENA",

    authDomain: "webfinal-2aff5.firebaseapp.com",
  
    projectId: "webfinal-2aff5",
  
    storageBucket: "webfinal-2aff5.appspot.com",
  
    messagingSenderId: "611944813455",
  
    appId: "1:611944813455:web:364da6e1ba8324fedff1fa"
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