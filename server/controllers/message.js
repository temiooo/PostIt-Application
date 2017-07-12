import { Group, Message } from '../models';

module.exports = {
  create(req, res) {
    const groupId = req.params.groupId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.send('Group Does Not Exist');
      } else {
        Message.create({
          senderId: req.decoded.userId,
          content: req.body.content,
          priority: req.body.priority,
          groupId
        })
          .then(() => {
            res.send(' Message Posted Successfully');
          });
      }
    })
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const groupId = req.params.groupId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.send('Group Does Not Exist');
      } else {
        Message.findAll({
          where: {
            groupId
          }
        })
          .then((message) => {
            res.send(message);
          })
          .catch(error => res.status(400).send(error));
      }
    });
  }
};
