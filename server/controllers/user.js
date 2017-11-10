import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { User, Group } from '../models';
import {
  transporter, mailOptions, forgotPasswordMail,
  resetPasswordMail
} from '../utils/nodemailer';

require('dotenv').config();

const userController = {
  signup(req, res) {
    return User
      .create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      })
      .then((user) => {
        const token = jwt.sign({
          user: { id: user.id, name: user.username, email: user.email }
        }, process.env.SECRET, {
          expiresIn: '24h'
        });

        res.status(201).send({
          message: 'Signup Successful!',
          user: { id: user.id, name: user.username, email: user.email },
          token
        });
      })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  },

  signin(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(401).send({
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
          return res.status(401).send({ message: 'User not found' });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            user: { id: user.id, name: user.username, email: user.email }
          }, process.env.SECRET, {
            expiresIn: '24h'
          });

          return res.status(200).send({
            message: 'Signin successful!',
            user: { id: user.id, name: user.username, email: user.email },
            token
          });
        }
        return res.status(401).send({ message: 'Password is incorrect' });
      })
      .catch(error => res.status(500).send({
        message: 'Internal Server Error',
        error
      }));
  },

  forgotPassword(req, res) {
    const passwordToken = randomstring.generate(50);
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!user) {
        res.status(404).send({ message: 'This email does not exist' });
      } else {
        return user
          .update({
            resetPasswordToken: passwordToken,
            resetPasswordExpires: Date.now() + 3600000
          })
          .then(() => {
            const to = user.email;
            const bcc = null;
            const subject = 'PostIT Password Reset';
            transporter.sendMail(mailOptions(to, bcc, subject,
              forgotPasswordMail(req.headers.host, passwordToken)))
              .then(() => {
                res.status(200).send({
                  message: 'An email has been sent to ' + user.email +
                    ' with further instructions.'
                });
              })
              .catch(() => {
                res.status(500).send({
                  message: 'An error occured. Please try again.'
                });
              });
          })
          .catch(() => res.status(500).send({
            message: 'Internal Server Error'
          }));
      }
    })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  },

  resetPassword(req, res) {
    const passwordToken = req.params.token;
    if (!req.body.password) {
      res.status(400).send({
        message: 'Please provide a new password for your account'
      });
    } else {
      User.findOne({
        where: {
          resetPasswordToken: passwordToken,
          resetPasswordExpires: { $gt: Date.now() }
        }
      }).then((user) => {
        if (!user) {
          res.status(400).send({
            message: 'Password Reset Token is Invalid or has Expired'
          });
        } else {
          return user
            .update({
              password: req.body.password,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            })
            .then(() => {
              const to = user.email;
              const subject = 'Password Changed Successfully';
              transporter.sendMail(mailOptions(to, null, subject,
                resetPasswordMail(user.username, req.headers.host)))
                .then(() => {
                  res.status(200).send({
                    message: 'Password Reset Successful'
                  });
                })
                .catch(() => {
                  res.status(500).send({
                    message: 'An error occured. Please try again.'
                  });
                });
            })
            .catch(() => res.status(500).send({
              message: 'Internal Server Error'
            }));
        }
      })
        .catch(() => res.status(500).send({
          message: 'Internal Server Error'
        }));
    }
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
          const members = users.map(user => user.id);
          User.findAndCountAll({
            where: {
              username: {
                $ilike: `%${req.query.searchTerm}%`
              },
              $not: [{
                id: members
              }]
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
                page: Math.floor(offset / limit) + 1,
                pageCount: Math.ceil(result.count / limit),
                pageSize: result.rows.length,
                totalCount: result.count
              };
              res.status(200).send({
                users: result.rows,
                pagination
              });
            }
          })
            .catch(() => res.status(500).send({
              message: 'Internal Server Error'
            }));
        })
          .catch(() => res.status(500).send({
            message: 'Internal Server Error'
          }));
      }
    });
  },

  listGroups(req, res) {
    const userId = req.params.userId;
    User.findOne({
      where: { id: userId },
      attributes: [],
      include: [{
        model: Group,
        through: { attributes: [] }
      }]
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            message: 'User Does Not Exist'
          });
        } else {
          if (user.Groups.length === 0) {
            return res.status(404).send({
              message: 'You don\'t belong to any group.'
            });
          }
          res.status(200).send(user.Groups);
        }
      })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }
};

export default userController;
