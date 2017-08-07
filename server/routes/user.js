import express from 'express';
import authenticate from '../middlewares/authenticate';
import validateInput from '../middlewares/validateInput';

const userController = require('../controllers').user;

const app = express.Router();

app.post('/api/user/signup', validateInput.validateUsername, validateInput.validateEmail, userController.signup);
app.post('/api/user/signin', userController.signin);
app.use(authenticate.verifyUser);
app.get('/api/user/:userId/groups', userController.listGroups);

export default app;
