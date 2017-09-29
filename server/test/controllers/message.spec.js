import { expect } from 'chai';
import request from 'supertest';
import { user1token, user2token } from '../helpers/seedData';
import app from '../../../server';
import { transporter } from '../../../server/utils/nodemailer';

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
        expect(res.body.message.id).to.equal(1);
        expect(res.body.message.groupId).to.equal(2);
        expect(res.body.message.content).to.equal('My first message with normal priority');
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
        expect(res.body.message.id).to.equal(2);
        expect(res.body.message.content).to.equal('My second message with urgent priority');
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
      .post('/api/group/1/message')
      .set('authorization', user1token)
      .send({
        content: 'Hey me, I am the only one in this group',
        priority: 'Critical'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message.content).to.equal('Hey me, I am the only one in this group');
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
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Group Does Not Exist');
        done();
      });
  });

  it('should not allow user not in the group to post message', (done) => {
    request(app)
      .post('/api/group/1/message')
      .set('authorization', user2token)
      .send({
        content: 'Message from user not in this group',
        priority: 'Normal'
      })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('You don\'t belong to this group.');
        done();
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
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(3);
        expect(res.body[0].content).to.equal('My first message with normal priority');
        done();
      });
  });

  it('should not allow user not in group to get messages', (done) => {
    request(app)
      .get('/api/group/1/messages')
      .set('authorization', user2token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
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
