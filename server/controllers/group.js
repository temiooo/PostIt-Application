const Group = require('../models').Group;
// const UserGroup = require('../models').UserGroup;

module.exports = {
  create(req, res) {
    return Group
      .create({
        name: req.body.name,
      })
      .then(group => res.status(201).send(group))
      .catch(error => res.status(400).send(error));
  },
  /* addUser(req, res) {
    return UserGroup
      .create({
        groupId: req.params.groupId,
        userId: req.body.userId,
      })
      .then(userGroup => res.status(201).send(userGroup))
      .catch(error => res.status(400).send(error));
  } */
};
