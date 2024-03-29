$(function() {
	$main = $('main');
	getTheUser().then((userData) => {
		appendMain(userData);
	});
});

// Shows main page depending on if user is logged in or not
const appendMain = function(user) {
	$main = $('main');
	$main.empty();
	if (Object.keys(user).length > 0) {
		$('main').prepend($newTaskModal);
		$('main').append($editTaskModal);
		$('main').append($buttonGroup);
		// $('main').append($newTask);
		$('main').append($taskContainer);
		renderTasks();
	}
};

// HTML content to be dynamically added
const $taskContainer = `
<section id="task-container">
<h2 class='h2 allTasks'>All//Tasks</h2>
<div class="category-watch">
<h2 class='h2 toWatch'>To//Watch</h2>
<div class='toWatch taskContainer'></div>
</div>
<div class="category-eat">
<h2 class='h2 toEat'>To//Eat</h2>
<div class='toEat taskContainer'></div>
</div>
<div class="category-read">
<h2 class='h2 toRead'>To//Read</h2>
<div class='toRead taskContainer'></div>
</div>
<div class="category-buy">
<h2 class='h2 toBuy'>To//Buy</h2>
<div class='toBuy taskContainer'></div>
</div>
</section>
`;


// to be appended to main
const $buttonGroup = `
<div class="button-group">
  <button id="new-task"><i class="fas fa-plus-square fa-3x"></i></button>
  <button class='all-category-btn'><i class="fas fa-list fa-3x"></i></button>
  <button class='watch-category-btn'><i class="fas fa-tv fa-3x"></i></button>
  <button class='eat-category-btn'><i class="fas fa-utensils fa-3x"></i></button>
  <button class='read-category-btn'><i class="fas fa-book fa-3x"></i></button>
  <button class='buy-category-btn'><i class="fas fa-shopping-cart fa-3x"></i></button>
</div>
`;
// pop up box that allows the user to create a new task
const $newTaskModal = `
<!-- The Modal -->
<div id="new-task-popup" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
  <span class="close newTask">&times;</span>
    <form id="new-task-form">
      <div>
        <textarea name="text_description" id="task-description" placeholder="Enter task description"></textarea>
        <button type="submit" class='submit-task'>Submit</button>
        <div id="error"></div>
      </div>
    </form>
  </div>
</div>
`;
// pop up box that allows the user to edit a task
const $editTaskModal = `
<div id="edit-task-popup" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
  <span class="close editTask">&times;</span>
    <form id="edit-task-form">
      <div>
        <label id="category-modal" for="category">Category:</label>
        <select class="category-select" name="category">
          <option value="watch">To Watch</option>
          <option value="eat">To Eat</option>
          <option value="read">To Read</option>
          <option value="buy">To Buy</option>
        </select>
        <textarea name="text_description" id='edit-task-description' placeholder="New Description (optional)"></textarea>
        <button type="submit">Submit</button>
        <div class="error"></div>
      </div>
    </form>
  </div>
</div>
`;
