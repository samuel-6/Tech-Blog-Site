// This script handles the creation of new posts.
async function createPostHandler(event) {

    // Prevents the default form action from being carried out.
    event.preventDefault();

    // Redirects the user to the new post page.
    document.location.replace('/dashboard/new')
    
}

// Adds an event listener to the create new post button.
document.querySelector('#create-new-post').addEventListener('click', createPostHandler);