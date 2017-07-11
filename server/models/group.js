module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Groups', {
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
        Group.belongsToMany(models.Users, {
          through: 'UserGroups',
          foreignkey: 'groupId',
        });
        Group.hasMany(models.Messages, {
          foreignKey: 'groupId'
        });
      }
    }
  });
  return Group;
};
