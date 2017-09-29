import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import { insertSeedData, generateToken, users } from '../helpers/seedData';
// import { generateToken } from '../helpers/see'
// import { transporter } from '../../../server/utils/nodemailer';


describe('To do before running test', () => {
  before((done) => {
    insertSeedData();

    // request(app)
    //   .post('/api/user/signin')
    //   .set('Accept', 'application/json')
    //   .send({
    //     username: 'user1',
    //     password: 'useruser',
    //   })
    //   .end((err, res) => {
    //     user1token = res.body.token;
    //     expect(res.status).to.equal(200);
    //     expect(res.body).to.have.all.deep.keys('message', 'userId', 'token');
    //     done();
    //      });


    done();
  });

  const user1token = generateToken(users[0]);

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
          expect(res.body).to.have.all.deep.keys('message', 'group');
          expect(res.body.group.id).to.equal(1);
          expect(res.body.group.name).to.equal('Awesome Rockstars');
          expect(res.body.message).to.equal('Group Created Successfully');
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
          expect(res.body.message).to.equal('Group name is required');
          done();
        });
    });

    // it('should add user creating the group to the group member\'s list', (done) => {
    //   request(app)
    //     .get('/api/group/1/users')
    //     .set('authorization', user1token)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       console.log(res.body, '.................');
    //       // expect(res.body.email).to.equal('abigail@gmail.com');
    //       // expect(res.body[0].name).to.equal('abigail');
    //       done();
    //     });
    // });

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
});
