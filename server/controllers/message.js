import { Group, Message, User } from '../models';
import {
  transporter, mailOptions,
  msgPriorityMail
} from '../utils/nodemailer';

const messageController = {
  /**
   * Posts a new message to a group
   * ROUTE: POST: /api/group/:groupId/message
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} contains details of the newly posted message
   */
  create(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.user.id;
    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(404).send({ message: 'Group Does Not Exist' });
      } else {
        group.hasUser(userId).then((result) => {
          if (!result) {
            res.status(403).send({
              message: 'You don\'t belong to this group.'
            });
          } else {
            const priority = req.body.priority;
            Message.create({
              senderId: userId,
              content: req.body.content,
              priority,
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
                    const memberEmails =
                      groupMembers.map(user => user.email);
                    const to = null;
                    const bcc = memberEmails;
                    const subject =
                      `${msg.priority} message from Group: ${group.name}`;
                    const username = req.userDetails.username;
                    if (bcc.length > 0) {
                      transporter.sendMail(mailOptions(to, bcc, subject,
                        msgPriorityMail(
                          username, group.name, req.headers.host)
                      )).then(() => {
                        res.status(201).send({ message });
                      }).catch(() => {
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
              .catch(() => res.status(500).send({
                message: 'Internal Server Error'
              }));
          }
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
   * Retrieves messages from a specified group
   * ROUTE: GET: /api/group/:groupId/messages
   * @param {object} req - request object
   * @param {object} res -r esponse object
   * @returns {array} contains messages retrieved from a group
   */
  list(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.user.id;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(404).send({ message: 'Group Does Not Exist.' });
      } else {
        group.hasUser(userId).then((result) => {
          if (!result) {
            res.status(403).send({
              message: 'You don\'t belong to this group.'
            });
          } else {
            group.getMessages({
              include: {
                model: User,
                attributes: ['username']
              }
            }).then((messages) => {
              res.status(200).send(messages);
            })
              .catch(() => res.status(500).send({
                message: 'Internal Server Error'
              }));
          }
        });
      }
    })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }
};

export default messageController;
