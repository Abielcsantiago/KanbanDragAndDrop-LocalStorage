const bttnOpenForm = document.querySelectorAll(".open-form");
const bttnAdd = document.querySelectorAll(".bttn-add");
bttnOpenForm.forEach(bttn =>{
    bttn.addEventListener('click', openForm)
})
function openForm(event){
    event.preventDefault();
    const bttn = event.currentTarget;
    const form = bttn.closest(".kanban-stage").querySelector(".form-add");
    form.classList.toggle("ativo");
}
bttnAdd.forEach(bttn =>{
    bttn.addEventListener('click', addTask)
})
function addTask(event){
    event.preventDefault();
    const bttn = event.currentTarget;
    console.log(bttn)
    const kanbanStage = bttn.closest(".kanban-stage")
    const kanbanList = kanbanStage.querySelector(".kanban-list");
    const listId = kanbanList.getAttribute("id")
    const inputTask = kanbanStage.querySelector(".input-task");
    const inputPriority = kanbanStage.querySelector(".priority")
    const task = inputTask.value;
    inputTask.value = "";
    const priority = inputPriority.value;
    if(task){
        const itemKanban = createItemKanban(task, priority, listId);
        kanbanList.append(itemKanban)
        addDragEvent();
    }
}
function createItemKanban(task, priority, stage, id){
    const template = document.querySelector("#template-task");
    const documentFragment = template.content.cloneNode(true);
    const itemKanban = documentFragment.querySelector(".task");
    itemKanban.querySelector(".content").innerText = task;
    if(!id){
        if(Number(localStorage.length) === 0){
            id = 1;
        }else{
            const keys = Object.keys(localStorage);
            id = 0;
            
            keys.forEach(key => {
                if(Number(key) >= id){
                    id = Number(key) + 1; 
                }
            })
        }
        localStorage.setItem(String(id), [task, priority, stage])  
    }
    //Se o elemento não tem ID, ele tambem não tem stage, já que é definido na criação
    itemKanban.setAttribute("data-priority", priority)
    itemKanban.setAttribute("data-stage", stage)
    itemKanban.setAttribute("id", id);
    const priorityTask = itemKanban.querySelector(".priority-task");
    switch(priority){
        case '1':
            priorityTask.innerText = "Low";
            priorityTask.classList.add("low");
            break;
        case '2':
            priorityTask.innerText = "Medium";
            priorityTask.classList.add("medium");
            break
        case '3':
            priorityTask.innerText = "Critical";
            priorityTask.classList.add("critical");
            break;
        default:
            priorityTask.innerText = "Low";
            priorityTask.classList.add("low");
    }
    const bttnDelete = itemKanban.querySelector(".bttn-delete")
    bttnDelete.addEventListener('click', event => {
        event.preventDefault();
        const task = event.currentTarget.closest(".task")
        const taskId = task.getAttribute("id");
        localStorage.removeItem(String(taskId));
        task.remove()
    })
    return itemKanban;
}
function addDragEvent(){
    const tasks = document.querySelectorAll(".task")
    tasks.forEach(task =>{
        task.addEventListener("dragstart", e =>{
            task.classList.add("draggin")  
        })
        task.addEventListener('dragend', e =>{
            e.preventDefault();
            task.classList.remove("draggin");
        })
    }) 
}

function enableDrop(){
    const kanbanList = document.querySelectorAll(".kanban-list")
    kanbanList.forEach(list =>{
        list.addEventListener("dragover", e => e.preventDefault())
        // Por algum motivo o comportamento padrão do dragover estava atrapalhando o funcionamento.
        list.addEventListener("drop", (e) =>{
            // O drop ocorre no elemento dragover
            e.preventDefault();
            const task = document.querySelector(".draggin");
            const listId = list.getAttribute("id");
            task.setAttribute("data-stage", listId);
            alterDataStage(task, listId)
            if(task)list.append(task);
        })})
}
enableDrop()
