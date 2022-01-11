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
		return pool.query(query);
	};

	$('#new_task_form').on('submit', onSubmit);
});

// 	text: `INSERT INTO categories (name, descriptiion)
// VALUES ($1, $2)
// `,
