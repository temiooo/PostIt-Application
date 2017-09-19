import { expect } from 'chai';
import request from 'supertest';
import db from '../server/models';
import { insertSeedData } from './seedData';
import app from '../server';
import { transporter } from '../server/utils/nodemailer';


describe('To do before running test', () => {
  before((done) => {
    db.sequelize.sync({ force: true }).then(() => {
      console.log('Database reset succesful');
      insertSeedData();
      console.log('Seed data inserted into the database');
      done();
    });
  });
  afterEach(() => {
    // Reset the mock back to the defaults after each test
  });
  after((done) => {
    // db.sequelize.sync({ force: true }).then(() => {
    //   console.log('Database cleared');
    //   done();
    // });
    done();
  });

  let user1token;

  describe('SIGNUP API', () => {
    it('should create a new user and return a token', (done) => {
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
          expect(res.status).to.equal(400);
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
          expect(res.status).to.equal(400);
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

  describe('SIGNIN API', () => {
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
          expect(res.status).to.equal(400);
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

  describe('FORGET PASSWORD API', () => {
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

  describe('RESET PASSWORD API', () => {
    it('should reset user password if password token matches user id', (done) => {
      request(app)
        .put('/api/user/resetpassword')
        .set('Accept', 'application/json')
        .send({
          password: 'bestuserever',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('A network error occured. Please try again');
          done();
        });
    });

    // it('should  not send forgot password email if email address does not exist in the database', (done) => {
    //   request(app)
    //     .put('/api/user/forgotpassword')
    //     .set('Accept', 'application/json')
    //     .send({
    //       email: 'reandomuser@gmail.com',
    //     })
    //     .end((err, res) => {
    //       expect(res.status).to.equal(404);
    //       expect(res.body.message).to.equal('This email does not exist');
    //       done();
    //     });
    // });
  });

  describe('SEARCH USER API', () => {
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
          expect(res.status).to.equal(403);
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

  describe('LIST USER\'S GROUPS API', () => {
    it('should list group user belongs to', (done) => {
      request(app)
        .get('/api/user/1/groups')
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
          expect(res.status).to.equal(400);
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

  describe('CREATE GROUPS API', () => {
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
        .expect(400)
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
          expect(res.body.userAddedToGroup).to.be.true;
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
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('No token provided');
          done();
        });
    });
  });

  describe('EDIT GROUP NAME API', () => {
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
          expect(res.status).to.equal(400);
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
          expect(res.status).to.equal(403);
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
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('You don\'t belong to this group');
          done();
        });
    });
  });

  // describe('ADD USERS TO GROUPS API', () => {
  //   it('should allow registered user in group add registered user to group', (done) => {
  //     request(app)
  //       .post('/api/group/2/user')
  //       .set('authorization', token)
  //       .send({
  //         userId: firstuserId,
  //       })
  //       .expect(201)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('User Added Successfully');
  //         done();
  //       });
  //   });

  //   it('should not allow unregistered users add registered user to group', (done) => {
  //     api.post('/api/group/1/user')
  //       .set('Accept', 'application/json')
  //       .send({
  //         userId: firstuserId,
  //       })
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('No token provided');
  //         done();
  //       });
  //   });

  //   it('should not allow adding user to unexisting group', (done) => {
  //     api.post('/api/group/2/user')
  //       .set('authorization', token)
  //       .send({
  //         userId: firstuserId,
  //       })
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('Group Does Not Exist');
  //         done();
  //       });
  //   });

  //   it('should not allow adding unregistered user to a group', (done) => {
  //     api.post('/api/group/1/user')
  //       .set('authorization', token)
  //       .send({
  //         userId: 54,
  //       })
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('User Does Not Exist');
  //         done();
  //       });
  //   });

  //   it('should not allow user to be added to a group twice', (done) => {
  //     api.post('/api/group/1/user')
  //       .set('authorization', token)
  //       .send({
  //         userId: firstuserId
  //       })
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('User Already Exists In This Group');
  //         done();
  //       });
  //   });
  // });

  // describe('POST MESSAGE TO GROUP API', () => {
  //   it('should allow user belonging to group to post message said group', (done) => {
  //     api.post('/api/group/1/message')
  //       .set('authorization', token)
  //       .send({
  //         content: 'My first message',
  //       })
  //       .expect(201)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('Message Posted Successfully');
  //         done();
  //       });
  //   });

  //   it('should not allow user not in a group to post message to said group', (done) => {
  //     api.post('/api/user/signup')
  //       .set('Accept', 'application/json')
  //       .send({
  //         username: 'user3',
  //         email: 'user3@gmail.com',
  //         password: 'useruser3',
  //       })
  //       .expect(201)
  //       .end((err, res) => {
  //         token2 = res.body.token;
  //         api.post('/api/group/1/message')
  //           .set('authorization', token2)
  //           .send({
  //             content: 'Message from user not in this group',
  //           })
  //           .expect(400)
  //           .end((err, res) => {
  //             expect(res.body.message).to.equal('You don\'t belong to this group so you can\'t post a message here');
  //             done();
  //           });
  //       });
  //   });

  //   it('should not allow user post message in group that does not exist', (done) => {
  //     api.post('/api/group/2/message')
  //       .set('authorization', token)
  //       .send({
  //         content: 'Another message again',
  //       })
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('Group Does Not Exist');
  //         done();
  //       });
  //   });

  //   it('should allow user add specified priority to message being posted', (done) => {
  //     api.post('/api/group/1/message')
  //       .set('authorization', token)
  //       .send({
  //         content: 'My second message',
  //         priority: 'Critical'
  //       })
  //       .expect(201)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('Message Posted Successfully');
  //         done();
  //       });
  //   });

  //   it('should not allow unspecified priority be added to posted message', (done) => {
  //     api.post('/api/group/1/message')
  //       .set('authorization', token)
  //       .send({
  //         content: 'My third message',
  //         priority: 'Insignificant'
  //       })
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(403);
  //         done();
  //       });
  //   });

  //   it('should not allow message content be empty', (done) => {
  //     api.post('/api/group/1/message')
  //       .set('authorization', token)
  //       .send({
  //         content: '',
  //       })
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(403);
  //         done();
  //       });
  //   });
  // });

  // describe('GET MESSAGES FROM GROUP API', () => {
  //   it('should allow user in group to get messages', (done) => {
  //     api.get('/api/group/1/messages')
  //       .set('authorization', token)
  //       .expect(200)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         done();
  //       });
  //   });

  //   it('should not allow user not in group to get messages', (done) => {
  //     api.get('/api/group/1/messages')
  //       .set('authorization', token2)
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('You don\'t belong to this group');
  //         done();
  //       });
  //   });

  //   it('should not allow getting messages from unexisting group', (done) => {
  //     api.get('/api/group/2/messages')
  //       .set('authorization', token)
  //       .expect(400)
  //       .end((err, res) => {
  //         expect(res.body.message).to.equal('Group Does Not Exist');
  //         done();
  //       });
  //   });
  // });
});

// describe('To do before running test', () => {
//   after((done) => {
//     db.sequelize.sync({ force: true }).then(() => {
//       console.log('Database Cleared');
//     });
//     done();
//   });
// });
