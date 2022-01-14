$(function() {
  // Get the user data and create a header
  getTheUser().then((userObj) => {
    createNewNavDiv(userObj);
  });
});

// Create nav based on user
const createNewNavDiv = (user) => {
  const $nav = $('#nav');

  $nav.empty();
  if (Object.keys(user).length > 0) {
    const $navBar = $(`
      <h1>Welcome back, ${user.name}</h1>
      <h1>Task Master!</h1>
      `);
    $('nav').append($navBar);
  }
};

// Animation
const animateHeaderButtons = function(form) {
  $main.empty();
  $main.fadeIn(2000);
  $main.children().promise().then(function() {
    $main.append(form);
  });
};

// Get user data
const getTheUser = function() {
  return $.ajax({
    url: '/users/'
  }).then((userObj) => {
    return userObj;
  });
};

// HTML for form variables
$registerForm = `
<form id=register-form class="form">
<div>
  <div class="container">
    <div>
      <label for="name"><b>Name</b></label>
      <input type="text" placeholder="Enter Name (required)" name="name" required>
    </div>
    <div>
      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email (required)" name="email" required>
    </div>
    <div>
      <label for="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password (required)" name="password" required>
    </div>
    <button type="submit">Register</button>
  </div>
</div>
</form>
`;
