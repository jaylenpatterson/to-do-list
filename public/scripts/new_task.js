$(() => {
  let task = {
    task_title: null,
    description: null,
    start_date: null,
    end_date: null,
    category: null,
    priority:4
  }
	const onSubmit = function() {
    task.task_title = $('#task_title').val()

    alert(task.task_title)
	};
	const newTask = function() {
    
  };
  $('#new_task_form').on('submit', onSubmit,);

});
