const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const signUpBtn = document.getElementById("signup-btn")
signInBtn = document.getElementById("signin-btn")

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = '#21264D';
    registerBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    loginForm.style.left = "0%";
    registerForm.style.left = "100%";
    document.querySelector('.col-1').style.borderRadius =  "0 30% 20% 0";
    // loginForm.classList.remove('hidden');
    // registerForm.classList.add('hidden');
});

registerBtn.addEventListener('click', () => {
    registerBtn.style.backgroundColor = '#21264D';
    loginBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    loginForm.style.left = "100%";
    registerForm.style.left = "0%";
    document.querySelector('.col-1').style.borderRadius =  "0 20% 30% 0";
    // registerForm.classList.remove('hidden');
    // loginForm.classList.add('hidden');
});


signUpBtn.addEventListener('click', (e) => {
    console.log("clicked")
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
            await Swal.fire({
                title: "Hurray...",
                text: "Account created successfully!",
                icon: "success"
            });
            startGame();
        } else {
            await Swal.fire({
                title: "Oops..",
                text: "Error!!! Please try again.",
                icon: "error"
            });
        }
    })
    .catch(error => console.error('Network error:', error));
  });
signInBtn.addEventListener('click', (e) => {
    console.log("clicked")
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    fetch('https://dsa-launchpad-5-0.vercel.app/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(async data => {
        if (data.success) {
            await Swal.fire({
                title: "Hurray...",
                text: "Logged in successfully!",
                icon: "success"
            });
            
            startGame();
        } else {
            await Swal.fire({
                title: "Oops..",
                text: "Error!!!Please try again.",
                icon: "error"
            });
        }
    })
    .catch(error => console.error('Network error:', error));
  });


//   async function saveUsername() {
//     const username = document.getElementById('username').value;
    

//     if (username.trim() === "") {
//         await Swal.fire({
//             title: "Oops..",
//             text: "Please enter a valid username.",
//             icon: "error"
//         });
//         return;
//     } else {
//         fetch('https://acm-synanto-24-game.onrender.com/api/user/check-username', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: username.trim().toLowerCase()
//             })
//         })
//             .then(res => res.json())
//             .then(async res => {
//                 if (res.userExists) {
//                     await Swal.fire({
//                         title: "Oops..",
//                         text: "Username already exists. Please choose a different username.",
//                         icon: "error"
//                     });
//                     return;
//                 } else {
//                     fetch('https://acm-synanto-24-game.onrender.com/api/user/save-user', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({
//                             username: username.trim().toLowerCase()
//                         })
//                     })
//                         .then(res => res.json())
//                         .then(async res => {
//                             if (res.registered) {
//                                 await Swal.fire({
//                                     title: "Hurray...",
//                                     text: "Username saved successfully!",
//                                     icon: "success"
//                                 });
//                                 document.cookie = `username=${res.user._id}; max-age=86400`;
//                                 localStorage.setItem('username', res.user.username);
//                                 localStorage.setItem('progress', 1);
//                                 startGame();
//                             } else {
//                                 await Swal.fire({
//                                     title: "Oops..",
//                                     text: "Error saving username. Please try again.",
//                                     icon: "error"
//                                 });
//                             }
//                         }).catch(error => {
//                             console.error('Error:', error);
//                         });
//                 }
//             }).catch(error => {
//                 console.error('Error:', error);
//             });
//     }
// }

function startGame() {
    window.location.href = '/home.html';
}