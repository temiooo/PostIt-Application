import { expect } from 'chai';
import db from '../../models';
import { insertSeedData, newGroup, updatedGroup } from '../helpers/seedData';

let newGroupId;

describe('Group Model', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
      .then(() => {
        insertSeedData();
        done();
      });
  });

  it('should create a group', (done) => {
    db.Group.create(newGroup)
      .then((group) => {
        newGroupId = group.dataValues.id;
        expect(group.dataValues.name).to.equal(newGroup.name);
        done();
      });
  });

  it('should raise a validation error for null input ', (done) => {
    db.Group.create()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('name cannot be null');
        expect(error.errors[0].type).to.equal('notNull Violation');
        expect(error.errors[0].path).to.equal('name');
        expect(error.errors[0].value).to.equal(null);
        done();
      });
  });

  it('should raise a validation for unique input', (done) => {
    db.Group.create(newGroup)
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Group name already exists. Use another name');
        expect(error.errors[0].type).to.equal('unique violation');
        expect(error.errors[0].path).to.equal('name');
        expect(error.errors[0].value).to.equal('Europeans');
        done();
      });
  });

  it('should update a group name', (done) => {
    db.Group.findById(newGroupId)
      .then((group) => {
        group.update(updatedGroup)
          .then((result) => {
            expect(result.dataValues.id).to.equal(newGroupId);
            expect(result.dataValues.name).to.equal(updatedGroup.name);
            done();
          });
      });
  });

  it('should delete a group', (done) => {
    db.Group.findById(newGroupId)
      .then((group) => {
        group.destroy()
          .then((result) => {
            expect(result).to.deep.equal([]);
            done();
          });
      });
  });
});
