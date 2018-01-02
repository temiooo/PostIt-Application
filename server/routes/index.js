import Authenticate from '../middlewares/Authenticate';
import ValidateInput from '../middlewares/ValidateInput';
import { user, group, message } from '../controllers';

export default (app) => {
  app.post('/api/user/signup', ValidateInput.validateSignupInput,
    user.signup);
  app.post('/api/user/signin', user.signin);
  app.put('/api/user/forgotpassword', user.forgotPassword);
  app.put('/api/user/resetpassword/:token', user.resetPassword);
  app.get('/api/search/users', Authenticate.verifyUser,
    user.searchUser);
  app.get('/api/user/:userId/groups', Authenticate.verifyUser,
    user.listGroups);
  app.post('/api/group', Authenticate.verifyUser,
    ValidateInput.validateGroupname, group.create);
  app.put('/api/group/:groupId', Authenticate.verifyUser,
    ValidateInput.validateGroupname, group.edit);
  app.get('/api/group/:groupId', Authenticate.verifyUser, group.get);
  app.post('/api/group/:groupId/user', Authenticate.verifyUser,
    group.addUser);
  app.get('/api/group/:groupId/users', Authenticate.verifyUser,
    group.listUsers);
  app.post('/api/group/:groupId/message', Authenticate.verifyUser,
    ValidateInput.validateMessageInput, message.create);
  app.get('/api/group/:groupId/messages', Authenticate.verifyUser,
    message.list);
};
