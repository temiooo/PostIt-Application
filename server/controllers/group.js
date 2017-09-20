import { Group, User } from '../models';

module.exports = {
  create(req, res) {
    if (!req.body.name) {
      res.status(400).send({ message: 'Group name not provided' });
    } else {
      return Group
        .create({
          name: req.body.name,
        })
        .then((group) => {
          const user = req.decoded.userId;
          group.addUser(user).then((userInfo) => {
            res.status(201).send({
              message: 'Group Created Successfully',
              group,
              userAddedToGroup: Boolean(userInfo),
            });
          });
        })
        .catch(() => res.status(500).send({
          message: 'Internal Server Error'
        }));
    }
  },

  edit(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.userId;

    if (!req.body.name) {
      res.status(400).send({ message: 'Group name not provided' });
    } else {
      Group.findById(groupId).then((group) => {
        if (!group) {
          res.status(404).send({ message: 'Group Does Not Exist' });
        } else {
          group.hasUser(userId).then((result) => {
            if (!result) {
              res.status(401).send({
                message: 'You don\'t belong to this group'
              });
            } else {
              return group
                .update({
                  name: req.body.name
                })
                .then(() => res.status(200).send({
                  group,
                  message: 'Group updated sucessfully'
                }))
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
  },

  addUser(req, res) {
    const groupId = req.params.groupId;
    const userId = req.body.userId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(404).send({ message: 'Group Does Not Exist' });
      } else {
        User.findById(userId).then((user) => {
          if (!user) {
            res.status(404).send({ message: 'User Does Not Exist' });
          } else {
            group.hasUser(userId).then((result) => {
              if (result) {
                res.status(409).send({
                  message: 'User Already Exists In This Group'
                });
              } else {
                group.addUser(userId);
                res.status(201).send({ message: 'User Added Successfully' });
              }
            });
          }
        });
      }
    })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  },

  listUsers(req, res) {
    const groupId = req.params.groupId;

    Group.findById(groupId).then((group) => {
      if (!group) {
        res.status(404).send({ message: 'Group Does Not Exist' });
      } else {
        group.getUsers({
          attributes: {
            exclude: ['password']
          },
        }).then((result) => {
          res.status(200).send(result);
        });
      }
    })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }
};
