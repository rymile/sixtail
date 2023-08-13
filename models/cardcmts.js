'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardCmts extends Model {
    static associate(models) {
      // Users와 Auths는 일대다 관계
      this.belongsTo(models.CardManages, {
        targetKey: 'cardId',
        foreignKey: 'cardId',
      });
    }
  }
  CardCmts.init(
    {
      cmtId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cardId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cardCmt: {
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
      modelName: 'CardCmts',
    }
  );
  return CardCmts;
};
