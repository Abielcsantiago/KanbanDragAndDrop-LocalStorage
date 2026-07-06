addEventListener("load", getLocalStorage)
function getLocalStorage(){
    if(localStorage.length){
        const ids = Object.keys(localStorage);
        for(let i in ids){
            const id = ids[i];
            const stringResponse = localStorage.getItem(String(id));
            const arrayResponse = stringResponse.split(',')
            const task = {
                content: arrayResponse[0],
                priority: arrayResponse[1],
                stage: arrayResponse[2],
                id: id
            };
            const itemKanban = createItemKanban(task.content, task.priority, task.stage, task.id);
            const list = document.querySelector(`#${task.stage}`);
            list.appendChild(itemKanban);
        }
        addDragEvent()
    }
}
function alterDataStage(item, stage){
    const itemId = item.getAttribute("id");
    const task = item.querySelector(".content").innerText;
    const priority = item.getAttribute("data-priority");
    localStorage.removeItem(itemId)
    localStorage.setItem(itemId, [task, priority, stage])
}