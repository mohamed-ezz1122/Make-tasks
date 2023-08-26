// ==============> HTML Elements
var taskModel=document.querySelector('.my-modal')
let newTaskBtn =document.getElementById("newTask")
let taskStatus =document.getElementById('status')
let taskCategory=document.getElementById('category')
let taskTitle=document.getElementById('title')
let taskDescription=document.getElementById('description')
let addBtn=document.getElementById('addBtn')
let homeTasks=document.querySelector(".tasks")
let updataBtn=document.getElementById('updataBtn')
let indexUpdat=0;
let root =document.querySelector(":root")
let modeBtn= document.getElementById('mode')
let searchInput=document.getElementById('searchInput')
let section=document.querySelectorAll("section")
let collumsBtn=document.getElementById("barsBtn")
let rowsBtn=document.getElementById("gridBtn")
let tasksContainer=document.querySelectorAll(".tasks")
// 
// ==========>App variables
let tasksArr=JSON.parse(localStorage.getItem('task')) || [];
// console.log(tasksArr);
// display tasks by localstoreg==========>

let containerSec = 
{
    nextUp: document.querySelector('.to-do'),
    inProgress: document.querySelector('.in-progress'),
    done: document.querySelector('.done'),
}
let regexTitel=/^[A-Z]{1}[a-z ]{5,12}$/
let regexDesc=/^[A-Za-z ]{10,80}$/

for(var i=0 ; i<tasksArr.length ;i++)
{
    // console.log(i);
    displayTasks(i)

}






// &=========> Functions
function showModel(){
    taskModel.classList.replace('d-none' , 'd-flex')
    scroll(0, 0);
    body.style.overflow = "hidden";

}

function headinModel()
{
    taskModel.classList.replace('d-flex' , 'd-none')
}
// ============Get task function==========/
function getTask(){
   if(validate(regexTitel , taskTitle) &&validate (regexDesc , taskDescription))
   {
    var task={
        status:taskStatus.value,
        category:taskCategory.value,
        title:taskTitle.value,
        description:taskDescription.value,
    }
    
    tasksArr.push(task)
    localStorage.setItem('task', JSON.stringify(tasksArr))
    displayTasks(tasksArr.length -1)
    headinModel()
   }
    //    console.log(tasksArr[tasksArr.length -1].category);
    
}

// ============display  function==========/
function displayTasks(index) {
    indexUpdat=index;
    taskHTML = `
        <div class="task">
          <h3 class="text-capitalize">${tasksArr[index].title}</h3>
          <p class="description text-capitalize">${tasksArr[index].description}</p>
          <h4 class="category ${tasksArr[index].category} text-capitalize">${tasksArr[index].category}</h4>
          <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
            <li><i class="bi bi-pencil-square" onclick="updataTasks(${index})"></i></li>
            <li><i class="bi bi-trash-fill" onclick="deletTasks(${index})" ></i></li>
            <li><i class="bi bi-palette-fill" onclick="butBackgrond(event)" ></i></li>
          </ul>
      </div>
      `
      
      containerSec[tasksArr[index].status].querySelector(".tasks").innerHTML +=taskHTML
    //   
  }
  
// function regex ===============>
// function butRegex()
// {
//     if (regexTitel.text(taskTitle.value))
//     {



//         return true;
//     }
// }

// random functon =======>
function getColors(){
   let colorLetters=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
   let color ='#'
   for(var i = 1 ;i<=6 ; i++)
   {
    let random=Math.trunc(Math.random()* colorLetters.length)
    color+= colorLetters[random]
   }
   return color+22
}
let randomColor=getColors()
// console.log(randomColor);

function butBackgrond(e){
  e.target.closest(".task").style.backgroundColor=getColors()
    // console.log( parent);
}
// ========>delet function<=========/
function emptyContiner(){
    for(item in containerSec)
    {
        // console.log(containerSec[item]);
        containerSec[item].querySelector('.tasks').innerHTML=""
    }
}
function deletTasks(i){

    // console.log(i);
    emptyContiner() 
    tasksArr.splice(i,1)
    localStorage.setItem('task', JSON.stringify(tasksArr))
    for(let i=0 ; i<tasksArr.length ;i++)
{
    
    displayTasks(i)

}
// emptyContiner()


}
function updataTasks(i)
{
    // showModel()
    taskStatus.value=tasksArr[i].status
    taskCategory.value=tasksArr[i].category
    taskTitle.value=tasksArr[i].title
    taskDescription.value=tasksArr[i].description

    addBtn.classList.add("d-none")
    updataBtn.classList.replace('d-none','d-block')
    showModel()
    
}
function newTasksValue(i)
{
    emptyContiner()
    tasksArr[indexUpdat].status=taskStatus.value
    tasksArr[indexUpdat].category=taskCategory.value
    tasksArr[indexUpdat].title=taskTitle.value
    tasksArr[indexUpdat].description=taskDescription.value
    localStorage.setItem('task', JSON.stringify(tasksArr))
    for(let i=0 ; i<tasksArr.length ;i++)
{
    
    displayTasks(i)

}

headinModel()

}
function cheaningMode(){
    if(modeBtn.classList.contains("bi-brightness-high-fill"))
    {
        root.style.setProperty("--main-black" , " #fafafa")
        root.style.setProperty(" --sec-black" , "#e4e5f1")
        root.style.setProperty(" --finance-color" , "#d2d3db")
        root.style.setProperty("  --health-color" , "##9394a5")
        root.style.setProperty(" --productivity-color" , "##d2d3db")
        root.style.setProperty(" --mid-gray" , "##484b6a")
        
        modeBtn.classList.replace("bi-brightness-high-fill","bi-moon-stars-fill")
  
  
    }else{
        root.style.setProperty("--main-black" , " #0d1117")
        root.style.setProperty(" --sec-black" , " #161b22")
        root.style.setProperty(" --finance-color" , " #30a277")
        root.style.setProperty(" --health-color" , " #fb882e")
        root.style.setProperty("  --productivity-color" , " #fc3637")
        root.style.setProperty("  --education-color" , " #2e4acd")
        modeBtn.classList.replace("bi-moon-stars-fill","bi-brightness-high-fill")
    }
}
// ========>search function<========/
let searchArr=[]
function searchTasks(term){
    emptyContiner() 
    
    for(let i=0 ;i <tasksArr.length;i++)
    {
        if((tasksArr[i].category||tasksArr[i].title).toLowerCase().includes(term.toLowerCase())===true)

        {
            searchArr.push(tasksArr[i])
        }
    }
    // console.log(searchArr);
    for(let i=0 ; i<searchArr.length ;i++)
    {
        
        displayTasks(i)
    
    }
    

    
    
    
}
// ========>validate<=========/
function validate(regex , element){
    if(regex.test(element.value))
    {
    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
    element.parentElement.nextElementSibling.classList.replace('d-block' , "d-none")

        return true
    } else
    {
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
        element.parentElement.nextElementSibling.classList.replace('d-none', "d-block")
        
        return false
    }
}
// ========>col style<=========/

function chengeStyle(){
    collumsBtn.classList.add("active")
    rowsBtn.classList.remove("active")
    for(let i=0 ; i<section.length ; i++)
    {
        section[i].classList.remove("col-lg-4" , "col-md-6")
    }
    for(let i=0 ;i<tasksContainer.length;i++){
        tasksContainer[i].setAttribute("data-view" , "bars")
    }
}
// ========>Row Style<=========/

function chengeStyleRow(){
    collumsBtn.classList.remove("active")
    rowsBtn.classList.add("active")
    for(let i=0 ; i<section.length ; i++)
    {
        section[i].classList.add("col-lg-4" , "col-md-6")
    }
    for(let i=0 ;i<tasksContainer.length;i++){
        tasksContainer[i].removeAttribute("data-view" , "bars")
    }
}














// &=========> Add Event 
newTaskBtn.addEventListener('click', function(){
    showModel()
    addBtn.classList.replace("d-none" , "d-block")
    updataBtn.classList.replace('d-block','d-none')

})
document.addEventListener('keydown' , function(e){

if(e.key ==='Escape'){
    headinModel()
}

})
document.addEventListener('click' , function(e){
    if(e.target.id === "modal"){
        headinModel()
        addBtn.classList.replace("d-none" , "d-block")
    updataBtn.classList.replace('d-block','d-none')

    }
})
// <========turen on getTask===============>
addBtn.addEventListener('click',function(){
    getTask()
    
})
updataBtn.addEventListener('click',newTasksValue )
modeBtn.addEventListener('click',cheaningMode)
searchInput.addEventListener("input",function(){
    searchTasks(searchInput.value)
})
taskDescription.addEventListener('input' ,function(){
    validate(regexDesc, taskDescription)
})
taskTitle.addEventListener('input' ,function(){
    validate(regexTitel, taskTitle)
})
collumsBtn.addEventListener("click" ,chengeStyle)
rowsBtn.addEventListener("click" ,chengeStyleRow)