import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticate = {
  verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
      jwt.verify(token, 'July@2017onyl', (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is no longer Valid'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided'
      });
    }
  }
};
export default authenticate;
