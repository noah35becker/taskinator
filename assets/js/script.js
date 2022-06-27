
var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskNameInput = document.querySelector('input[name="task-name"]');
var taskTypeInput = document.querySelector('select[name="task-type"]');
var taskIDCounter = 0;


function taskFormHandler(event){
    event.preventDefault();

    var taskDataObject = {
        name: taskNameInput.value,
        type: taskTypeInput.value
    }

    if(!taskDataObject.name || !taskDataObject.type){
        alert('You need to fill out the task form!');
        return false;
    }

    createTaskEl(taskDataObject);
}


function createTaskActions(taskID){
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskID);

    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn edit-btn';
    deleteButtonEl.setAttribute('data-task-id', taskID);

    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskID);

    const statusChoices = ['To Do', 'In Progress', 'Completed'];
    statusChoices.forEach(elem => {
        var statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = elem;
        statusOptionEl.setAttribute('value',elem);

        statusSelectEl.appendChild(statusOptionEl);
    });

    actionContainerEl.appendChild(editButtonEl)
    actionContainerEl.appendChild(deleteButtonEl);
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}


function createTaskEl(taskDataObj){
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.setAttribute('data-task-id', taskIDCounter);

    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = '<h3 class="task-name">' + taskDataObj.name + '</h3><span class="task-type">' + taskDataObj.type + '</span>';

    var taskActionsEl = createTaskActions(taskIDCounter);

    listItemEl.appendChild(taskInfoEl);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    taskIDCounter++;
    formEl.reset();
}





formEl.addEventListener('submit', taskFormHandler);