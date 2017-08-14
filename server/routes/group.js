import express from 'express';
import authenticate from '../middlewares/authenticate';
import validateInput from '../middlewares/validateInput';

const groupController = require('../controllers').group;
const messageController = require('../controllers').message;

const app = express.Router();

app.use(authenticate.verifyUser);
app.post('/api/group', validateInput.validateGroupname, groupController.create);
app.post('/api/group/:groupId/user', groupController.addUser);
app.get('/api/group/:groupId/users', groupController.listUsers);
app.post('/api/group/:groupId/message', messageController.create);
app.get('/api/group/:groupId/messages', messageController.list);

export default app;
