const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.authenticateToken = (req, res, next) => {
    let accessToken = req.cookies.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}

exports.refresh = function (req, res){
    let accessToken = req.cookies.jwt
    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        payload = jwt.verify(accessToken, process.env.JWT_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }

    //retrieve the refresh token from the users array
    let refreshToken = users[payload.username].refreshToken

    //verify the refresh token
    try{
        jwt.verify(refreshToken, process.env.JWT_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }

    let newToken = jwt.sign(payload, process.env.JWT_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.JWT_SECRET
    })

    res.cookie("jwt", newToken, {secure: true, httpOnly: true})
    res.send()
}

exports.authenticateTokenApi = (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}