import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { User, Group } from '../models';
import { transporter, mailOptions } from '../utils/nodemailer';

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
            const html = `<div>
            <p>You are receiving this because you have
            requested the reset of the password for your account.
              <br>
            Please click on the link below or paste it into your
            browser to complete the processs.
              <br>
            Please note that the link is valid for 1 hour only.
              <br>
            http://${req.headers.host}/#/resetpassword/${passwordToken}
              <br>
            If you did not request this, please ignore this
            email and your password will remain unchanged.
            </p>
            </div>`;
            transporter.sendMail(mailOptions(to, bcc, subject, html),
              (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(400).send({
                    message: 'A network error occured. Please try again'
                  });
                } else {
                  res.status(200).send({
                    message: `An email has been sent to ${user.email} with further instructions`
                  });
                  console.log('Message sent', info);
                }
              });
          })
          .catch(error => res.status(400).send({ error }));
      }
    })
      .catch(error => res.status(400).send({ error }));
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
          res.status(404).send({
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
              const html = `<div>
                <p>Hello ${user.username},
                  <br>
                Your password has been successfully changed.
                  <br>
                Click <a href='http://${req.headers.host}/#/login'>here</a> 
                to login
                </p>
                </div>`;
              transporter.sendMail(mailOptions(to, null, subject, html),
                (error, info) => {
                  if (error) {
                    console.log(error);
                    res.status(400).send({
                      message: 'A network error occured. Please try again.'
                    });
                  } else {
                    res.status(200).send({
                      message: 'Password Reset Successful'
                    });
                    console.log('Message sent', info);
                  }
                });
            })
            .catch(error => res.status(400).send({ error }));
        }
      })
        .catch(error => res.status(400).send({ error }));
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
