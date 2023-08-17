// This script handles the post deletion.
async function deleteFormHandler(event) {

    // Prevents the default form action from being carried out.
    event.preventDefault();

    // Extracts the post id from the current url.
    const post_id = window.location.toString().split('/')[

        window.location.toString().split('/').length - 1

    ];

    // Sends a fetch request to delete the post.
    const response = await fetch(`/api/posts/${post_id}`, {

        method: 'DELETE'

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

// Adds an event listener to the delete post button.
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);