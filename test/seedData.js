import bcrypt from 'bcrypt';
import db from '../server/models';

export const users = [
  {
    email: 'abigail@gmail.com',
    username: 'abigail',
    password: bcrypt.hashSync('abigail2000', bcrypt.genSaltSync(10)),
    resetPasswordToken: null,
    resetPasswordExpires: Date.now() + 36000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'aaron@gmail.com',
    username: 'aaron',
    password: bcrypt.hashSync('Ascottish', bcrypt.genSaltSync(10)),
    resetPasswordToken: null,
    resetPasswordExpires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'recover@gmail.com',
    username: 'recover',
    password: bcrypt.hashSync('recover101', bcrypt.genSaltSync(10)),
    resetPasswordToken: '0agwAvILWEVS5xDlaTODlIImxZ5NpHBUxzDiwa2kExG7AnzK6G',
    resetPasswordExpires: new Date() + 36000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'expired@gmail.com',
    username: 'expired',
    password: bcrypt.hashSync('expired101', bcrypt.genSaltSync(10)),
    resetPasswordToken: '2QVwcHW9OyX6SAKsJhXEgemhgqA7qHjaRCmhJ3gf0re8tSBM3X',
    resetPasswordExpires: new Date() - 36000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },


];

export const group = [
  {
    name: 'Gryffindor',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const userGroup = [
  {
    userId: 1,
    groupId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const insertSeedData = () => {
  db.User.bulkCreate(users);
  db.Group.bulkCreate(group);
  db.UserGroup.bulkCreate(userGroup);
};

