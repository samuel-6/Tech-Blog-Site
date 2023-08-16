const router = require('express').Router();
const { Comment } = require('../../models');
const authCheck = require('../../utils/auth');

// Create a new comment.
router.post('/', authCheck, (req, res) => {

    // Check the session to make sure the user is logged in.
    if (req.session) {

        Comment.create({

            comment_input: req.body.comment_input,
            post_id: req.body.post_id,
            user_id: req.session.user_id

        })
        // Send the comment data back to the client.
        .then(dbCommentData => res.json(dbCommentData))
        // If there's an error, return it.
        .catch(err => {

            console.log(err);
            res.status(500).json(err);

        });

    }

});

module.exports = router;