import supertest from 'supertest';

const expect = require('chai').expect;
const should = require('chai').should;
const server = require('../server.js');

const api = supertest('http://localhost:3000');

describe('server response', () => {
  before(() => {
    server.listen(3000);
  });

  let token;
  let groupId;
  describe('API TESTING', () => {
    it('should create a new user and return a token', (done) => {
      api.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'userone',
          email: 'userone@ogho.com',
          password: 'emma22',
        })
        .expect('Content-Type', '/json/')
        .end((err, res) => {
          expect(res.body).to.have.all.deep.keys('success', 'message', 'token');
          done();
        });
    });

    it('should allow existing user to sign in and return a token', (done) => {
      api.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'userone',
          password: 'emma22',
        })
        .expect('Content-Type', '/json/')
        .end((err, res) => {
          token = res.body.token;
          expect(res.body).to.have.all.deep.keys('success', 'message', 'token');
          done();
        });
    });

    it('should allow registered user create a new group', (done) => {
      api.post('/api/group')
        .set('authorization', token)
        .send({
          name: 'Awesome Rockstars',
        })
        .expect('Content-Type', '/json/')
        .end((err, res) => {
          expect(res.body.message).to.equal('Group Created Successfully');
          done();
        });
    });

    it('should not create a group with the same name', (done) => {
      api.post('/api/group')
        .set('Accept', 'application/json')
        .send({
          name: 'Awesome Rockstars',
        })
        .expect('Content-Type', '/json/')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('register user should be able add user to a group you created', (done) => {
      api.post('/api/group/${}/user')
        .set('Accept', 'application/json')
        .send({
          name: 'Group is sammy',
        })
        .expect('Content-Type', '/json/')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    // it('should not create a group with the same name', (done) => {
    //   api.post('/api/group')
    //     .set('Accept', 'application/json')
    //     .send({
    //       name: 'Group is sammy',
    //     })
    //     .expect('Content-Type', '/json/')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(403);
    //       done();
    //     });
    // });

    // it('should not create a group with the same name', (done) => {
    //   api.post('/api/group')
    //     .set('Accept', 'application/json')
    //     .send({
    //       name: 'Group is sammy',
    //     })
    //     .expect('Content-Type', '/json/')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(403);
    //       done();
    //     });
    // });

    // it('should not create a group with the same name', (done) => {
    //   api.post('/api/group')
    //     .set('Accept', 'application/json')
    //     .send({
    //       name: 'Group is sammy',
    //     })
    //     .expect('Content-Type', '/json/')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(403);
    //       done();
    //     });
    // });

    // it('should not create a group with the same name', (done) => {
    //   api.post('/api/group')
    //     .set('Accept', 'application/json')
    //     .send({
    //       name: 'Group is sammy',
    //     })
    //     .expect('Content-Type', '/json/')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(403);
    //       done();
    //     });
    // });

    // it('should not create a group with the same name', (done) => {
    //   api.post('/api/group')
    //     .set('Accept', 'application/json')
    //     .send({
    //       name: 'Group is sammy',
    //     })
    //     .expect('Content-Type', '/json/')
    //     .end((err, res) => {
    //       expect(res.status).to.equal(403);
    //       done();
    //     });
    // });
  });
});
