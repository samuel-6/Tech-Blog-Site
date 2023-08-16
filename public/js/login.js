// This script handles the login functionality.
async function loginFormHandler(event) {

    // Prevents the default form action from being carried out.
    event.preventDefault();

    // Gets the values from the login form.
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // If both values are present, sends a fetch request to the login route.
    if (username && password) {

        const response = await fetch('/api/users/login', {

            method: 'post',
            body: JSON.stringify({

                username,
                password

            }),
            headers: {

                'Content-Type': 'application/json' // Specifies that the request body will be JSON.

            }

        });

        // If the response is ok, the user is redirected to the dashboard.
        if (response.ok) {

            document.location.replace('/dashboard');

        }
        
        // Otherwise, displays an alert with the response status text.
        else {

            alert(response.statusText);
            
        }
    }
}

// Adds an event listener to the login form.
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);