$(document).ready(function() {

});

// Creates an HTML task element
const createTaskElement = (taskObj) => {
  let $newTask = null;


    $newTask = `
    <article class="listed-tasks">
    <header>
      <h4>${taskObj.title}</h4>
      <span class="icons">
        <i class="fa-solid fa-info fa-fw"></i>
        <i class="fa-solid fa-pen-to-square fa-fw"></i>
        <i class="fa-solid fa-trash-can fa-fw"></i>
      </span>
    </header>
    <article class="inner-content">
      <p>${taskObj.completed_by}</p>
    </article>
    </article>
    `;
  return $newTask;
};

// Function assist to clear the container before rendering
const clearTasks = () => {
  $('main').empty();
};

// Function to create a list of task for rendering
const taskListBuilder = (task) => {
  const newTask = createTaskElement(task);
    $('main').append(newTask);
};

// Function that grabs the tasks from the database and renders them
const renderTasks = () => {
  clearTasks();
  $.get('/tasks')
    .then(data => {
      for (const taskID in data) {
        const task = data[taskID];
          taskListBuilder(task);
      }
    });
};
