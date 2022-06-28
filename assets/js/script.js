
var pageContentEl = document.querySelector('#page-content');

var saveTaskBtn = document.querySelector('#save-task');

var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskNameInput = document.querySelector('input[name="task-name"]');
var taskTypeInput = document.querySelector('select[name="task-type"]');

var tasksInProgressEl = document.querySelector('#tasks-in-progress');
var tasksCompletedEl = document.querySelector('#tasks-completed');

var taskIDCounter = 0;

var tasks = [];


function editTask(taskID){
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskID + '"]');
    var taskName = taskSelected.querySelector('h3.task-name').textContent;
    var taskType = taskSelected.querySelector('span.task-type').textContent;

    taskNameInput.value = taskName;
    taskTypeInput.value = taskType;
    saveTaskBtn.textContent = 'Save Task';
    formEl.setAttribute('data-task-id', taskID);
}

function completeEditTask(taskName, taskType, taskID){
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskID + '"]');

    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;
    
    tasks.forEach(elem => {
        if (elem.id === parseInt(taskID)){
            elem.name = taskName;
            elem.type = taskType;
        }
    });
    saveTasks();

    formEl.removeAttribute('data-task-id');
    formEl.reset();
    saveTaskBtn.textContent = 'Add Task';
}


function deleteTask(taskID){
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskID + '"]');
    taskSelected.remove();

    for(i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskID))
            tasks.splice(i,1);
    }
    saveTasks();
}


function taskFormHandler(event){
    event.preventDefault();

    var taskDataObject = {
        name: taskNameInput.value,
        type: taskTypeInput.value,
        status: 'to do', 
    }

    if(!taskDataObject.name || !taskDataObject.type){
        alert('You need to fill out the task form!');
        return false;
    }

    var isEdit = formEl.hasAttribute('data-task-id');
    if (isEdit){
        var taskID = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput.value, taskTypeInput.value, taskID);
    }else
        createTaskEl(taskDataObject);
    
}


function taskButtonHandler(event){
    var targetEl = event.target;
    var taskID;

    if (targetEl.matches('.edit-btn')){
        taskID = targetEl.getAttribute('data-task-id');
        editTask(taskID);
    }
    else if (targetEl.matches('.delete-btn')){
        taskID = targetEl.getAttribute('data-task-id');
        deleteTask(taskID);
    }
}


function taskStatusChangeHandler(event){
    var changedEl = event.target;
    
    var taskID = changedEl.getAttribute('data-task-id');
    var statusValue = changedEl.value.toLowerCase();
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskID + '"]');

    if (statusValue === 'to do')
        tasksToDoEl.appendChild(taskSelected);
    else if (statusValue === 'in progress')
        tasksInProgressEl.appendChild(taskSelected);
    else if (statusValue === 'completed')
        tasksCompletedEl.appendChild(taskSelected);

    tasks.forEach(elem => {
        if (elem.id === parseInt(taskID))
            elem.status = statusValue;
    });
    saveTasks();
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
    deleteButtonEl.className = 'btn delete-btn';
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
    taskDataObj.id = taskIDCounter;
    
    var listItemStatus = listItemEl.querySelector('select[name="status-change"]');
    if (taskDataObj.status === 'to do'){
        listItemStatus.selectedIndex = 0;
        tasksToDoEl.appendChild(listItemEl);
    }
    else if (taskDataObj.status === 'in progress'){
        listItemStatus.selectedIndex = 1;
        tasksInProgressEl.appendChild(listItemEl);
    }
    else if (taskDataObj.status === 'completed'){
        listItemStatus.selectedIndex = 2;
        tasksCompletedEl.appendChild(listItemEl);
    }

    tasks.push(taskDataObj);
    saveTasks();

    taskIDCounter++;
    formEl.reset();
}


function saveTasks(){
    console.log('saveTasks is running\n', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks(){
    var savedTasks = localStorage.getItem('tasks');

    if(!savedTasks)
        return false;
   
    savedTasks = JSON.parse(savedTasks);

    savedTasks.forEach(elem => {
        createTaskEl(elem);
    });
}


formEl.addEventListener('submit', taskFormHandler);

pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);


//Load tasks upon page load
loadTasks();