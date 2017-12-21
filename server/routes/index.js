import authenticate from '../middlewares/authenticate';
import validateInput from '../middlewares/validateInput';
import { user, group, message } from '../controllers';

export default (app) => {
  app.post('/api/user/signup', validateInput.validateSignupInput,
    user.signup);
  app.post('/api/user/signin', user.signin);
  app.put('/api/user/forgotpassword', user.forgotPassword);
  app.put('/api/user/resetpassword/:token', user.resetPassword);
  app.get('/api/search/users', authenticate.verifyUser,
    user.searchUser);
  app.get('/api/user/:userId/groups', authenticate.verifyUser,
    user.listGroups);
  app.post('/api/group', authenticate.verifyUser,
    validateInput.validateGroupname, group.create);
  app.put('/api/group/:groupId', authenticate.verifyUser,
    validateInput.validateGroupname, group.edit);
  app.get('/api/group/:groupId', authenticate.verifyUser, group.get);
  app.post('/api/group/:groupId/user', authenticate.verifyUser,
    group.addUser);
  app.get('/api/group/:groupId/users', authenticate.verifyUser,
    group.listUsers);
  app.post('/api/group/:groupId/message', authenticate.verifyUser,
    validateInput.validateMessageInput, message.create);
  app.get('/api/group/:groupId/messages', authenticate.verifyUser,
    message.list);
};
