// const searcher = require('../../helpers/categorize');
const { Pool } = require('pg');

$(() => {
	const onSubmit = function() {
		const pool = new Pool({
			user: 'vagrant',
			password: '123',
			host: 'localhost',
			database: 'task_master'
		});

		const query = {
			text: `INSERT INTO tasks (title, start_date, end_date, category_id, user_id, urgency, complete)
		VALUES ($1, $2, $3, $4 $5, $6)
		`,
			values: [
				$('#task_title').val(),
				$('#task_description').val(),
				$('#task_start_date').val(),
				$('#task_end_date').val(),
				$('#task_category').val(),
				$('#task_priority').val()
			]
		};

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



		$(`#task_container`).prepend(
			$(`
			<div class = "check_complete">

        <input type = "checkbox">
        <div class = "task_data">
          <h5>${$('#task_title').val()}</h5>
          <h5>${$('#task_end_date').val()}</h5>
        </div>

      </div>


      <h5>Icons(info, edit, delete)</h5>`)
		);

		$(`.new_task`).hide()
		return pool.query(query);
	};

	$('#new_task_form').on('submit', onSubmit);
});

// 	text: `INSERT INTO categories (name, descriptiion)
// VALUES ($1, $2)
// `,
