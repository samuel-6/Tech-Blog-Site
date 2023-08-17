# Tech-Blog-Site

## Description

The Tech Blog Site is a web application that allows developers to publish articles, blog posts, and share their thoughts and opinions on various tech topics. The motivation behind this project is to provide developers with a platform to showcase their writing skills and engage with a community of like-minded individuals. The site solves the problem of finding a dedicated space for tech-related content and provides an easy to use interface for managing and publishing blog posts.

Throughout the development of this project, the following key learnings were gained:

- Building a CMS (Content Management System) for blog sites
- Implementing user authentication and authorization
- Creating database models and handling data persistence
- Designing user interfaces for a seamless user experience
- Incorporating interactive features like comments and navigation links

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To run the Tech Blog Site locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies by running the command: `npm install`.
4. Set up the database by running the command: `source db/schema.sql`.
5. Configure the environment variables for the application, including database connection details and session secret.
6. Start the server using the command: `npm start`.
7. Access the application by visiting `http://localhost:3000` in your web browser.

## Usage

Upon visiting the site for the first time, you will be presented with the homepage, which displays existing blog posts (if any have been posted), navigation links for the homepage and the dashboard, and the option to log in.

Clicking on the homepage option in the navigation will take you back to the homepage. Clicking on any other links in the navigation will prompt you to either sign up or sign in.

If you choose to sign up, you will be prompted to create a username and password. After clicking the sign-up button, your user credentials will be saved, and you will be logged into the site.

Upon revisiting the site and choosing to sign in, you will need to enter your username and password. Once signed in, you will see navigation links for the homepage, the dashboard, and the option to log out.

Clicking on the homepage option in the navigation will take you to the homepage, where you can view existing blog posts with their titles and creation dates. Clicking on an existing blog post will display the post title, contents, post creator's username, and the date created. You will also have the option to leave a comment.

When you enter a comment and click the submit button while signed in, the comment will be saved, and the post will be updated to display the comment, the comment creator's username, and the date created.

Clicking on the dashboard option in the navigation will take you to the dashboard, where you can view any blog posts you have already created and have the option to add a new blog post.

To add a new blog post, click on the button to add a new blog post in the dashboard. You will be prompted to enter a title and contents for your blog post. Clicking on the button to create a new blog post will save the title and contents, and you will be taken back to an updated dashboard with your new blog post.

In the dashboard, you can also click on one of your existing posts to delete or update it, and you will be redirected to an updated dashboard.

To log out, simply click on the logout option in the navigation.

If you are idle on the site for more than a set time, you will still be able to view posts and comments, but you will be prompted to log in again before you can add, update, or delete posts.

## Credits

This project was developed by [Samuel Munguia]. Feel free to connect with me on [GitHub](https://github.com/samuel-6) for any questions or collaborations.

## License

This project is licensed under the [MIT License](./LICENSE).