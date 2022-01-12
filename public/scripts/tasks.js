$(function() {
  let clickDisabled = false;

  submitTask();
});

// Creates an HTML task element
const createTaskElement = (taskObj) => {
  let $newTask = null;
  const $task = $('<article>').addClass('listed-tasks');

    $newTask = `
    <header>
      <h4>${taskObj.description}</h4>
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

    $task.append($newTask);
    return $task;
};

// Function to assist to clear the container before rendering
const clearTasks = () => {

};


// Function to create a list of task for rendering
const taskListBuilder = (task) => {
  const newTask = createTaskElement(task);
    $('main').append(newTask);
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

// function that assists when a new task is submitted
const submitTask = () => {

  let clickDisabled = false;

  $(document).on('submit', '#new-task-form', (event) => {
    event.preventDefault();
    if (clickDisabled) {
      return;
    }
    clickDisabled = true;
    setTimeout(function() {
      clickDisabled = false;
    },2000);

    const input = $('#new-task-form');
    const textObj = input.find('#task-description');

    const serializedText = textObj.serialize();
    const textValue = textObj.val();

    const error = input.find('#error');
    const errorIcon = `<i class="fas fa-exclamation-triangle"></i>`;
    error.html("");
    // client-side error checking prior to posting the value
    if (textValue === "" || textValue === null) {
      error.append(`${errorIcon}  Error: task description cannot be empty`);
    } else {
      const modal = $('#new-task-popup');
      $.post('/task', serializedText)
        .then(() => {
          $('#new-task-popup').fadeOut(500);
          (modal.toggleClass('show'));
          textObj.val('');
          renderTasks();
        });
    }
  });
};
