// This script handles the comment form submission.
async function commentFormHandler(event) {

    // Prevents the default form action from being carried out.
    event.preventDefault();

    // Gets the comment input from the comment form.
    const comment_input = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Gets the post id from the current url.
    const post_id = window.location.toString().split('/')[

        window.location.toString().split('/').length - 1

    ];

    // If the comment input is present, sends a fetch request to the comments route.
    if (comment_input) {

        const response = await fetch('/api/comments', {

            method: 'POST',
            body: JSON.stringify({

                post_id,
                comment_input

            }),
            headers: {

                'Content-Type': 'application/json' // Specifies that the request body will be JSON.

            }

        });

        // If the response is ok, the page is reloaded to display the new comment.
        if (response.ok) {

            document.location.reload();

        }

        // Otherwise, displays an alert with the response status text.
        else {

            alert(response.statusText);

        }

    }

}

// Adds an event listener to the comment form.
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);