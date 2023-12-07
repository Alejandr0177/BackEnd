const jwt = require('jsonwebtoken');
require('dotenv').config()

const credentials = (req, res, next) => {
    const accessToken = req.headers['Authenticated_user'];
    console.log(accessToken);
    if(!accessToken) return res.sendStatus(401);
    console.log(accessToken);
    const token = accessToken.split('')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.user = decoded.username;
        next();
        }
    )
}

module.exports = credentials