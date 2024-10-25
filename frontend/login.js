const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const signUpBtn = document.getElementById("signup-btn")
signInBtn = document.getElementById("signin-btn")


var typed = new Typed('.featured-words', {
    strings: ['Welcome to <span>DSA LAUNCHPAD 5.0</span>',],
    typeSpeed: 40,
    showCursor:false,
    onComplete: function(self) {
        startTypingTopics();
    }
  });

  
  function startTypingTopics(){
     var fixedTyped = new Typed("#fixed-text", {
        strings: ["Master the "],   
        typeSpeed: 50,              
        showCursor: false,          
        onComplete: function () {   
            startDynamicTyping();
        }
    });
  }
   
    function startDynamicTyping() {
        var dynamicTyped = new Typed("#typed", {
            strings: ["Basic Concepts", "Arrays", "Strings", "Searching", "Sorting", "Stack", "Queue", "Linked List", "Tree", "Graph"], // Dynamic strings
            typeSpeed: 50,   
            backSpeed: 50,   
            backDelay: 1000, 
            loop: true,      
            showCursor: true 
        });
    }



loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = '#21264D';
    registerBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    loginForm.style.left = "0%";
    registerForm.style.left = "100%";
    document.querySelector('.col-1').style.borderRadius =  "0 30% 20% 0";
});

registerBtn.addEventListener('click', () => {
    registerBtn.style.backgroundColor = '#21264D';
    loginBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    loginForm.style.left = "100%";
    registerForm.style.left = "0%";
    document.querySelector('.col-1').style.borderRadius =  "0 20% 30% 0";
});


signUpBtn.addEventListener('click', (e) => {
  console.log("clicked");
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  fetch('https://dsa-launchpad-5-0.vercel.app/registerUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  })
  .then(response => response.json())
  .then(async data => {
      if (data.success) {
        localStorage.setItem('email', email);
        console.log(data.token);
          await Swal.fire({
              title: "Hurray...",
              text: "Account created successfully!",
              icon: "success"
          });
          startGame();
      } else {
          await Swal.fire({
              title: "Oops...",
              text: "Error! Please try again.",
              icon: "error"
          });
      }
  })
  .catch(error => {
    console.error('Network error:', error);
    Swal.fire({
        title: "Network Error",
        text: "Unable to connect. Please check your connection and try again.",
        icon: "error"
    });
  });
});

signInBtn.addEventListener('click', (e) => {
  console.log("clicked");
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Show the loading swal before making the request
  Swal.fire({
    title: "Logging in...",
    text: "Please wait...",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Only one fetch request for login
  fetch('https://dsa-launchpad-5-0.vercel.app/loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => response.json())
  .then(async data => {
    Swal.close(); // Close loading Swal when response is received

    if (data.success) {
      localStorage.setItem('email', email);
      await Swal.fire({
        title: "Hurray...",
        text: "Logged in successfully!",
        icon: "success"
      });
      
      startGame();
    } else {
      await Swal.fire({
        title: "Oops...",
        text: "Error! Please try again.",
        icon: "error"
      });
    }
  })
  .catch(error => {
    Swal.close(); // Close loading Swal on error too
    console.error('Network error:', error);

    Swal.fire({
      title: "Network Error",
      text: "Unable to connect. Please check your connection and try again.",
      icon: "error"
    });
  });
});

function startGame() {
    window.location.href = '/home.html';
}