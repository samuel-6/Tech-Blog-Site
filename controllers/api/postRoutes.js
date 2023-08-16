const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const authCheck = require('../../utils/auth');

// This route retrieves all posts.
router.get('/', (req, res) => {

    // Find all posts.
    Post.findAll({

        attributes: [

            'id',
            'content',
            'title',
            'creation_date'

        ],
        order: [

            ['creation_date', 'DESC']

        ],
        include: [{

            model: User,
            attributes: ['username'],

        },
        {

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
                attributes: ['username'],

            },

        },],

    })
    // Send the post data back to the client.
    .then((dbPostData) => res.json(dbPostData))
    // If there's an error, return it.
    .catch((err) => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route retrieves a single post.
router.get('/:id', (req, res) => {

    // Find a single post by its ID.
    Post.findOne({

        where: {

            id: req.params.id,

        },
        attributes: [

            'id',
            'content',
            'title',
            'creation_date'

        ],
        include: [{

            model: User,
            attributes: ['username'],

        },
        {

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
                attributes: ['username'],

            },

        },],

    })
    // Send the post data back to the client.
    .then((dbPostData) => {

        // If no post is found, return an error.
        if (!dbPostData) {

            res.status(404).json({

                message: 'Unable to find a post with that ID'

            });

            return;

        }

        // Otherwise, return the post data.
        res.json(dbPostData);

    })
    // If there's an error, return it.
    .catch((err) => {

        res.status(500).json(err);

    });

});

// This route creates a single post.
router.post('/', authCheck, (req, res) => {

    // Check the session to make sure the user is logged in.
    console.log('Creating post');

    // Creates a post.
    Post.create({

        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id,
        creation_date: new Date()

    })

    // Send the post data back to the client.
    .then((dbPostData) => res.json(dbPostData))

    // If there's an error, return it.
    .catch((err) => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route updates a post.
router.put('/:id', authCheck, (req, res) => {

    // Update a post by its ID.
    Post.update({

        title: req.body.title,
        content: req.body.post_content,

    },
    {

        where: {

            id: req.params.id,

        },

    })

    // Send the post data back to the client.
    .then((dbPostData) => {

        // If no post is found, return an error.
        if (!dbPostData) {

            res.status(404).json({

                message: 'Unable to find a post with that ID'

            });

            return;

        }

        // Otherwise, return the post data.
        res.json(dbPostData);

    })
    // If there's an error, return it.
    .catch((err) => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route deletes a post.
router.delete('/:id/', authCheck, (req, res) => {

    // Delete a post by its ID.
    Post.destroy({

        where: {

            id: req.params.id,

        },

    })

    // Send the post data back to the client.
    .then((dbPostData) => {

        // If no post is found, return an error.
        if (!dbPostData) {

            res.status(404).json({

                message: 'Unable to find a post with that ID'

            });

            return;

        }

        // Otherwise, return the post data.
        res.json(dbPostData);

    })
    
    // If there's an error, return it.
    .catch((err) => {

        console.log(err);
        res.status(500).json(err);

    });

});

module.exports = router;    