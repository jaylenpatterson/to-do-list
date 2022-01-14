$(document).ready(() => {
	submitModal();
	editModal();
});

const submitModal = function() {
	$(document).on('click', '#new-task', () => {
		$('#new-task-popup').fadeIn(500);
		$('#new-task-form').find('#task-description').focus();
	});
	$(document).on('click', '.close.newTask', () => {
		$('#new-task-popup').fadeOut(500);
	});
};

const editModal = function() {
	// Opens the modal window for editing the task
	$(document).on('click', '.edit-task', function() {
		const taskID = $(this).closest('.edit-task').attr('id');

		$('#edit-task-popup').fadeIn(500);
		$('#edit-task-form').find('#edit-task-description').focus();
		setTimeout(() => {
			$('#edit-task-popup').toggleClass('show');
		}, 500);
		$('body').data('taskID', taskID);
	});

	// Close modal
	$(document).on('click', '.close.editTask', () => {
		$('#edit-task-popup').fadeOut(500);
	});
};
