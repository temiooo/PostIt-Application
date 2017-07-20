import { Group, User } from '../models';

module.exports = {
  create(req, res) {
    return Group
      .create({
        name: req.body.name,
      })
      .then((group) => {
        const user = req.decoded.userId;
        group.addUser(user);
        res.status(201).send({ message: 'Group Created Successfully', group });
      })
      .catch(error => res.status(400).send(error));
  },

  addUser(req, res) {
    const groupId = req.params.groupId;
    const userId = req.body.userId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(400).send({ message: 'Group Does Not Exist' });
      } else {
        User.findById(userId).then((user) => {
          if (!user) {
            res.status(400).send({ message: 'User Does Not Exist' });
          } else {
            group.hasUser(userId).then((result) => {
              if (result) {
                res.status(400).send({ message: 'User Already Exists In This Group' });
              } else {
                group.addUser(userId);
                res.status(201).send({ message: 'User Added Successfully' });
              }
            });
          }
        });
      }
    })
      .catch(error => res.status(400).send(error));
  },

  listUsers(req, res) {
    const groupId = req.params.groupId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(400).send({ message: 'Group Does Not Exist' });
      } else {
        group.getUsers().then((result) => {
          res.status(200).send(result);
        });
      }
    })
      .catch(error => res.status(400).send(error));
  }
};
