import { User, Group } from '../models';

const validateInput = {
  validateUsername(req, res, next) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: 'Username taken already. Please use another one.'
        });
      }
      next();
    });
  },

  validateEmail(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: 'Email taken already. Please use another one.'
        });
      }
      next();
    });
  },

  validateGroupname(req, res, next) {
    Group.findOne({
      where: {
        name: req.body.name
      }
    }).then((group) => {
      if (group) {
        return res.status(400).send({
          message: 'Group name exists already. Please use another one.'
        });
      }
      next();
    });
  },
};

export default validateInput;
