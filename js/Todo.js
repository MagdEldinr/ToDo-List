const reset = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const user = document.getElementById("user");
const addBtn = document.getElementById("addBtn");
const header = document.querySelector(".header");
const userSelectList = document.getElementById("user-list");


//Classes 

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Functions


// Adding todo
function addToDo(toDo, id, user, done, trash){

    if(trash){
        return;
    }
    id = id;
    const completed = done ? CHECK : UNCHECK;
    const line = done ? LINE_THROUGH : "";

    let newItem = `
    <li class="item">
        <i class="fa ${completed} circle fa-lg" job="complete" id="${id}"></i>
        <p class="text ${line}">${toDo}</p>
        <p class="text" id="item-user">(${user})</p>
        <i class="fa fa-trash delete fa-lg" job="delete" id="${id}"></i>
    </li>`;
    list.insertAdjacentHTML("beforeend", newItem);
    if(!checkIn(usersArray, user)){
        usersArray.push(user);
        let newUser = `<option value="${user}">${user}</option>`;
        userSelectList.insertAdjacentHTML("beforeend", newUser);
    }
    console.log(usersArray);
}

// Toggle toDo

function toggleToDo(e){
    e.classList.toggle(CHECK);
    e.classList.toggle(UNCHECK);
    e.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    listArray[e.id].done = !listArray[e.id].done
    localStorage.setItem("ToDo-List", JSON.stringify(listArray));
}

// Remove toDo

function removeToDo(e){
    e.parentNode.parentNode.removeChild(e.parentNode);
    listArray[e.id].trash = true;
}

// Load reterived data
function loadData(arr){
    arr.forEach(function(item){
        addToDo(item.task, item.id, item.user, item.done, item.trash)
    })
}



//Retrive data

let listArray, idCounter;
let usersArray = [];
let data = localStorage.getItem("ToDo-List")

if(data){
    listArray = JSON.parse(data);
    idCounter = listArray.length;
    loadData(listArray);
}
else{
    listArray = [];
    idCounter = 0;
}

function checkIn(array, element){
    let found = false;
    for(let i of array){
        if(i === element){
            found = true;
        } 
    }
    if(found){
        return true;
    }
    else{
        return false;
    }
}


//Update date
const dateOptions = {weekday: 'long', month: 'short', day:'numeric'};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", dateOptions);
backgroundImage = "url('img_tree.png')";

//Update background
if(today.getHours() >= 18){
    header.backgroundImage = "url('bg/afternoon.jpg')";
}
else if(today.getHours() >= 0 && today.getHours() < 7){
    header.backgroundImage = "url('img/2am.jpg')";
}
else if(today.getHours() >= 7 && today.getHours() < 18){
    header.style.backgroundImage = "url('img/morning.png')";
}

// Get item from user input
addBtn.addEventListener("click", function(e){
        let toDo = input.value;
        let toDoUser = user.value.charAt(0).toUpperCase() + user.value.slice(1)
        //Check that input is not empty
        if(toDo && toDoUser){
            addToDo(toDo, idCounter, toDoUser, false, false);
            listArray.push({
                task: toDo,
                id: idCounter,
                user: toDoUser,
                done: false,
                trash: false
            });
            localStorage.setItem("ToDo-List", JSON.stringify(listArray));
            idCounter++;
            input.value = "";
            user.value = "";
        }
})


user.addEventListener("keyup", function(e){
    if(e.keyCode == 13){
        let toDo = input.value;
        let toDoUser = user.value.charAt(0).toUpperCase() + user.value.slice(1)
        //Check that input is not empty
        if(toDo && toDoUser){
            addToDo(toDo, idCounter, toDoUser, false, false);
            listArray.push({
                task: toDo,
                id: idCounter,
                user: toDoUser,
                done: false,
                trash: false
            });
            localStorage.setItem("ToDo-List", JSON.stringify(listArray));
            idCounter++;
            input.value = "";
            user.value = "";
        }
    }  
})

//Clearing
reset.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// Get actions from user

list.addEventListener("click", function(e){
    let element = e.target; // To get the clicked element
    let job = element.getAttribute("job");
    if(job === "delete"){
        removeToDo(element);
        localStorage.setItem("ToDo-List", JSON.stringify(listArray));
    }
    if(job === "complete"){
        toggleToDo(element);
        localStorage.setItem("ToDo-List", JSON.stringify(listArray));
    }
})