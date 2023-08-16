const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Post, Comment } = require('../../models');

// This route retrieves all users.
router.get('/', (req, res) => {

    // Find all users.
    User.findAll({

        attributes: {

            exclude: ['password']

        }

    })

    // Send the user data back to the client.
    .then(dbUserData => res.json(dbUserData))

    // If there's an error, return it.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route retrieves a single user.
router.get('/:id', (req, res) => {

    // Find a single user.
    User.findOne({

        attributes: {

            exclude: ['password']

        },
        where: {

            id: req.params.id

        },
        include: [{

            model: Post,
            attributes: [

                'id',
                'title',
                'content',
                'creation_date'

            ]

        },
        {

            model: Comment,
            attributes: [

                'id',
                'comment_input',
                'creation_date'

            ],
            include: {

                model: Post,
                attributes: ['title']

            }

        }]

    })

    // Send the user data back to the client.
    .then(dbUserData => {

        // If no user is found, return an error.
        if (!dbUserData) {

            res.status(404).json({

                message: 'Unable to found a user with this ID'

            });

            return;

        }

        // Otherwise, return the user data.
        res.json(dbUserData);

    })

    // If there's an error, return it.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route creates a new user.
router.post('/', (req,res) => {

    // Create a new user.
    User.create({

        username: req.body.username,
        password: req.body.password

    })

    // Send the user data back to the client.
    .then(dbUserData => {

        // Save the user's session.
        req.session.save(() => {

            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData); // Send the user data back to the client.

        });

    })

    // If there's an error, return it.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

})

// This route logs a user in.
router.post('/login', (req, res) => {

    // Find a single user by username.
    User.findOne({

        where: {

            username: req.body.username

        }

    })

    // Send the user data back to the client.
    .then(dbUserData => {

        // If no user is found, return an error.
        if (!dbUserData) {

            res.status(400).json({

                message: 'Unable to find that username'

            });

            return;

        }

        // Otherwise, verify the user's password.
        const validPassword = bcrypt.compareSync(

            req.body.password,
            dbUserData.password

        );

        // If the password is invalid, return an error.
        if (!validPassword) {

            res.status(400).json({

                message: 'Incorrect password'

            });

            return;

        }

        // Otherwise, save the user's session.
        req.session.save(() => {

            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            // Send the user data back to the client.
            res.json({

                user: dbUserData,
                message: 'Logged in!'

            });

        });

    })

    // If there's an error, return it.
    .catch(err => {

        console.log(err);
        res.status(500).json(err);

    });

});

// This route logs a user out.
router.post('/logout', (req, res) => {

    // If the user is logged in, destroy the session.
    if (req.session.loggedIn) {

        req.session.destroy(() => {

            res.status(204).end();

        });

    }

    // Otherwise, return an error.
    else {

        res.status(404).end();

    }

});

module.exports = router;