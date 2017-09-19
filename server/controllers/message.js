import { Group, Message, User } from '../models';
import { transporter, mailOptions } from '../utils/nodemailer';

module.exports = {
  create(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.userId;
    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(400).send({ message: 'Group Does Not Exist' });
      } else {
        group.hasUser(userId).then((result) => {
          if (!result) {
            res.status(400).send({
              message: 'You don\'t belong to this group.'
            });
          } else {
            const priority = req.body.priority;
            if (priority !== 'Urgent' && priority !== 'Critical' &&
              priority !== 'Normal') {
              res.status(400).send({
                message:
                'Message priority has to be Normal, Critical, or Urgent'
              });
            } else {
              Message.create({
                senderId: userId,
                content: req.body.content,
                priority: req.body.priority,
                groupId
              })
                .then((msg) => {
                  const message = {
                    ...msg.dataValues,
                    User: { username: req.userDetails.username }
                  };
                  if (priority === 'Urgent' || priority === 'Critical') {
                    group.getUsers().then((users) => {
                      const groupMembers =
                        users.filter(user => user.id !== userId);
                      const memberEmails = groupMembers.map(user => user.email);
                      const to = null;
                      const bcc = memberEmails;
                      const subject =
                        `${msg.priority} message from Group: ${group.name}`;
                      const html = `<div>
                  <p>Hi there,
                    <br>
                  <strong>${req.userDetails.username}</strong> 
                  just posted a new message on Group: ${group.name}
                    <br>
                  Login <a href='http://${req.headers.host}/#/login'>here</a>
                  to view your messages.
                  </p>
                  </div>`;
                      if (bcc.length > 0) {
                        transporter.sendMail(mailOptions(to, bcc, subject, html
                        )).then((info) => {
                          res.status(201).send({ message });
                        }).catch((err) => {
                          res.status(400).send({
                            message:
                            'A network error occured. Please try again.'
                          });
                        });
                      } else {
                        res.status(201).send({ message });
                      }
                    });
                  } else {
                    res.status(201).send({ message });
                  }
                })
                .catch(error => res.status(400).send(error));
            }
          }
        })
          .catch(error => res.status(400).send(error));
      }
    })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.userId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(400).send({ message: 'Group Does Not Exist.' });
      } else {
        group.hasUser(userId).then((result) => {
          if (!result) {
            res.status(400).send({
              message: 'You don\'t belong to this group.'
            });
          } else {
            group.getMessages({
              include: {
                model: User,
                attributes: ['username']
              }
            }).then((messages) => {
              res.status(200).send({ messages, group });
            });
          }
        });
      }
    })
      .catch(error => res.status(400).send(error));
  }
};
