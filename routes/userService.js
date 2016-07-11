var express = require("express");
var router = express.Router();
var passport = require('passport');
var User = require("../models/user.js");

router.route("/user").get(function (request, response) {
    User.find(function (error, users) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json(users);
        }
    });
});

router.route("/user/:id").get(function (request, response) {
    User.findById(request.params.id, function (error, user) {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).json(user);
        }
    });
});

router.route("/user/:id").put(function (request, response) {
    User.findById(request.params.id, function (error, user) {
        if (error) {

        } else {
            user.firstName = request.body.firstName;
            user.lastName = request.body.lastName;
            user.username = request.body.username;

            user.save(function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(200).send("Successfully updated user information.");
                }
            });
        }
    });
});

router.route("/user/login").post(function (request, response) {
    passport.authenticate("local", function (error, user, info) {
        var token;

        // If Passport throws/catches an error
        if (error) {
            response.status(404).json(error);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            response.status(200);
            response.json({
                "token": token
            });
        } else {
            // If user is not found
            response.status(401).json(info);
        }
    })(request, response);
});

router.route("/user/register").post(function (request, response) {
    var user = new User();
    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    user.username = request.body.username;

    user.setPassword(request.body.password);
    user.save(function (err) {
        var token;
        token = user.generateJwt();
        response.status(200);
        response.json({
            "token": token
        });
    });
});

module.exports = router;