module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Group name already exists. Use another name'
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Group.belongsToMany(models.User, {
          through: 'UserGroup',
          foreignKey: 'groupId',
          otherKey: 'userId',
          constraints: false,
        });
        Group.hasMany(models.Message, {
          foreignKey: 'groupId'
        });
      }
    }
  });
  return Group;
};

