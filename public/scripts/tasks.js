$(function() {

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
      <p>${taskObj.start_date}</p>
    </article>
    </article>
    `;
  return $newTask;
};


// Function to create a list of task for rendering
const taskListBuilder = (task) => {
  const newTask = createTaskElement(task);
    $('main').prepend(newTask);
};

// Function that grabs the tasks from the database and renders them
const renderTasks = () => {
  clearTasks();
  $.get('/task')
    .then(data => {
      for (const taskID in data) {
        const task = data[taskID];
          taskListBuilder(task);
      }
    });
};
