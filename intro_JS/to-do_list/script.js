function createTaskData(taskName) {
  const TASK_DIV = document.createElement('div');
  const TASK_CHECK = document.createElement('input');
  const TASK_NAME = document.createElement('h4');
  const TASK_REMOVE_BUTTON = document.createElement('button');
  
  TASK_DIV.className = 'taskContainer';
  

  TASK_CHECK.setAttribute("type", "checkbox");
  TASK_CHECK.addEventListener('change', (e) => {
    if(e.target.checked) {
      TASK_NAME.style = 'text-decoration: line-through';
    }
    else {
      TASK_NAME.style = 'text-decoration: none';
    }
  });
  
  
  TASK_NAME.textContent = taskName;
  

  TASK_REMOVE_BUTTON.innerText = 'X';
  TASK_REMOVE_BUTTON.addEventListener('click', (e) => removeTask(TASK_DIV) );
  

  TASK_DIV.appendChild(TASK_CHECK)
  TASK_DIV.appendChild(TASK_NAME)
  TASK_DIV.appendChild(TASK_REMOVE_BUTTON)
  
  return TASK_DIV;
}

function isTaskCompleted() {

}

function createTask(taskName) {
  if(taskName === '')
    window.alert('Insira um nome válido na tarefa!')

  else {
    const TASK_DIV = createTaskData(taskName);
    document.getElementById('list').appendChild(TASK_DIV);
  }
}

function removeTask(element) {
  document.getElementById('list').removeChild(element);
}

document.getElementById('addButton').addEventListener('click', (e) => {
  e.preventDefault();
  let task = document.getElementById('task').value;
  createTask(task);
});

