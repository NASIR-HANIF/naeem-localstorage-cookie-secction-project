// Signup Form Logic
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Save user details in localStorage
    localStorage.setItem('user', JSON.stringify({ username, password }));
    alert('Signup Successful!');
    window.location.href = 'login.html';
});

// Login Form Logic
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && loginUsername === storedUser.username && loginPassword === storedUser.password) {
        // Set a cookie for logged in state, expires in 1 day
        setCookie('loggedIn', 'true', 1);
        // Optionally, set sessionStorage as well
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials, please try again!');
    }
});

// Check if user is logged in for the dashboard
if (window.location.pathname.includes('dashboard.html')) {
    const isLoggedInCookie = getCookie('loggedIn');
    const isLoggedInSession = sessionStorage.getItem('loggedIn');
    if (isLoggedInCookie !== 'true' || isLoggedInSession !== 'true') {
        window.location.href = 'notfound.html';
    }
}

// Logout Logic
document.getElementById('logout')?.addEventListener('click', function() {
    deleteCookie('loggedIn');
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
});

// Cookie Functions
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
