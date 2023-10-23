const db = require('../models');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {sendSuccessResponse, sendUnauthorizedResponse, sendCatchResponse, sendValidationResponse, sendMessage} = require("../helper/responseHelper");
const accessTokenSecret = process.env.SECRET_TOKEN || 'youraccesstokensecret';
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email').not().isEmpty(),
                body('password').not().isEmpty()
            ]
        }
        case 'registration': {
            return [
                body('name').not().isEmpty(),
                body('email').not().isEmpty(),
                body('password').not().isEmpty()
            ]
        }
    }
}

exports.login = async (req, res) => {

    try {
        const errors = validationResult(req);
        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            return sendValidationResponse(res, errors);
        }

        let user = await db.Admin.findOne({
            raw: true,
            where: {
                email: email,
                status: 1
            }
        });

        if (user && (await bcrypt.compare(password, user.password))) {

            // Generate an access token
            user.token = jwt.sign({
                id: user.id,
                email: user.email,
                role: 'admin',
                createdAt: user.createdAt
            }, accessTokenSecret, {expiresIn: "2h"});

            delete user.password;

            return sendSuccessResponse(res,"Login successfully", user)
        } else {
            return sendUnauthorizedResponse(res,{})
        }
    } catch (err) {
        console.log(err);
        return sendCatchResponse(res, err)
    }
}


exports.register = async (req, res) => {

    try {
        const errors = validationResult(req);
        const { name, email, password } = req.body;

        if (!errors.isEmpty()) {
            return sendValidationResponse(res, errors);
        }

        const oldUser = await db.Admin.findOne({
            where: {
                email: email
            }
        });

        if (oldUser) {
            return sendMessage(res, "User Already Exist. Please Login");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await db.Admin.create({
            name,
            email: email.toLowerCase(),
            status: 1,
            password: hashedPassword
        });

        const userData = user.get({ plain: true });

        // Create token
        // save user token
        userData.token = jwt.sign(
          {
              id: user.id,
              email: user.email,
              role: 'admin',
              createdAt: user.createdAt
          },
          accessTokenSecret,
          {
              expiresIn: "2h",
          }
        );

        delete userData.password;

        return sendSuccessResponse(res,"Registered successfully", user)
    } catch (err) {
        return sendCatchResponse(res, err)
    }
}