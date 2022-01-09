$(document).ready(function() {
  // // Get the user data and create a header
  // getUser()
  // .then(userObj => {
  //   console.log(userObj);
  //   createNewHeaderDiv(userObj);
  // });

  $main = $('main');

  $(document).on('click', '#register-button', function(event) {
    event.preventDefault();
    animateHeaderButtons($registerForm)
  })

  // Animation
  const animateHeaderButtons = function(form) {
    $main.empty();
    $main.fadeIn(2000)
    $main.children().promise().then(function() {
    $main.append(form);
    })
  }

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
`
})
