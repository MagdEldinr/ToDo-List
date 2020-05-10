const reset = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


//Classes 

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Retrive data

let listArray, idCounter;
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

// Load reterived data


function loadData(arr){
    arr.forEach(function(item){
        addToDo(item.task, item.id, item.done, item.trash)
    })
}

//Update date
const dateOptions = {weekday: 'long', month: 'short', day:'numeric'};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", dateOptions);



// Adding todo

function addToDo(toDo, id, done, trash){

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
        <i class="fa fa-trash delete fa-lg" job="delete" id="${id}"></i>
    </li>`;

    list.insertAdjacentHTML("beforeend", newItem);

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

// Get item from user input
input.addEventListener("keyup", function(e){
    if(e.keyCode === 13){

        let toDo = input.value;
        //Check that input is not empty
        if(toDo){
            addToDo(toDo, idCounter, false, false);
            listArray.push({
                task: toDo,
                id: idCounter,
                done: false,
                trash: false
            });
            localStorage.setItem("ToDo-List", JSON.stringify(listArray));
            idCounter++;
        }
        input.value = "";
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