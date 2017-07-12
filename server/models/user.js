const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'This email address is invalid'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This username already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Group, {
          through: 'UserGroup',
          foreignKey: 'userId',
          constraints: false,
        });
        User.hasMany(models.Message, {
          foreignKey: 'senderId',
          as: 'messages',
        });
      },
      instanceMethod: {
        hashPassword() {
          return bcrypt.hashSync(User.password, bcrypt.genSaltSync(10));
        }
      },
      hooks: {
        beforeCreate(user) {
          user.password = User.hashPassword();
        }
      }
    }
  });
  return User;
};
