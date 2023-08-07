'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Users와 Boards는 일대다 관계
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });

      // Auths와 Boards는 일대다 관계
      this.hasMany(models.Auths, {
        targetKey: 'boardId',
        foreignKey: 'boardId',
      });

      // Columns와 Boards는 일대다 관계
      this.hasMany(models.Columns, {
        targetKey: 'boardId',
        foreignKey: 'boardId',
      });
    }
  }
  Boards.init(
    {
      boardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      boardTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      boardContent: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Boards',
    }
  );
  return Boards;
};
