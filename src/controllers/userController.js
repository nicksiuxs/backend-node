
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserController {

    register(req, res) {
        let newUser = req.body;
        let { name, lastname, email, password } = newUser;
        if (name && lastname && email && password) {
            User.create(newUser, (error, doc) => {
                if (error) {
                    res.status(500).json({ message: "Error inserción" });
                } else {
                    let token = jwt.sign(""+doc._id, process.env.NODE_PRIVATE_KEY);
                    res.status(201).json({ token });
                }
            });
        } else {
            res.status(400).json({ message: "datos incompletos" });
        }

    }
}

module.exports = UserController;