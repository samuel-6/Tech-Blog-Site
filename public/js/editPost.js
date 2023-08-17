// This script handles the post edit form submission.
async function editFormHandler(event) {

    // Prevents the default form action from being carried out.
    event.preventDefault();

    // Retrieves the post title and content from the edit post form.
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Retrieves the post id from the current url.
    const post_id = window.location.toString().split('/')[

        window.location.toString().split('/').length - 1

    ];

    // Sends a fetch request to update the post.
    const response = await fetch(`/api/posts/${post_id}`, {

        method: 'PUT',
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

// Adds an event listener to the edit post form.
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);