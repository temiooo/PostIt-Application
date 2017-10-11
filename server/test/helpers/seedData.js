import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../models';

export const users = [
  {
    email: 'abigail@gmail.com',
    username: 'abigail',
    password: bcrypt.hashSync('abigail2000', bcrypt.genSaltSync(10)),
    resetPasswordToken: null,
    resetPasswordExpires: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    email: 'aaron@gmail.com',
    username: 'aaron',
    password: bcrypt.hashSync('Ascottish', bcrypt.genSaltSync(10)),
    resetPasswordToken: null,
    resetPasswordExpires: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    email: 'recover@gmail.com',
    username: 'recover',
    password: bcrypt.hashSync('recover101', bcrypt.genSaltSync(10)),
    resetPasswordToken: '0agwAvILWEVS5xDlaTODlIImxZ5NpHBUxzDiwa2kExG7AnzK6G',
    resetPasswordExpires: Date.now() + 3600000,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    email: 'recover2@gmail.com',
    username: 'recover2',
    password: bcrypt.hashSync('recover202', bcrypt.genSaltSync(10)),
    resetPasswordToken: '2QVwcHW9OyX6SAKsJhXEgemhgqA7qHjaRCmhJ3gf0re8tSBM3X',
    resetPasswordExpires: Date.now() + 3600000,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },


];

export const group =
  {
    name: 'Gryffindor',
  }
  ;

export const insertSeedData = () => {
  db.User.bulkCreate(users);
  db.Group.create(group)
    .then((newgroup) => {
      newgroup.addUser(1);
    });
};

export const generateToken = (id, user) => {
  const token = jwt.sign({
    user: { id, name: user.username, email: user.email }
  }, process.env.SECRET, {
      expiresIn: '24h'
    });

  return token;
};

export const user1token = generateToken(1, users[0]);

export const user2token = generateToken(2, users[1]);

export const newGroup = {
  name: 'Europeans'
};

export const updatedGroup = {
  name: 'Africans'
};

export const newMessage = {
  content: 'Maiores ut enim ratione voluptas accusamus lorem.',
  priority: 'Urgent',
  senderId: 1,
  groupId: 1
};

export const invalidPriorityMessage = {
  content: 'Maiores ut enim ratione voluptas accusamus lorem.',
  priority: 'Uncertain',
  senderId: 1,
  groupId: 1
};

export const invalidSenderId = {
  content: 'Maiores ut enim ratione voluptas accusamus lorem.',
  priority: 'Urgent',
  senderId: 'most',
  groupId: 1
};

export const invalidGroupId = {
  content: 'Maiores ut enim ratione voluptas accusamus lorem.',
  priority: 'Urgent',
  senderId: 1,
  groupId: 'president'
};

export const forDefaultValue = {
  content: 'Maiores ut enim ratione voluptas accusamus et.',
  senderId: 1,
  groupId: 1
};

export const validUser = {
  email: 'coconutmilk@fruits.com',
  username: 'coconutmilk',
  password: 'sweetcoconut100'
};

export const duplicateUsername = {
  email: 'coconut@fruits.com',
  username: 'coconutmilk',
  password: 'coconut100'
};

export const badEmail = {
  email: 'pineapples@',
  username: 'pineapplejuice',
  password: 'pine100apples'
};

export const duplicateEmail = {
  email: 'coconutmilk@fruits.com',
  username: 'coconutchips',
  password: 'coco100fruits'
};

export const checkPassword = {
  email: 'grapes@fruits.com',
  username: 'grapejuice',
  password: 'grapejuiced800'
};
