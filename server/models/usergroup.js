module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return UserGroup;
};
