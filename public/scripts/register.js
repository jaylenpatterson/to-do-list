$(() => {
  $(document).on('submit', '#register-form', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    register(serializedData);
  });
});

// Create new header when the user registers
const register = function(data) {
  $.ajax({
    method: 'POST',
    url: '/users/',
    data: data
  })
    .then(data => {
      createNewHeaderDiv(data);
      appendMain(data);
    });
};
