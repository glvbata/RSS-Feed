var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    salt: String,
    hash: String
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

//This module exposes a sign method that we can use to create a JWT, simply passing it the data we want to include in the token, plus a secret that the hashing algorithm will use. The data should be sent as a JavaScript object, and include an expiry date in an exp property.

//Note: It is important that your secret is kept safe – only the originating server should know what it is. It is best practice to set the secret as an environment variable, and not have it in the source code, especially if your code is stored in version control somewhere.
userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model("user", userSchema);