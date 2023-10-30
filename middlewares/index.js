const {expressjwt} = require('express-jwt')

exports.requireSignIn = expressjwt({
    secret: toString(process.env.JWT_SECRET),
    algorithms: ["HS256"],
});
