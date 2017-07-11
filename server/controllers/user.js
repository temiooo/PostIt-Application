const User = require('../models').User;
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

module.exports = {
  signup(req, res) {
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    return User
      .create({
        email: req.body.email,
        username: req.body.username,
        password
      })
      .then((user) => {
        const token = jwt.sign({
          userId: user.id
        }, 'Abracadabra', {
          expiresIn: '2h' // expires in 2 hours
        });

          // Return the information including token as JSON Value
        res.json({
          success: true,
          message: 'Token Generated. Signup successful!',
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
          res.status(404).send({ msg: 'User not found' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            userId: user.id
          }, 'Abracadabra', {
            expiresIn: '2h' // expires in 2 hours
          });

          // Return the information including token as JSON Value
          res.json({
            success: true,
            message: 'Token Generated. Signin successful!',
            token,
          });
        } else {
          res.status(404).send({ msg: 'Password is incorrect' });
        }
      });
  }
};
