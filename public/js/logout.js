// This script handles the logout functionality.
async function logout() {

    // Sends a fetch request to the logout route.
    const response = await fetch('/api/users/logout', {

        method: 'post', // Specifies that the request will be a POST request.
        headers: {

            'Content-Type': 'application/json' // Specifies that the request body will be JSON.

        }

    });

    // If the response is ok, the user is redirected to the homepage.
    if (response.ok) {

        document.location.replace('/');

    } 
    
    // Otherwise, displays an alert with the response status text.
    else {

        alert(response.statusText);
        
    }
}

// Adds an event listener to the logout button.
document.querySelector('#logout').addEventListener('click', logout);