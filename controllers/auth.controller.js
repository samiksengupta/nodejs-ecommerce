const { handleServerErrorResponse, handleNotFoundResponse, generateAccessToken, generateRefreshToken } = require("../helpers");
const { User } = require("../models");

const register = (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const login = (req, res) => {
    User.authenticate(req.body.username, req.body.password).then((user) => {
        if(user) {
            user.refreshToken = generateRefreshToken();
            user.save();
            res.status(200).json({
                accessToken: generateAccessToken(user),
                refreshToken: user.refreshToken
            });
        }
        else throw "Authentication failed";
    }).catch((err) => {    
        res.status(400).json({
            message: err
        });
    });
}

const logout = (req, res) => {
    res.status(200).json({
        message: 'Logout successful'
    });
}

const refresh = (req, res) => {
    res.status(200).json({
        message: 'Refresh successful'
    });
}

module.exports = {
    register: register,
    login: login,
    logout: logout,
    refresh: refresh,
}