addEventListener("load", getLocalStorage)
function getLocalStorage(){
    console.log("Chamou getLocalStorage")
    console.log(localStorage.length)
    if(localStorage.length){
        for(let i = 1; i <= localStorage.length; i++){
            const id = i;
            const stringResponse = localStorage.getItem(String(i));
            const arrayResponse = stringResponse.split(",")
            const task = arrayResponse[0];
            const priority = arrayResponse[1];
            const stage = arrayResponse[2];
            const itemKanban = createItemKanban(task, priority, stage, id);
            const list = document.querySelector(`#${stage}`);
            list.append(itemKanban);
        } 
        addDragEvent()
    }
}
function alterDataStage(item, stage){
    const itemId = item.getAttribute("id");
    const task = item.querySelector(".content").innerText;
    const priority = item.getAttribute("data-priority");
    console.log(priority)
    localStorage.removeItem(itemId)
    localStorage.setItem(itemId, [task, priority, stage])
}