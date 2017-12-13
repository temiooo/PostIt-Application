import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import randomstring from 'randomstring';
import { User, Group } from '../models';
import {
  transporter,
  mailOptions,
  forgotPasswordMail,
  resetPasswordMail
} from '../utils/nodemailer';

require('dotenv').config();

const userController = {
  /**
   * Creates a new user
   * ROUTE: POST: /api/user/signup
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} contains auth token and details of the newly created user
   */
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

  /**
   * Authenticates and logs in a user
   * ROUTE: POST: /api/user/signin
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} contains auth token and details of the user
   */
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
          return res.status(401).send({
            message: 'Invalid username or password'
          });
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
        return res.status(401).send({
          message: 'Invalid username or password'
        });
      })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  },

  /**
   * Generates a reset password token for users
   * that have forgotten their password
   * ROUTE: PUT: /api/user/forgotpassword
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} message object stating if user has been sent an email
   */
  forgotPassword(req, res) {
    if (!req.body.email || !validator.isEmail(req.body.email)) {
      return res.status(400).send({
        message: 'Please provide a valid email'
      });
    }

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
                  message: `An email has been sent to ${user.email
                  } with further instructions.`
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

  /**
   * Resets a user's password
   * ROUTE: PUT: /api/user/resetpassword/:token
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} message object stating if password reset was successful
   */
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

  /**
   * Searches for users that match the specified search query
   * ROUTE: GET: /api/search/users
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {object} contains search results
   */
  searchUser(req, res) {
    let limit;
    let offset;
    const groupId = req.query.group;

    if (req.query.limit && Number.isInteger(Number(req.query.limit))) {
      limit = req.query.limit;
    }

    if (req.query.offset && Number.isInteger(Number(req.query.offset))) {
      offset = req.query.offset;
    }

    if (!groupId || !(Number.isInteger(Number(groupId)))) {
      return res.status(400).send({
        message: 'Please provide a valid group ID'
      });
    }

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(404).send({ message: 'Group Does Not Exist' });
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

  /**
   * Retrieves a list of group  a user belongs to
   * ROUTE: GET: /api/user/:userId/groups
   *
   * @param {object} req - request object
   * @param {object} res - response object
   *
   * @returns {array} lsit of groups specified user belongs to
   */
  listGroups(req, res) {
    const userId = req.params.userId;

    if (!Number.isInteger(Number(userId))) {
      return res.status(400).send({
        message: 'Please provide a valid user ID'
      });
    }

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
