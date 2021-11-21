
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
                    let token = jwt.sign(`${doc._id}`, process.env.NODE_PRIVATE_KEY);
                    res.status(201).json({ token });
                }
            });
        } else {
            res.status(400).json({ message: "datos incompletos" });
        }
    }

    login(req, res) {
        let { email, password } = req.body;
        User.find({ email, password }, (error, docs) => {
            if (error) {
                console.log(error);
                res.status(500).send();
            } else {
                if (docs.length > 0) {
                    let token = jwt.sign(`${docs[0]._id}`, process.env.NODE_PRIVATE_KEY);
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ message: "credenciales incorrectas" });
                }
            }
        })
    }

    update(req, res) {
        let authorization = req.headers.authorization;
        let token = authorization.split(" ")[1];
        jwt.verify(token, process.env.NODE_PRIVATE_KEY, (error, decode) => {
            if (error) {
                console.log(error)
            } else {
                console.log(decode)
            }
        })
        res.status(200).json({ message: 'Datos actualizados' })
    }
}

module.exports = UserController;