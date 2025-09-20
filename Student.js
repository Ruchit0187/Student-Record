const userid=document.querySelector("#userid");
const password=document.querySelector("#password");
const loginbtn =document.querySelector(".btn");
const eye=document.querySelector(".eye");
const submit=document.querySelector(".csubmit");
const contactName=document.querySelector("#name");
const contactEmail=document.querySelector("#email");
const description=document.querySelector("#description")
const hidden=document.querySelector(".hidden")
const check1=document.querySelector(".check1")
const check2=document.querySelector(".check2")
const check3=document.querySelector(".check3")
const check4=document.querySelector(".check4")
const check5=document.querySelector(".check5")
const select=document.querySelector("#select")
const table=document.querySelector("table")
const tbody=document.querySelector("tbody")
const classAvg=document.querySelector(".classAvg")
const highest=document.querySelector(".highest")
const lowest=document.querySelector(".lowest")
const search=document.querySelector(".search2")
const sort =document.querySelector(".sort");
const inc=document.querySelector(".inc")
const des=document.querySelector(".des")
const reset=document.querySelector(".reset-btn")
const logout=document.querySelector(".logout");
const student_data=document.querySelector(".student-data")
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
       student_data.removeAttribute('hidden');
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
    contactusform();
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
        return
   }
   let emailregx=/^[0-9a-z+.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if(!emailregx.test(inputEmail)){
        contactEmail.value=''
        // contactEmail.placeholder="enter valid Email"
        check4.innerText="Enter a valid Email"
        return
   }
   if(inputEmail===""){
    check4.innerText="Enter the Email ID"
    return
   }
   let descriptionsp=description.value.trim();
   descriptionsp=descriptionsp.split(' ')
   if(descriptionsp.length<5){
    check5.innerText="Please Enter the minimum 5 words"
    return
   }
   if(description.value===""){
    check5.innerText="Enter the Description"
    return
   }
   if(inputname!=="" && inputEmail!=="" && description!==""){
    hidden.removeAttribute("hidden");
   }
}
contactName.addEventListener('click',()=>check3.innerText="")
contactEmail.addEventListener('click',()=>check4.innerText="");
description.addEventListener('click',()=>check5.innerText="")

// student data score sheet
let classavg=0
for(let i=0;i<dataArray.length;i++){
     let average=dataArray[i]['scores']
     let sum=average.reduce((acc,curr)=>acc+curr,0)
     average=sum/average.length;
     dataArray[i].avg=average;
     classavg=classavg+dataArray[i].avg;
     if(average>=90){
        dataArray[i].grade="A"
     }
     else if(average<89 && average>=75){
        dataArray[i].grade="B"
     }
     else if(average<75 && average>=60){
        dataArray[i].grade="C"
     }
     else if(average>50 && average<=59){
        dataArray[i].grade="D"
     }
     else{
        dataArray[i].grade="F"
     }
}
classAvg.innerText=`Class Average: ${(classavg/dataArray.length).toFixed(2)}` 
let classHigher=dataArray.map((i)=>i.avg);
classHigher=Math.max(...classHigher)
let classHigherName=dataArray.filter((i)=>i.avg===classHigher);
highest.innerText=`Class Higgest: ${classHigherName[0].name} average is ${classHigher}`
let classLower=dataArray.map((i)=>i.avg);
classLower=Math.min(...classLower);
let classLowerName=dataArray.filter((i)=>i.avg===classLower);
lowest.innerText=`Class Lowest: ${classLowerName[0].name} average is ${classLower}`

if(select.value==="All") printAllRows();
select.addEventListener("change",(e)=>{
    printRows(e.target.value);
    search.value=""
})

function printAllRows(){
    tbody.innerHTML=''
    for(let i=0;i<dataArray.length;i++){
    let tr=document.createElement('tr');
    tr.innerHTML=`<tr>
    <td>${dataArray[i].name}</td>
     <td>${dataArray[i].id}</td>
      <td>${dataArray[i].email}</td>
       <td>${dataArray[i].gender}</td>
        <td>${dataArray[i].scores}</td>
         <td>${dataArray[i].avg}</td>
         <td>${dataArray[i].grade}</td>
    </tr>`
    tbody.appendChild(tr);
   }
}
function printRows(e){
    if(e==="All"){
        printAllRows();
        return  dataArray
    }
    else{
       let value=e;
       if(value==="AB"){
         let valueAB=dataArray.filter((i)=>i.grade==="A" || i.grade==="B");
         printdata(valueAB)
         return valueAB
       }
       else{
        printdata(dataArray.filter((i)=>i.grade===value))
        return dataArray.filter((i)=>i.grade===value)
       }
    }
}

function printdata(data){
    tbody.innerHTML=''
    if(data.length===0){
         tbody.innerHTML="No Data Available"
    }
    for(let i=0;i<data.length;i++){
    let tr=document.createElement('tr');
    tr.innerHTML=`<tr>
    <td>${data[i].name}</td>
     <td>${data[i].id}</td>
      <td>${data[i].email}</td>
       <td>${data[i].gender}</td>
        <td>${data[i].scores}</td>
         <td>${data[i].avg}</td>
         <td>${data[i].grade}</td>
    </tr>`
    tbody.appendChild(tr);
   }
}
let trim;
search.addEventListener("keyup",(e)=>{
    let inputValue=e.target.value;
    inputValue=inputValue.trim()
    let selectValue=select.value;
    debounce(inputValue,selectValue);
})
function debounce(inputValue,selectValue){
    clearTimeout(trim)
    trim=setTimeout(()=>{printSearchdata(selectValue,inputValue)},800)
}
function printSearchdata(value1,value2){
    let printRowdata=printRows(value1);
    value2=value2.trim()
    value2=value2.toLowerCase();
    let ss=printRowdata.filter((i)=>i.name.toLowerCase().includes(value2));
    printdata(ss)
}

sort.addEventListener("click",(e)=>{
    sort.setAttribute("hidden",'');
    inc.removeAttribute("hidden")
    search.value=''
    Decrement()
})
inc.addEventListener("click",(e)=>{
    inc.setAttribute("hidden",'');
    des.removeAttribute("hidden")
    increasing();
})
des.addEventListener("click",(e)=>{
    inc.setAttribute("hidden",'');
    des.setAttribute("hidden",'');
    sort.removeAttribute('hidden');
    nosorting()
})
reset.addEventListener('click',(e)=>{
    resetfeature()
})
function increasing(){
     let value1=select.value;
     let printRowdata=printRows(value1);
     printRowdata.sort((a,b)=>b.avg-a.avg);
     printdata(printRowdata)
}
function Decrement() {
    let value=select.value;
    let printRowdata=printRows(value);
    printRowdata.sort((a,b)=>a.avg-b.avg);
    printdata(printRowdata)
}
function nosorting(){
    let value=select.value;
    let printRowdata=printRows(value);
    printRowdata.sort((a,b)=>a.id-b.id);
    printdata(printRowdata)
}
function  resetfeature(){
    select.value='All'
    printdata(dataArray);
    search.value=''
    inc.setAttribute("hidden",'');
    des.setAttribute("hidden",'');
    sort.removeAttribute('hidden');
}
logout.addEventListener("click",(e)=>{
    student_data.setAttribute("hidden","")
    document.getElementById("login").removeAttribute('hidden', '');
})