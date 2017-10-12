import { expect } from 'chai';
import db from '../../models';
import {
  validUser, duplicateUsername, checkPassword,
  badEmail, duplicateEmail
} from '../helpers/seedData';

let userId;

describe('User Model', () => {
  it('should create new user', (done) => {
    db.User.create(validUser)
      .then((user) => {
        expect(user.dataValues.email).to.equal(validUser.email);
        expect(user.dataValues.username).to.equal(validUser.username);
        done();
      });
  });

  it('should raise a validation error for null input ', (done) => {
    db.User.create()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('email cannot be null');
        expect(error.errors[1].message).to.equal('username cannot be null');
        expect(error.errors[2].message).to.equal('password cannot be null');
        done();
      });
  });

  it('should raise a validation for invalid email', (done) => {
    db.User.create(badEmail)
      .catch((error) => {
        expect(error.errors[0].message)
          .to.equal('This email address is invalid');
        expect(error.errors[0].type).to.equal('Validation error');
        done();
      });
  });

  it('should raise a validation error for duplicate email', (done) => {
    db.User.create(duplicateEmail)
      .catch((error) => {
        expect(error.errors[0].message)
          .to.equal('This email already exists');
        expect(error.errors[0].type).to.equal('unique violation');
        done();
      });
  });

  it('should raise a validation error for duplicate username', (done) => {
    db.User.create(duplicateUsername)
      .catch((error) => {
        expect(error.errors[0].message)
          .to.equal('This username already exists');
        expect(error.errors[0].type).to.equal('unique violation');
        done();
      });
  });

  it('should hash password before storing in the database', (done) => {
    db.User.create(checkPassword)
      .then((user) => {
        userId = user.dataValues.id;
        expect(user.dataValues.email).to.equal(checkPassword.email);
        expect(user.dataValues.username).to.equal(checkPassword.username);
        expect(user.dataValues.password).to.not.equal(checkPassword.password);
        done();
      });
  });

  it('should store hashed password after update', (done) => {
    db.User.findById(userId)
      .then((user) => {
        user.update({ password: 'random##$$0' })
          .then((result) => {
            expect(result.dataValues.email).to.equal(checkPassword.email);
            expect(result.dataValues.username).to.equal(checkPassword.username);
            expect(result.dataValues.password).to.not.equal('random##$$0');
            done();
          });
      });
  });
});
