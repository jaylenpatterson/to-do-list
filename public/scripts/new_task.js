// const searcher = require('../../helpers/categorize');

$(() => {
	const onSubmit = function(event) {
		event.preventDefault();

		const data = $(this).serialize();

		$.post('/task', data).then(() => {
			$(`.new_task`).hide();
		});

		// addToTask(serializedData);

		// $(`#task_container`).prepend(
		// 	$(`
		// 	<div class = "check_complete">

		// 	<input type = "checkbox">
		// 	<div class = "task_data">
		// 	<h5>${$('#task_title').val()}</h5>
		// 	<h5>${$('#task_end_date').val()}</h5>
		// 	</div>

		//   </div>

		//   <h5>Icons(info, edit, delete)</h5>`)
		// 	);
	};


	

	$('#new_task_form').on('submit', onSubmit);
});

// 	text: `INSERT INTO categories (name, descriptiion)
// VALUES ($1, $2)
// `,

// const sorter = function(task) {
// 	if (searcher(task) === "read") {

// 	}
// 	if (searcher(task) === "watch") {

// 	}
// 	if (searcher(task) === "eat") {

// 	}
// 	if (searcher(task) === "buy") {

// 	}
// }
