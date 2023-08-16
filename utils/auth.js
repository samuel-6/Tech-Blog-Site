// Middleware to check if user is logged in.
const authCheck = (req, res, next) => {

    if (!req.session.user_id) {

        res.redirect('/login');

    } 

    else {

        next();

    }

};

module.exports = authCheck;