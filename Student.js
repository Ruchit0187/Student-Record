const  userid=document.querySelector("#userid");
const password=document.querySelector("#password");
const loginbtn =document.querySelector(".btn");
const eye=document.querySelector(".eye");
let checker=true

localStorage.setItem("Admin",123456)
localStorage.setItem("admin2",789654)
// login form 
loginbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    checker=true;
    loginform();
});
eye.addEventListener("click",(e)=>{
   let attribute=password.getAttribute("type");
   if(attribute==="password"){
    password.setAttribute('type',"text");
    eye.classList.add("bi-eye")
    eye.classList.remove("bi-eye-slash");
   }
   else if(attribute==="text"){
    password.setAttribute("type","password");
    eye.classList.add("bi-eye-slash");
    eye.classList.remove("bi-eye");
   }
})

function loginform(){
    let input1=userid.value;
    let input2=password.value; 
    let storageKey=Object.keys(localStorage);
    if(!storageKey.includes(input1)){
        userid.value=""
        password.value=''
        userid.placeholder="enter te valid userid"
        password.placeholder="enter the  valid password"
        checker=false
    }
    else{
    let storagevalue=localStorage.getItem(input1);
    if(input2=== storagevalue && checker){
       document.getElementById("login").setAttribute('hidden', '');
    }
    else{
        if(input2 != storagevalue){
            password.value=''
            password.placeholder="enter the  valid password"
        }
    }
    }

}

