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
        res.status(200).send('Group Created Successfully');
      })
      .catch(error => res.status(400).send(error));
  },

  addUser(req, res) {
    const groupId = req.params.groupId;
    const userId = req.body.userId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.send('Group Does Not Exist');
      } else {
        User.findById(userId).then((user) => {
          if (!user) {
            res.send('User Does Not Exist');
          } else {
            group.hasUser(userId).then((result) => {
              if (result) {
                res.send('User Already Exists In This Group');
              } else {
                group.addUser(userId);
                res.send('User Added Successfully');
              }
            });
          }
        });
      }
    })
      .catch(error => res.status(400).send(error));
  }
};
