import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = require('../models').User;

require('dotenv').config();

module.exports = {
  signup(req, res) {
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Email, Username and Password must be provided' });
    }
    return User
      .create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      })
      .then((user) => {
        const token = jwt.sign({
          userId: user.id
        }, process.env.SECRET, {
          expiresIn: '5h' // expires in 5 hours
        });

        res.status(201).send({
          message: 'Signup Successful!',
          userId: user.id,
          token,
        });
      })
      .catch(error => res.status(400).send(error));
  },

  signin(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: 'Please provide a username and password' });
    }
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      }).then((user) => {
        if (!user) {
          return res.status(400).send({ message: 'User not found' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            userId: user.id
          }, process.env.SECRET, {
            expiresIn: '2h' // expires in 2 hours
          });

          // Return the information including token as JSON Value
          return res.status(200).send({
            message: 'Signin successful!',
            userId: user.id,
            token,
          });
        }
        return res.status(400).send({ message: 'Password is incorrect' });
      })
      .catch(error => res.send(error));
  },

  listGroups(req, res) {
    const userId = req.params.userId;

    User.findById(userId).then((user) => {
      if (!user) {
        res.status(400).send({ message: 'User Does Not Exist' });
      } else {
        user.getGroups().then((result) => {
          res.status(200).send(result);
        });
      }
    })
      .catch(error => res.status(400).send(error));
  }
};
