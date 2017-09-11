import jwt from 'jsonwebtoken';
import { User } from '../models';

require('dotenv').config();

const authenticate = {
  verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            message: 'Token is no longer Valid'
          });
        }
        req.decoded = decoded;
        User.findById(decoded.userId).then((user) => {
          req.userDetails = user;
        });
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No token provided'
      });
    }
  }
};
export default authenticate;
