import authenticate from '../middlewares/authenticate';

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
  app.post('/api/user/signup', userController.signup);
  app.post('/api/user/signin', userController.signin);
  app.use(authenticate.verifyUser);
  app.post('/api/group', groupController.create);
  app.post('/api/group/:groupId/user', groupController.addUser);
  app.post('/api/group/:groupId/message', messageController.create);
  app.get('/api/group/:groupId/messages', messageController.list);

  app.get('*', (req, res) => res.status(404).send({
    message: 'The page you are looking for does not exist',
  }));

  app.post('*', (req, res) => res.status(404).send({
    message: 'The page you are looking for does not exist',
  }));
};
