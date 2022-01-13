$(function() {
  let clickDisabled = false;

	$('body').on('click', '.all-category-btn', () => {
		renderTasks();
	});
	$('body').on('click', '.read-category-btn', () => {
		renderTasks('read');
	});
	$('body').on('click', '.watch-category-btn', () => {
		renderTasks('watch');
    $('.h2.toWatch').show();
	});
	$('body').on('click', '.eat-category-btn', () => {
		renderTasks('eat');
	});
	$('body').on('click', '.buy-category-btn', () => {
		renderTasks('buy');
	});

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
        <button class= "edit-task" type="button" id="${taskObj.id}"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>
        <button class= "delete-btn" type = "button" name = "delete" id="${taskObj.id}"><i class="fa-solid fa-trash-can fa-fw"></i></button>

      </span>
    </header>
    <article class="inner-content">
      <p>${taskObj.start_date}</p>
    </article>
    </article>
    `;

	$task
		.append($newTask)
		.on('click', '.delete-btn', (event) => {
			$.ajax({
				method: 'POST',
				url: '/task/delete',
				data: {
        id: event.currentTarget.id
        }
			}).then(() => {
				renderTasks();
			});
		})
    // On click on edit, prevent default and run function edit task
		.on('click', '.edit-task', (event) => {
        $(document).on('submit', '#edit-task-form', () => {
          event.preventDefault();

          const taskID = event.currentTarget.id;
          const textObj = $('#edit-task-description');
          const serializeValue = $('#edit-task-form').serialize();
          console.log(serializeValue);
          console.log(taskID);

          // Ajax post to task db
          $.ajax({
            type: 'POST',
            url: `/task/${taskID}`,
            data: serializeValue
          })
            .then(() => {
              $('#edit-task-popup').fadeOut(500);
              setTimeout(() => {
                $('#edit-task-popup').toggleClass('show');
              }, 500);
              textObj.val("");
              renderTasks();
            });
        });
    });
	return $task;
};

// Function to assist to clear the container before rendering
const clearTasks = () => {
	$('.toWatch.taskContainer').empty();
	$('.toEat.taskContainer').empty();
	$('.toRead.taskContainer').empty();
	$('.toBuy.taskContainer').empty();
	$('.null.taskContainer').empty();

	$('.h2.toWatch').hide();
	$('.h2.toEat').hide();
	$('.h2.toRead').hide();
	$('.h2.toBuy').hide();
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
		}, 2000);

		const input = $('#new-task-form');
		const textObj = input.find('#task-description');

		const serializedText = textObj.serialize();
		const textValue = textObj.val();

		const error = input.find('#error');
		const errorIcon = `<i class="fas fa-exclamation-triangle"></i>`;
		error.html('');

		// Checking if textValue is empty or null
		if (textValue === '' || textValue === null) {
			error.append(`${errorIcon}  Error: task description cannot be empty`);
		} else {
			const modal = $('#new-task-popup');

			// Posting new task and rendering
			$.post('/task', serializedText).then(() => {
				$('#new-task-popup').fadeOut(500);
				modal.toggleClass('show');
				textObj.val('');
				renderTasks();
			});
		}
	});
};
