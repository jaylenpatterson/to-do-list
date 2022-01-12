$(function() {
  $('body').on('click', '.all-category-btn', () => {
    renderTasks();
  });
	$('body').on('click', '.read-category-btn', () => {
		renderTasks(1);
	});
	$('body').on('click', '.watch-category-btn', () => {
		renderTasks(2);
	});
	$('body').on('click', '.eat-category-btn', () => {
		renderTasks(3);
	});
	$('body').on('click', '.buy-category-btn', () => {
		renderTasks(4);
	});
  $('body').on('click', '.fa-solid fa-trash-can fa-fw', () => {
		renderTasks(1);
	});
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
        <span><i class="fa-solid fa-trash-can fa-fw"></i><span>
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
