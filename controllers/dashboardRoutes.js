const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const authCheck = require('../utils/auth');

// This route fetches all of the user's posts and renders them to the dashboard.
router.get('/', authCheck, (req, res) => {

    // Retrieves all of the user's posts.
    Post.findAll({

        where: {

            user_id: req.session.user_id

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

    // After retrieving the data, renders the dashboard.
    .then(dbPostData => {

        // Transforms the posts into plain objects.
        const posts = dbPostData.map(post => post.get({

            plain: true

        }));
        
        // Renders the dashboard.
        res.render('dashboard', {

            posts,
            loggedIn: true

        });

    })

    // If there is an error, logs it and sends a 500 status response.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route fetches a single post and let's the user edit it by rendering the edit-post page.
router.get('/edit/:id', authCheck, (req, res) => {

    // Retrieves a single post.
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

    // After retrieving the data, renders the edit-post page.
    .then(dbPostData => {

        // If there is no post with the specified ID, returns a 404 status response with an error message.
        if (!dbPostData) {

            res.status(404).json({

                message: 'Unable to find a post with this ID'

            });
            
            return;

        }

        // Transforms the post into a plain object.
        const post = dbPostData.get({

            plain: true

        });

        // Renders the edit-post page with the post data.
        res.render('edit-post', {

            post,
            loggedIn: true

        });

    })

    // If there is an error, logs it and sends a 500 status response.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

})

// This route lets the user create a new post by rendering the add-post page.
router.get('/new', (req, res) => {

    // Renders the add-post page if the user is logged in.
    res.render('add-post', {

        loggedIn: true

    })

})

module.exports = router;