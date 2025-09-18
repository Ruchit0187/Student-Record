const userid=document.querySelector("#userid");
const password=document.querySelector("#password");
const loginbtn =document.querySelector(".btn");
const eye=document.querySelector(".eye");
const submit=document.querySelector(".submit");
const contactName=document.querySelector("#name");
const contactEmail=document.querySelector("#email");
const description=document.querySelector("#description")
const hidden=document.querySelector(".hidden")
const check1=document.querySelector(".check1")
const check2=document.querySelector(".check2")
const check3=document.querySelector(".check3")
const check4=document.querySelector(".check4")
const check5=document.querySelector(".check5")

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
userid.addEventListener("click",(e)=>{
    check1.innerText=""
    check2.innerText=''
})
password.addEventListener('click',(e)=>check2.innerText="")
function loginform(){
    let input1=userid.value;
    let input2=password.value; 
    let storageKey=Object.keys(localStorage);
    if(!storageKey.includes(input1)){
        userid.value=""
        password.value=''
        // userid.placeholder="enter the valid userid"
        // password.placeholder="enter the valid password"
        check1.innerText="enter the proper userID"
        check2.innerText="enter the proper Password"
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
            // password.placeholder="enter the  valid password"
            check2.innerText="enter the proper Password"
        }
    }
    }
}
// contact us 
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    contactusform()
})
function contactusform(){
   let inputname=contactName.value;
   let inputEmail=contactEmail.value;
   inputname=inputname.trim()
   let nameregx=/^[a-zA-Z]{3,}\s{1}[a-zA-Z0-9]{3,}$/
   if(!nameregx.test(inputname)){
        contactName.value=''
        // contactName.placeholder="enter full name"
        check3.innerText="Enter The Name"
   }
   let emailregx=/^[0-9a-z+.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if(!emailregx.test(inputEmail)){
        contactEmail.value=''
        // contactEmail.placeholder="enter valid Email"
        check4.innerText="Enter a valid Email"
   }
   if(inputEmail===""){
    check4.innerText="Enter the Email ID"
   }
   if(description.value===""){
    check5.innerText="Enter the Description"
   }
   let descriptionsp=description.value.trim();
   descriptionsp=descriptionsp.split(' ')
   if(descriptionsp.length<10){
    check5.innerText="Please Enter the minimum 10 words"
   }
   if(inputname!=="" && inputEmail!=="" && description!==""){
    hidden.removeAttribute("hidden");
   }
}
contactName.addEventListener('click',()=>check3.innerText='')
contactEmail.addEventListener('click',()=>check4.innerText='');
description.addEventListener('click',()=>check5.innerText="")