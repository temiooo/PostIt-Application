import supertest from 'supertest';
import db from '../server/models';

const expect = require('chai').expect;
const should = require('chai').should;
const server = require('../server.js');

const api = supertest('http://localhost:3000');

describe('To do before running test', () => {
  before((done) => {
    server.listen(3000);
    db.sequelize.sync({ truncate: true }).then(() => {
      console.log('Database reset succesful');
      done();
    });
  });

  let token, token2, firstuserId;
  describe('SIGNUP API', () => {
    it('should create a new user and return a token', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          email: 'user1@gmail.com',
          password: 'useruser',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.all.deep.keys('message', 'userId', 'token');
        });
      done();
    });

    it('should require username, password and email before signup.', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: '',
          email: '',
          password: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Email, Username and Password must be provided');
          done();
        });
    });

    it('should not create user with the same username.', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          email: 'user2@gmail.com',
          password: 'useruser',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Username taken already. Please use another one.');
          done();
        });
    });

    it('should not create user with the same email address.', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user2',
          email: 'user1@gmail.com',
          password: 'useruser',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Email taken already. Please use another one.');
          done();
        });
    });

    it('should not create user with an invalid email address.', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user2',
          email: 'user2.com',
          password: 'useruser',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Invalid email address');
          done();
        });
    });

  });

  describe('SIGNIN API', () => {
    it('should allow existing user to sign in and return a token', (done) => {
      api.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          password: 'useruser',
        })
        .expect(200)
        .end((err, res) => {
          token = res.body.token;
          expect(res.body).to.have.all.deep.keys('message', 'userId', 'token');
          done();
        });
    });

    it('should require username and password before signin', (done) => {
      api.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: '',
          password: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Please provide a username and password');
          done();
        });
    });

    it('should not signin if username does not exist', (done) => {
      api.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'user567',
          password: 'useruser',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should not signin if password is incorrect', (done) => {
      api.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          password: 'mypassword',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Password is incorrect');
          done();
        });
    });
  });

  describe('CREATE GROUPS API', () => {
    it('should allow registered user create a new group', (done) => {
      api.post('/api/group')
        .set('authorization', token)
        .send({
          name: 'Awesome Rockstars',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.all.deep.keys('message', 'group');
          done();
        });
    });

    it('should not allow unregistered user to create new group', (done) => {
      api.post('/api/group')
        .set('Accept', 'application/json')
        .send({
          name: 'Awesome Rockstars',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });

    it('should not create group with the same name', (done) => {
      api.post('/api/group')
        .set('authorization', token)
        .send({
          name: 'Awesome Rockstars',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('This name has been taken already.');
          done();
        });
    });
  });

  describe('ADD USERS TO GROUPS API', () => {
    it('should allow registered user add registered user to group', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user2',
          email: 'user2@gmail.com',
          password: 'useruser2',
        })
        .expect(201)
        .end((err, res) => {
          firstuserId = res.body.userId;
          api.post('/api/group/1/user')
            .set('authorization', token)
            .send({
              userId: firstuserId,
            })
            .expect(201)
            .end((err, res) => {
              expect(res.body.message).to.equal('User Added Successfully');
              done();
            });
        });
    });

    it('should not allow unregistered users add registered user to group', (done) => {
      api.post('/api/group/1/user')
        .set('Accept', 'application/json')
        .send({
          userId: firstuserId,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });

    it('should not allow adding user to unexisting group', (done) => {
      api.post('/api/group/2/user')
        .set('authorization', token)
        .send({
          userId: firstuserId,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });

    it('should not allow adding unregistered user to a group', (done) => {
      api.post('/api/group/1/user')
        .set('authorization', token)
        .send({
          userId: 54,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('User Does Not Exist');
          done();
        });
    });

    it('should not allow user to be added to a group twice', (done) => {
      api.post('/api/group/1/user')
        .set('authorization', token)
        .send({
          userId: firstuserId
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('User Already Exists In This Group');
          done();
        });
    });
  });

  describe('POST MESSAGE TO GROUP API', () => {
    it('should allow user belonging to group to post message said group', (done) => {
      api.post('/api/group/1/message')
        .set('authorization', token)
        .send({
          content: 'My first message',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('Message Posted Successfully');
          done();
        });
    });

    it('should not allow user not in a group to post message to said group', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user3',
          email: 'user3@gmail.com',
          password: 'useruser3',
        })
        .expect(201)
        .end((err, res) => {
          token2 = res.body.token;
          api.post('/api/group/1/message')
            .set('authorization', token2)
            .send({
              content: 'Message from user not in this group',
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.message).to.equal('You don\'t belong to this group so you can\'t post a message here');
              done();
            });
        });
    });

    it('should not allow user post message in group that does not exist', (done) => {
      api.post('/api/group/2/message')
        .set('authorization', token)
        .send({
          content: 'Another message again',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });

    it('should allow user add specified priority to message being posted', (done) => {
      api.post('/api/group/1/message')
        .set('authorization', token)
        .send({
          content: 'My second message',
          priority: 'Critical'
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('Message Posted Successfully');
          done();
        });
    });

    it('should not allow unspecified priority be added to posted message', (done) => {
      api.post('/api/group/1/message')
        .set('authorization', token)
        .send({
          content: 'My third message',
          priority: 'Insignificant'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('should not allow message content be empty', (done) => {
      api.post('/api/group/1/message')
        .set('authorization', token)
        .send({
          content: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('GET MESSAGES FROM GROUP API', () => {
    it('should allow user in group to get messages', (done) => {
      api.get('/api/group/1/messages')
        .set('authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should not allow user not in group to get messages', (done) => {
      api.get('/api/group/1/messages')
        .set('authorization', token2)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('You don\'t belong to this group');
          done();
        });
    });

    it('should not allow getting messages from unexisting group', (done) => {
      api.get('/api/group/2/messages')
        .set('authorization', token)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });
  });
});
