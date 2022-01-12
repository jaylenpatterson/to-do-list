$(function() {
  $main = $("main");
  getTheUser()
    .then(userData => {
      appendMain(userData);
    });
});

// Shows main page depending on if user is logged in or not
const appendMain = function(user) {
  $main = $("main");
  $main.empty();
  if (Object.keys(user).length > 0) {
    $('main').prepend($newTaskModal);
    $('main').append($buttonGroup);
    $('main').append($newTask);
    $('main').append($taskContainer);
    renderTasks();
  }
};

// HTML content to be dynamically added
const $taskContainer = `
<section id="task-container">
`

const $newTask = `<button id="new-task">Add a new task</button>`;

const $buttonGroup = `
<div class="button-group">
  <button class='all-category-btn'>All</button>
  <button class='null-category-btn'>Other</button>
  <button class='watch-category-btn'><i class="fas fa-tv"></i></button>
  <button class='eat-category-btn'><i class="fas fa-utensils"></i></button>
  <button class='read-category-btn'><i class="fas fa-book"></i></button>
  <button class='buy-category-btn'><i class="fas fa-shopping-cart"></i></button>
  <button class='completed-category-btn'><i class="fas fa-check-square"></i></button>
</div>`;

const $newTaskModal = `
<!-- The Modal -->
<div id="new-task-popup" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close new">&times;</span>
    <form id="new-task-form">
      <div>
        <textarea name="text_description" id="task-description" placeholder="Enter task description"></textarea>
        <button type="submit" class='submit-task'>Submit</button>
        <div id="error"></div>
      </div>
    </form>
  </div>
</div>`;
