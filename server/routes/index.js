import authenticate from '../middlewares/authenticate';
import validateInput from '../middlewares/validateInput';

const userController = require('../controllers').user;
const groupController = require('../controllers').group;
const messageController = require('../controllers').message;

module.exports = (app) => {
  app.post('/api/user/signup', validateInput.validateUsername,
    validateInput.validateEmail, userController.signup);
  app.post('/api/user/signin', userController.signin);
  app.get('/api/user/current', authenticate.verifyUser,
    userController.getUserDetails);
  app.put('/api/user/forgotpassword', userController.forgotPassword);
  app.put('/api/user/resetpassword/:token', userController.resetPassword);
  app.get('/api/search/users', authenticate.verifyUser,
    userController.searchUser);
  app.get('/api/user/:userId/groups', authenticate.verifyUser,
    userController.listGroups);
  app.post('/api/group', authenticate.verifyUser,
    validateInput.validateGroupname, groupController.create);
  app.put('/api/group/:groupId', authenticate.verifyUser,
    validateInput.validateGroupname, groupController.edit);
  app.post('/api/group/:groupId/user', authenticate.verifyUser,
    groupController.addUser);
  app.get('/api/group/:groupId/users', authenticate.verifyUser,
    groupController.listUsers);
  app.post('/api/group/:groupId/message', authenticate.verifyUser,
    messageController.create);
  app.get('/api/group/:groupId/messages', authenticate.verifyUser,
    messageController.list);
};
