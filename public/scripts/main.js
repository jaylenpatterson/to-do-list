$(function() {
  $main = $("main");
  getTheUser()
    .then(userData => {
      appendMain(userData);
    });
});

// Shows main page depending on if user is logged in or not
const appendMain = function(user) {
  $main = $("main");
  $main.empty();
  if (Object.keys(user).length > 0) {
    renderTasks();
  }
};
