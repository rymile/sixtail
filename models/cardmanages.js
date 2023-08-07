'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CardManages extends Model {

    static associate(models) {
      // Column와 CardManages는 일대다 관계
      this.belongsTo(models.Columns, {
        targetKey: "columnId",
        foreignKey: "columnId",
      })

      // CardManages와 CardCmts는 일대다 관계
      this.hasMany(models.CardCmts, {
        targetKey: "cardId",
        foreignKey: "cardId",
      })
      
    }
  }
  CardManages.init({
    cardId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    columnId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    cardName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cardContent: {
      allowNull: true,
      type: DataTypes.STRING
    },
    cardWorker: {
      allowNull: true,
      type: DataTypes.STRING
    },
    cardDeadline: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'CardManages',
  });
  return CardManages;
};