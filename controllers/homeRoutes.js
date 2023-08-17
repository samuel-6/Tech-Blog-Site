const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// This route handles GET requests to the homepage.
router.get('/', (req, res) => {

    // Find all posts.
    Post.findAll({

        attributes: [

            'id',
            'title',
            'content',
            'creation_date'

        ],
        include: [{

            model: Comment,
            attributes: [

                'id',
                'comment_input',
                'post_id',
                'user_id',
                'creation_date'

            ],
            include: {

                model: User,
                attributes: ['username']

            }

        },
        {

            model: User,
            attributes: ['username']

        }]

    })

    // Send the post data back to the client.
    .then(dbPostData => {

        // Transforms the retrieved data into a plain object.
        const posts = dbPostData.map(post => post.get({

            plain: true

        }));

        // Render the homepage template.
        res.render('homepage', {

            posts,
            loggedIn: req.session.loggedIn

        });

    })

    // If there's an error, return it.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route retrieves a single post.
router.get('/post/:id', (req, res) => {

    // Find a single post.
    Post.findOne({

        where: {

            id: req.params.id

        },
        attributes: [

            'id',
            'title',
            'content',
            'creation_date'

        ],
        include: [{

            model: Comment,
            attributes: [

                'id',
                'comment_input',
                'post_id',
                'user_id',
                'creation_date'

            ],
            include: {

                model: User,
                attributes: ['username']

            }

        },
        {

            model: User,
            attributes: ['username']

        }]

    })

    // Send the post data back to the client.
    .then(dbPostData => {

        // If no post is found, return an error.
        if (!dbPostData) {

            res.status(404).json({

                message: 'Unable to find a post with this id'

            });

            return;

        }

        // Transforms the retrieved data into a plain object.
        const post = dbPostData.get({

            plain: true

        });

        // Render the single-post template.
        res.render('singlePost', {

            post,
            loggedIn: req.session.loggedIn

        });

    })

    // If there's an error, return it.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route handles the login.
router.get('/login', (req, res) => {

    if (req.session.loggedIn) {

        res.redirect('/');
        return;

    }

    res.render('login');

});

// This route handles the signup.
router.get('/signup', (req, res) => {

    // If the user is already logged in, redirect to the homepage.
    if (req.session.loggedIn) {

        res.redirect('/');
        return;

    }

    // Otherwise, render the signup page.
    res.render('signup');

});

// This route catches all invalid routes.
router.get('*', (req, res) => {

    // Render the 404 page.
    res.status(404).send("Invalid route");

})

module.exports = router;