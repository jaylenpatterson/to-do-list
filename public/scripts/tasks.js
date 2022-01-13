$(function() {
	$('body').on('click', '.all-category-btn', () => {
		renderTasks();
	});
	$('body').on('click', '.read-category-btn', () => {
		renderTasks('read');
	});
	$('body').on('click', '.watch-category-btn', () => {
		renderTasks('watch');
	});
	$('body').on('click', '.eat-category-btn', () => {
		renderTasks('eat');
	});
	$('body').on('click', '.buy-category-btn', () => {
		renderTasks('buy');
	});
  //incomplete
	$('body').on('click', '.delete-btn', () => {
		$.ajax({
			method: 'POST',
			url: '/delete',
			data: data
		}).then(() => {
			renderTasks();
		});
	});
	$('body').on('click', '.edit-btn', () => {});
	$('body').on('click', '.info-btn', () => {});
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
        <button class = "info-btn" type="button"><i class="fa-solid fa-info fa-fw"></i><button>
        <button class = "edit-btn" type="button"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>
        <form method = "post">
        <button class = "delete-btn" type = "button" name = "delete"><i class="fa-solid fa-trash-can fa-fw"></i></button>
        </form>
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
	$('.watch.taskContainer').empty();
	$('.eat.taskContainer').empty();
	$('.read.taskContainer').empty();
	$('.buy.taskContainer').empty();
	$('.null.taskContainer').empty();

	$('.h2.watch').hide();
	$('.h2.eat').hide();
	$('.h2.read').hide();
	$('.h2.buy').hide();
	$('.h2.null').hide();
  $('.listed-tasks').remove();
};

// Function to create a list of task for rendering
const taskListBuilder = (task) => {
  const newTask = createTaskElement(task);
    $('main').append(newTask);
};

// Function that grabs the tasks from the database and renders them
const renderTasks = (filter) => {
	clearTasks();
	$.get(`/task${filter ? '?filter=' + filter : ''}`).then((data) => {
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
    // Prevent submit spam
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

    // Checking if textValue is empty or null
    if (textValue === "" || textValue === null) {
      error.append(`${errorIcon}  Error: task description cannot be empty`);
    } else {
      const modal = $('#new-task-popup');
      // Posting new task and rendering
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
