import { Group, Message, User } from '../models';

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
            res.status(400).send({ message: 'You don\'t belong to this group so you can\'t post a message here' });
          } else {
            Message.create({
              senderId: userId,
              content: req.body.content,
              priority: req.body.priority,
              groupId
            })
              .then((message) => {
                res.status(201).send({ message });
              });
          }
        });
      }
    })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.userId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(400).send({ Message: 'Group Does Not Exist' });
      } else {
        group.hasUser(userId).then((result) => {
          if (!result) {
            res.status(400).send({ Message: 'You don\'t belong to this group' });
          } else {
            group.getMessages({
              include: {
                model: User,
                attributes: ['username']
              }
            }).then((messages) => {
              res.status(200).send({ messages });
            });
          }
        });
      }
    })
      .catch(error => res.status(400).send(error));
  }
};
