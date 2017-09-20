import { expect } from 'chai';
import request from 'supertest';
import { insertSeedData } from '../helpers/seedData';
import app from '../../../server';
import { transporter } from '../../../server/utils/nodemailer';


describe('To do before running test', () => {
  before((done) => {
    insertSeedData();
    done();
  });

  let user1token, user2token;

  describe('SIGNUP API - /api/user/signup', () => {
    it('should create a new user and return a token if signup is successful', (done) => {
      request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          email: 'user1@gmail.com',
          password: 'useruser',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.deep.keys('message', 'userId', 'token');
          done();
        });
    });

    it('should require username, password and email before signup.', (done) => {
      request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: '',
          email: 'adeleke@gmail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email, Username and Password must be provided');
          done();
        });
    });

    it('should not create user with the same username.', (done) => {
      request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          email: 'user2@gmail.com',
          password: 'useruser',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Username taken already. Please use another one.');
          done();
        });
    });

    it('should not create user with the same email address.', (done) => {
      request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user2',
          email: 'user1@gmail.com',
          password: 'useruser',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Email taken already. Please use another one.');
          done();
        });
    });

    it('should not create user with an invalid email address.', (done) => {
      request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user2',
          email: 'user2.com',
          password: 'useruser',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Invalid email address');
          done();
        });
    });
  });

  describe('SIGNIN API - /api/user/signin', () => {
    it('should allow existing user to sign in and return a token', (done) => {
      request(app)
        .post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          password: 'useruser',
        })
        .end((err, res) => {
          user1token = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.deep.keys('message', 'userId', 'token');
          done();
        });
    });

    it('should require username and password before signin', (done) => {
      request(app)
        .post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: '',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a username and password');
          done();
        });
    });

    it('should not signin if username does not exist', (done) => {
      request(app)
        .post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'user567',
          password: 'useruser',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User not found');
          done();
        });
    });

    it('should not signin if password is incorrect', (done) => {
      request(app)
        .post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'user1',
          password: 'mypassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Password is incorrect');
          done();
        });
    });
  });

  describe('GET CURRENT USER DETAILS API - /api/user/current', () => {
    it('should allow registered user to retrieve their details', (done) => {
      request(app)
        .get('/api/user/current')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user).to.have.all.deep.keys('id', 'email', 'username', 'createdAt', 'updatedAt');
          expect(res.body.user.email).to.equal('user1@gmail.com');
          done();
        });
    });
  });

  describe('FORGET PASSWORD API -/api/user/forgotpassword', () => {
    it('should send forgot password email if email address exists in the database', (done) => {
      transporter.sendMail = () => Promise.resolve(1);
      request(app)
        .put('/api/user/forgotpassword')
        .set('Accept', 'application/json')
        .send({
          email: 'user1@gmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('An email has been sent to user1@gmail.com with further instructions');
          done();
        });
    });

    it('should  not send forgot password email a network error occurs', (done) => {
      transporter.sendMail = () => Promise.reject(1);
      request(app)
        .put('/api/user/forgotpassword')
        .set('Accept', 'application/json')
        .send({
          email: 'user1@gmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('A network error occured. Please try again.');
          done();
        });
    });

    it('should  not send forgot password email if email address does not exist in the database', (done) => {
      request(app)
        .put('/api/user/forgotpassword')
        .set('Accept', 'application/json')
        .send({
          email: 'randomuser456@gmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('This email does not exist');
          done();
        });
    });
  });

  describe('RESET PASSWORD API - /api/user/resetpassword/:token', () => {
    it('should reset user password if password token is associated with a user id', (done) => {
      transporter.sendMail = () => Promise.resolve(1);
      request(app)
        .put('/api/user/resetpassword/0agwAvILWEVS5xDlaTODlIImxZ5NpHBUxzDiwa2kExG7AnzK6G')
        .set('Accept', 'application/json')
        .send({
          password: 'goodrecover',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Password Reset Successful');
          done();
        });
    });

    it('should not reset user password if a network error occurs', (done) => {
      transporter.sendMail = () => Promise.reject(1);
      request(app)
        .put('/api/user/resetpassword/2QVwcHW9OyX6SAKsJhXEgemhgqA7qHjaRCmhJ3gf0re8tSBM3X')
        .set('Accept', 'application/json')
        .send({
          password: 'networkunrecover',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('A network error occured. Please try again.');
          done();
        });
    });

    it('should not reset user password if password token is not associated with a user id', (done) => {
      request(app)
        .put('/api/user/resetpassword/justareallyreallyrandomstring')
        .set('Accept', 'application/json')
        .send({
          password: 'goodluck101',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Password Reset Token is Invalid or has Expired');
          done();
        });
    });

    it('should not reset user password if a new password is not provided', (done) => {
      request(app)
        .put('/api/user/resetpassword/0agwAvILWEVS5xDlaTODlIImxZ5NpHBUxzDiwa2kExG7AnzK6G')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a new password for your account');
          done();
        });
    });
  });

  describe('SEARCH USER API - /api/search/users', () => {
    it('should return array of users if any is found', (done) => {
      request(app)
        .get('/api/search/users?q=a&group=1&limit=1&offset=0')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.deep.keys('users', 'pagination');
          expect(res.body.users).to.be.an('array');
          expect(res.body.pagination).to.deep.include({ pageCount: 1, pageNumber: 1 });
          done();
        });
    });

    it('should search even if limit and offset not included in query', (done) => {
      request(app)
        .get('/api/search/users?q=a&group=1')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.deep.keys('users', 'pagination');
          done();
        });
    });

    it('should not allow unregistered user to search for other users', (done) => {
      request(app)
        .get('/api/search/users?q=a&group=1&limit=1&offset=0')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });

    it('should not find any user if search query doesn\'t match any user', (done) => {
      request(app)
        .get('/api/search/users?q=blah&group=1&limit=1&offset=0')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No users found');
          done();
        });
    });

    it('should not search if group is not specified', (done) => {
      request(app)
        .get('/api/search/users?q=t&limit=1&offset=0')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Group Not Specified');
          done();
        });
    });
  });

  describe('LIST USER\'S GROUPS API - /api/user/:userId/groups', () => {
    it('should list group user belongs to', (done) => {
      request(app)
        .get('/api/user/5/groups')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should not list if user doesn\'t exist', (done) => {
      request(app)
        .get('/api/user/54/groups')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User Does Not Exist');
          done();
        });
    });

    it('should return empty array if user does not belong to any group', (done) => {
      request(app)
        .get('/api/user/3/groups')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.eql([]);
          done();
        });
    });
  });

  describe('CREATE GROUPS API - /api/group', () => {
    it('should allow registered user create a new group', (done) => {
      request(app)
        .post('/api/group')
        .set('authorization', user1token)
        .send({
          name: 'Awesome Rockstars',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.deep.keys('message', 'group', 'userAddedToGroup');
          done();
        });
    });

    it('should not create group with the same name', (done) => {
      request(app)
        .post('/api/group')
        .set('authorization', user1token)
        .send({
          name: 'Awesome Rockstars',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Group name exists already. Please use another one.');
          done();
        });
    });

    it('should not create group if group name is not provided', (done) => {
      request(app)
        .post('/api/group')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Group name not provided');
          done();
        });
    });

    it('should add user creating the group to the group member\'s list', (done) => {
      request(app)
        .post('/api/group')
        .set('authorization', user1token)
        .send({
          name: 'Magicians',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.userAddedToGroup).to.equal(true);
          done();
        });
    });

    it('should not allow unregistered user to create new group', (done) => {
      request(app)
        .post('/api/group')
        .set('Accept', 'application/json')
        .send({
          name: 'Awesome Rockstars',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });
  });

  describe('EDIT GROUP NAME API - /api/group/:groupId', () => {
    it('should allow group name be changed', (done) => {
      request(app)
        .put('/api/group/2')
        .set('authorization', user1token)
        .send({
          name: 'Ravenclaw',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.deep.keys('message', 'group');
          expect(res.body.group.name).to.equal('Ravenclaw');
          done();
        });
    });

    it('should not allow group name be changed to a name that already exists', (done) => {
      request(app)
        .put('/api/group/2')
        .set('authorization', user1token)
        .send({
          name: 'Gryffindor',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Group name exists already. Please use another one.');
          done();
        });
    });

    it('should not allow unregistered user to change group name', (done) => {
      request(app)
        .put('/api/group/2')
        .set('Accept', 'application/json')
        .send({
          name: 'Imagine Dragons',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });

    it('should ensure new name is provided for the group', (done) => {
      request(app)
        .put('/api/group/2')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Group name not provided');
          done();
        });
    });

    it('should not change name of group that doesn\'t exist', (done) => {
      request(app)
        .put('/api/group/167')
        .set('authorization', user1token)
        .send({
          name: 'Imagine Dragons',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });

    it('should not allow user not in the group to edit the group\'s name', (done) => {
      request(app)
        .put('/api/group/1')
        .set('authorization', user1token)
        .send({
          name: 'Imagine Dragons',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('You don\'t belong to this group');
          done();
        });
    });
  });

  describe('ADD USER TO GROUP API - /api/group/:groupId/user', () => {
    it('should allow registered user in a group add another registered user to group', (done) => {
      request(app)
        .post('/api/group/2/user')
        .set('authorization', user1token)
        .send({
          userId: 4,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User Added Successfully');
          done();
        });
    });

    it('should not allow adding a new user to a group that doesn\'t exist', (done) => {
      request(app)
        .post('/api/group/88/user')
        .set('authorization', user1token)
        .send({
          userId: 2,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });

    it('should not allow adding unregistered user to a group', (done) => {
      request(app)
        .post('/api/group/2/user')
        .set('authorization', user1token)
        .send({
          userId: 54,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User Does Not Exist');
          done();
        });
    });

    it('should not allow a user to be added twice in a group', (done) => {
      request(app)
        .post('/api/group/2/user')
        .set('authorization', user1token)
        .send({
          userId: 4
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('User Already Exists In This Group');
          done();
        });
    });
  });

  describe('LIST GROUP\'S USERS API - /api/group/:groupId/users', () => {
    it('should list users of a group that exists', (done) => {
      request(app)
        .get('/api/group/2/users')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should not list users of group that doesn\'t exist', (done) => {
      request(app)
        .get('/api/group/56/users')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });
  });

  describe('POST MESSAGE TO GROUP API - api/group/:groupId/message', () => {
    it('should allow user post normal message to a group', (done) => {
      request(app)
        .post('/api/group/2/message')
        .set('authorization', user1token)
        .send({
          content: 'My first message with normal priority',
          priority: 'Normal'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message.priority).to.equal('Normal');
          done();
        });
    });

    it('should not post message if priority is not Normal, Urgent or Critical', (done) => {
      request(app)
        .post('/api/group/2/message')
        .set('authorization', user1token)
        .send({
          content: 'Lorem Ipsum sample test',
          priority: 'Gibberish'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Message priority has to be Normal, Critical, or Urgent');
          done();
        });
    });

    it('should send email notifications to group members if message priority is urgent', (done) => {
      transporter.sendMail = () => Promise.resolve(1);
      request(app)
        .post('/api/group/2/message')
        .set('authorization', user1token)
        .send({
          content: 'My second message with urgent priority',
          priority: 'Urgent'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message.priority).to.equal('Urgent');
          done();
        });
    });

    it('should not send email notification if a network error occurs', (done) => {
      transporter.sendMail = () => Promise.reject(1);
      request(app)
        .post('/api/group/2/message')
        .set('authorization', user1token)
        .send({
          content: 'My third message with critical priority',
          priority: 'Critical'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('A network error occured. Please try again.');
          done();
        });
    });

    it('should not send email notification but only post message if message sender is the only group member', (done) => {
      request(app)
        .post('/api/group/3/message')
        .set('authorization', user1token)
        .send({
          content: 'Hey me, I am the only one in this group',
          priority: 'Critical'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message.priority).to.equal('Critical');
          done();
        });
    });

    it('should not allow user post message in group that does not exist', (done) => {
      request(app)
        .post('/api/group/50/message')
        .set('authorization', user1token)
        .send({
          content: 'Another message again for group that doesn\'t exist',
          priority: 'Normal'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });

    it('should not allow user not in the group to post message', (done) => {
      request(app)
        .post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'user3',
          email: 'user3@gmail.com',
          password: 'useruser3',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          user2token = res.body.token;
          request(app)
            .post('/api/group/1/message')
            .set('authorization', user2token)
            .send({
              content: 'Message from user not in this group',
            })
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body.message).to.equal('You don\'t belong to this group.');
              done();
            });
        });
    });
  });

  describe('GET MESSAGES FROM GROUP API - /api/group/:groupId/messages', () => {
    it('should allow user in group to get messages', (done) => {
      request(app)
        .get('/api/group/2/messages')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.deep.keys('messages', 'group');
          done();
        });
    });

    it('should not allow user not in group to get messages', (done) => {
      request(app)
        .get('/api/group/1/messages')
        .set('authorization', user2token)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('You don\'t belong to this group.');
          done();
        });
    });

    it('should not allow getting messages from unexisting group', (done) => {
      request(app)
        .get('/api/group/55/messages')
        .set('authorization', user1token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist.');
          done();
        });
    });
  });
});
