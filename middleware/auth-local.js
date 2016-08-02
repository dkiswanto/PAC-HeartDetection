/**
 * Created by g40 on 30/07/16.
 */

var authLocal = function(req, res, next) {
    if (req.isAuthenticated()) 
        return next();
    res.redirect('/login');
};

module.exports = authLocal;