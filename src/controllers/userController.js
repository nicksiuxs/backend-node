
const User = require('../models/user');

class UserController {

    register(req, res) {
        let newUser = req.body;
        User.create(newUser, (error, data) => {
            if (error) {
                res.status(500).json({ message: "Error inserción" });
            } else {
                res.status(201).json(data);
            }
        });
    }
}

module.exports = UserController;