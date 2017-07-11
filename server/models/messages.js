module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Normal',
      validate: {
        isIn: {
          args: [
            ['Normal', 'Urgent', 'Critical']
          ],
          msg: 'Normal, Urgent or Critical Required'
        }
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Messages.belongsTo(models.Groups, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Messages;
};
