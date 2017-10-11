import { expect } from 'chai';
import db from '../../models';
import {
  newMessage, invalidPriorityMessage, invalidSenderId,
  invalidGroupId, forDefaultValue
} from '../helpers/seedData';

describe('Message Model', () => {
  it('should add new message to the database', (done) => {
    db.Message.create(newMessage)
      .then((message) => {
        expect(message.dataValues.content).to.equal(newMessage.content);
        expect(message.dataValues.priority).to.equal(newMessage.priority);
        expect(message.dataValues.senderId).to.equal(newMessage.senderId);
        expect(message.dataValues.groupId).to.equal(newMessage.groupId);
        done();
      });
  });

  it('should raise a validation error for null input ', (done) => {
    db.Message.create()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('content cannot be null');
        expect(error.errors[1].message).to.equal('groupId cannot be null');
        expect(error.errors[2].message).to.equal('senderId cannot be null');
        done();
      });
  });

  it('should raise a validation for invalid priority', (done) => {
    db.Message.create(invalidPriorityMessage)
      .catch((error) => {
        expect(error.errors[0].message)
          .to.equal('Normal, Urgent or Critical Required');
        done();
      });
  });

  it('should raise a validation for invalid senderId', (done) => {
    db.Message.create(invalidSenderId)
      .catch((error) => {
        expect(error.message)
          .to.equal('invalid input syntax for integer: "most"');
        done();
      });
  });

  it('should raise a validation for invalid groupId', (done) => {
    db.Message.create(invalidGroupId)
      .catch((error) => {
        expect(error.message)
          .to.equal('invalid input syntax for integer: "president"');
        done();
      });
  });

  it('should ensure default value is added for priority', (done) => {
    db.Message.create(forDefaultValue)
      .then((message) => {
        const id = message.dataValues.id;
        db.Message.findById(id)
          .then((result) => {
            expect(result.dataValues.priority).to.equal('Normal');
            done();
          });
      });
  });
});
