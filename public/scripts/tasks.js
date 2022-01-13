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
});

// Creates an HTML task element
const createTaskElement = (taskObj) => {
	let $newTask = null;

	$newTask = `
    <article class="listed-tasks id=${taskObj}">
    <header>
      <h4>${taskObj.title}</h4>
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
	return $newTask;
};

// Function to assist to clear the container before rendering
const clearTasks = () => {
	$('.listed-tasks').remove();
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
};

// Function to create a list of task for rendering
const taskListBuilder = (task) => {
	const newTask = createTaskElement(task);
	$('main').prepend(newTask);
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
