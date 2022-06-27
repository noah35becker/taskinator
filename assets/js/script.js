
var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskNameInput = document.querySelector('input[name="task-name"]');
var taskTypeInput = document.querySelector('select[name="task-type"]');

function createTaskHandler(event){
    event.preventDefault();

    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = '<h3 class="task-name">' + taskNameInput.value + '</h3><span class="task-type">' + taskTypeInput.value + '</span>';
    console.log(taskInfoEl.innerHTML);

    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener('submit', createTaskHandler);