import { Group, Message } from '../models';

module.exports = {
  create(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.userId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.send('Group Does Not Exist');
      } else {
        group.hasUser(userId).then((result) => {
          if (!result) {
            res.send({ Message: 'You don\'t belong to this group so you can\'t post a message here' });
          } else {
            Message.create({
              senderId: userId,
              content: req.body.content,
              priority: req.body.priority,
              groupId
            })
              .then(() => {
                res.send(' Message Posted Successfully');
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
        res.send({ Message: 'Group Does Not Exist' });
      } else {
        group.hasUser(userId).then((result) => {
          if (!result) {
            res.send({ Message: 'You don\'t belong to this group' });
          } else {
            group.getMessages().then((messages) => {
              res.send({ messages });
            });
          }
        });
      }
    })
      .catch(error => res.status(400).send(error));
  }
};
