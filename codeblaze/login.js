function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Simple validation, you may replace it with your own authentication logic
    if (username === 'demo' && password === 'demo123') {
        alert('Login successful!');
    } else {
        alert('Invalid username or password. Please try again.');
    }
}
