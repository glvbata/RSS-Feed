var express = require("express");
var router = express.Router();
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
            user.email = request.body.email;
            user.password = request.body.password;

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
    response.send(request.body);
});

router.route("/user/register").post(function (request, response) {
    var user = new User();
    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;
    user.email = request.body.email;
    user.username = request.body.username;
    user.password = request.body.password;

    response.send(user);
});

module.exports = router;