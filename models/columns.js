'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Columns extends Model {
    static associate(models) {
      // Columns와 Boards는 일대다 관계
      this.belongsTo(models.Boards, {
        targetKey: 'boardId',
        foreignKey: 'boardId',
      });

      // Column와 CardManages는 일대다 관계
      this.hasMany(models.CardManages, {
        targetKey: 'columnId',
        foreignKey: 'columnId',
      });
    }
  }
  Columns.init(
    {
      columnId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      boardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      columnName: {
        allowNull: false,
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
      modelName: 'Columns',
    }
  );
  return Columns;
};
