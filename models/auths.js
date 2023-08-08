'use strict';
const { Model } = require('sequelize');
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
        targetKey: 'userId', // authId로 변경되어야 함. 변경 전: userId
        foreignKey: 'authId', //userId로 변경되어야 함. 변경 전: authId
      });

      // Boards와 Auths는 일대다 관계
      this.belongsTo(models.Boards, {
        targetKey: 'boardId',
        foreignKey: 'boardId',
      });
    }
  }
  Auths.init(
    {
      authId: {
        // authId로 변경하고 primarykey 설정 필요 변경 전: boardId, primarykey 항목 없음
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      boardId: {
        // boardId로 변경 필요 변경 전: authId
        allowNull: false,
        type: DataTypes.INTEGER,
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
      modelName: 'Auths',
    }
  );
  return Auths;
};
