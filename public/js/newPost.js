// This script handles the post creation.
async function newFormHandler(event) {

    // Prevents the default form action from being carried out.
    event.preventDefault();

    // Retrieves the post title and content from the new post form.
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Sends a fetch request to create the post.
    const response = await fetch('/api/posts', {

        method: 'POST',
        body: JSON.stringify({

            title,
            post_content

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

// Adds an event listener to the new post form.
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);