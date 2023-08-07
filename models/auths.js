'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auths extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Users와 Auths는 일대다 관계
      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "authId",
      })

      // Boards와 Auths는 일대다 관계
      this.belongsTo(models.Boards, {
        targetKey: "boardId",
        foreignKey: "boardId",
      })
    }
  }
  Auths.init({
    boardId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    authId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Auths',
  });
  return Auths;
};