import jwt from 'jsonwebtoken';

require('dotenv').config();

const authenticate = {
  /**
   * authenticates a user
   *
   * @param {Object} req - request object
   * @param {Object} res -response object
   * @param {function} next - calls the next function
   *
   * @return {(function|object)} calls next function or returns response object
   */
  verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Token is no longer valid so we can\'t authenticate you.'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).send({
        message: 'No token provided so we can\'t authenticate you.'
      });
    }
  }
};
export default authenticate;
