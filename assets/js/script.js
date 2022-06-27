
var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskNameInput = document.querySelector('input[name="task-name"]');
var taskTypeInput = document.querySelector('select[name="task-type"]');

function taskFormHandler(event){
    event.preventDefault();

    var taskDataObject = {
        name: taskNameInput.value,
        type: taskTypeInput.value
    }

    createTaskEl(taskDataObject);
}

function createTaskEl(taskDataObj){
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = '<h3 class="task-name">' + taskDataObj.name + '</h3><span class="task-type">' + taskDataObj.type + '</span>';
    console.log(taskInfoEl.innerHTML);

    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener('submit', taskFormHandler);