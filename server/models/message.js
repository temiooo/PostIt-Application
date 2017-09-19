module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
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
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });
        Message.belongsTo(models.User, {
          foreignKey: 'senderId',
          onDelete: 'CASCADE',
        });
      },
    }
  });
  return Message;
};
