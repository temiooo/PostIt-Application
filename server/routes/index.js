import authenticate from '../middlewares/authenticate';
import validateInput from '../middlewares/validateInput';

const userController = require('../controllers').user;
const groupController = require('../controllers').group;
const messageController = require('../controllers').message;

module.exports = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Post-It Application',
  }));

  app.post('/', (req, res) => res.status(200).send({
    message: 'Welcome to Post-It Application',
  }));
  app.post('/api/user/signup', validateInput.validateUsername, validateInput.validateEmail, userController.signup);
  app.post('/api/user/signin', userController.signin);
  app.use(authenticate.verifyUser);
  app.get('/api/user/:userId/groups', userController.listGroups);
  app.post('/api/group', validateInput.validateGroupname, groupController.create);
  app.post('/api/group/:groupId/user', groupController.addUser);
  app.get('/api/group/:groupId/users', groupController.listUsers);
  app.post('/api/group/:groupId/message', messageController.create);
  app.get('/api/group/:groupId/messages', messageController.list);

  app.get('*', (req, res) => res.status(404).send({
    message: 'The page you are looking for does not exist',
  }));

  app.post('*', (req, res) => res.status(404).send({
    message: 'The page you are looking for does not exist',
  }));
};
