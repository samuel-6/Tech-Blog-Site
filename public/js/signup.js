// This script handles the signup functionality.
async function signupFormHandler(event) {

    // Prevents the default form action from being carried out.
    event.preventDefault();

    // Gets the values from the signup form.
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // If both values are present, sends a fetch request to the users route.
    if (username && password) {

        const response = await fetch('/api/users', {

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

// Adds an event listener to the signup form.
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);