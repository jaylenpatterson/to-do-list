$(document).ready(() => {
  submitModal();
  editModal();
});

const submitModal = function() {
  $(document).on('click',"#new-task", () => {
    $('#new-task-popup').fadeIn(500);
    $('#new-task-form').find('#task-description').focus();
  });
  $(document).on('click','.close.new', () => {
    $('#new-task-popup').fadeOut(500);
  });
};


const editModal = function() {
  // Opens the modal window for editing the task
	$(document).on('click', '.edit-task', function() {
  	$('#edit-task-popup').fadeIn(500);
    $('#edit-task-form').find('#edit-task-description').focus();
  	setTimeout(() => {
    	$('#edit-task-popup').toggleClass('show')
  	}, 500);
	});

	// Close modal
	$(document).on('click', '.close.edit', (event) => {
  	$('#edit-task-popup').fadeOut(500);
  	setTimeout(() => {
    	$('#edit-task-popup').toggleClass('show');
  	}, 500);
	});
}
