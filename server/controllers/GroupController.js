import { Group, User } from '../models';

const GroupController = {
  /**
   * Creates a new group
   * ROUTE: POST: /api/group
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @returns {Object} contains details of the newly created group
   */
  create(req, res) {
    const groupName = req.body.name;
    if (!groupName || groupName.trim().length === 0) {
      res.status(400).send({ message: 'Group name is required' });
    } else {
      return Group
        .create({
          name: groupName,
        })
        .then((group) => {
          const user = req.decoded.user.id;
          group.addUser(user).then(() => {
            res.status(201).send({
              message: 'Group Created Successfully',
              group
            });
          })
            .catch(() => res.status(500).send({
              message: 'Internal Server Error'
            }));
        })
        .catch(() => res.status(500).send({
          message: 'Internal Server Error'
        }));
    }
  },

  /**
   * Edit details of an already existing group
   * ROUTE: PUT: /api/group/:groupId
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @returns {Object} contains details of the edited group
   */
  edit(req, res) {
    const groupId = req.params.groupId;
    const userId = req.decoded.user.id;
    const groupName = req.body.name;

    if (!Number.isInteger(Number(groupId))) {
      return res.status(400).send({
        message: 'Please provide a valid group ID'
      });
    }

    if (!groupName || groupName.trim().length === 0) {
      res.status(400).send({ message: 'Group name not provided' });
    } else {
      Group.findById(groupId).then((group) => {
        if (!group) {
          res.status(404).send({ message: 'Group Does Not Exist' });
        } else {
          group.hasUser(userId).then((result) => {
            if (!result) {
              res.status(403).send({
                message: 'You don\'t belong to this group'
              });
            } else {
              return group
                .update({
                  name: req.body.name
                })
                .then(() => res.status(200).send({
                  group,
                  message: 'Group updated successfully'
                }))
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
    }
  },

  /**
   * Gets details of a particular group
   * ROUTE: GET: /api/group/:groupId
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @returns {Object} contains details of the group requested for
   */
  get(req, res) {
    const groupId = req.params.groupId;

    if (!Number.isInteger(Number(groupId))) {
      return res.status(400).send({
        message: 'Please provide a valid group ID'
      });
    }

    Group.findOne({
      where: { id: groupId }
    })
      .then((group) => {
        if (!group) {
          res.status(404).send({ message: 'Group Does Not Exist' });
        } else {
          res.status(200).send(group);
        }
      })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  },

  /**
   * Adds a user as a member of a group
   * ROUTE: POST: /api/group/:groupId/user
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @returns {Object} contains message specifiying success or failure of action
   */
  addUser(req, res) {
    const groupId = req.params.groupId;
    const userId = req.body.userId;

    if (!Number.isInteger(Number(groupId))) {
      return res.status(400).send({
        message: 'Please provide a valid group ID'
      });
    }

    if (!Number.isInteger(Number(userId))) {
      return res.status(400).send({
        message: 'Please provide a valid user ID'
      });
    }

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
                res.status(201).send({
                  message: 'User Added Successfully'
                });
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
   * List users belonging to a particular group
   * ROUTE: GET: /api/group/:groupId/users
   *
   * @param {Object} req - request object
   * @param {Object} res - response object
   *
   * @returns {array} contains users who are members of the specified group
   */
  listUsers(req, res) {
    const groupId = req.params.groupId;

    if (!Number.isInteger(Number(groupId))) {
      return res.status(400).send({
        message: 'Please provide a valid group ID'
      });
    }

    Group.findOne({
      where: { id: groupId },
      attributes: [],
      include: [{
        model: User,
        attributes: { exclude: ['password'] },
        through: { attributes: [] },
      }]
    }).then((group) => {
      if (!group) {
        res.status(404).send({ message: 'Group Does Not Exist' });
      } else {
        res.status(200).send(group.Users);
      }
    })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }
};

export default GroupController;
