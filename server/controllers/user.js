import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = require('../models').User;

module.exports = {
  signup(req, res) {
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    return User
      .create({
        email: req.body.email,
        username: req.body.username,
        password,
      })
      .then((user) => {
        const token = jwt.sign({
          userId: user.id
        }, 'July@2017onyl', {
          expiresIn: '5h' // expires in 5 hours
        });

        res.status(201).send({
          success: true,
          message: 'Token Generated. Signup successful!',
          userId: user.id,
          token,
        });
      })
      .catch(error => res.status(400).send(error));
  },

  signin(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username
        }
      }).then((user) => {
        if (!user) {
          res.status(400).send({ message: 'User not found' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            userId: user.id
          }, 'July@2017onyl', {
            expiresIn: '2h' // expires in 2 hours
          });

          // Return the information including token as JSON Value
          res.status(200).send({
            success: true,
            message: 'Token Generated. Signin successful!',
            userId: user.id,
            token,
          });
        } else {
          res.status(400).send({ message: 'Password is incorrect' });
        }
      })
      .catch(error => res.send(error));
  }
};
