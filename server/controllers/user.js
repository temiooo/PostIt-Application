import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Group } from '../models';

require('dotenv').config();

module.exports = {
  signup(req, res) {
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res.status(400).send({
        message: 'Email, Username and Password must be provided'
      });
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
          expiresIn: '24h' // expires in 24 hours
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
      return res.status(400).send({
        message: 'Please provide a username and password'
      });
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
            expiresIn: '24h' // expires in 24 hours
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

  edit(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!user) {
        res.status(404).send({ message: 'This email does not exist' });
      } else {
        return user
          .update({ password: req.body.password })
          .then(() => res.status(200).send({
            message: 'Password change successful'
          }))
          .catch(error => res.status(400).send({ error }));
      }
    })
      .catch(error => res.status(400).send({ error }));
  },

  searchUser(req, res) {
    const limit = req.query.limit || null;
    const offset = req.query.offset || null;
    const groupId = req.query.group;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(400).send({ message: 'Group Not Specified' });
      } else {
        group.getUsers().then((users) => {
          const getId = (userArray) => {
            const arr = [];
            const n = users.length;
            for (let i = 0; i < n; i++) {
              arr.push(userArray[i].id);
            }
            return arr;
          };
          const members = getId(users);
          User.findAndCountAll({
            where: {
              username: {
                $ilike: `%${req.query.q}%`
              },
              $not: [{
                id: members }]
            },
            attributes: {
              exclude: ['password']
            },
            offset,
            limit,
            order: [['id', 'DESC']]
          }).then((result) => {
            if (result.count === 0) {
              res.status(404).send({ message: 'No users found' });
            } else {
              const pagination = {
                pageCount: Math.ceil(result.count / limit),
                pageNumber: Math.floor(offset / limit) + 1,
              };
              res.status(200).send({
                users: result.rows,
                pagination
              });
            }
          })
            .catch(error => res.status(400).send(error));
        })
          .catch(error => res.status(400).send(error));
      }
    });
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
