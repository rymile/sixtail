const { Columns, Users, sequelize } = require('../models');
const { Op } = require('sequelize');
const columns = require('../models/columns');

class ColumnRepository {
  // 컬럼 생성 (트랜잭션 포함)
  createServiceColumn = async (columnName, position, boardId, userId) => {
    const t = await sequelize.transaction();

    try {
      const columnRepository = await Columns.create(
        {
          columnName,
          position,
          boardId,
          userId,
        },
        { transaction: t }
      );

      await t.commit();
      return columnRepository;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 컬럼 수정 (트랜잭션 포함)
  putServiceColumn = async (columnName, userId, columnId) => {
    const t = await sequelize.transaction();

    try {
      const updatedColumn = await Columns.update(
        {
          columnName,
        },
        {
          where: { columnId },
          transaction: t,
        }
      );

      await t.commit();
      return updatedColumn;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 컬럼 id  수정 조회
  findColumnById = async (userId, columnId) => {
    const t = await sequelize.transaction();

    try {
      const findColumn = await Columns.findOne({ where: { columnId: columnId } });
      await t.commit();
      return findColumn;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 컬럼 삭제 (트랜잭션 포함)
  deleteServiceColumn = async (columnId) => {
    const t = await sequelize.transaction();

    try {
      const findColumn = await Columns.findOne({
        where: { columnId },
        transaction: t,
      });

      if (!findColumn) {
        await t.rollback();
        return false;
      }

      const columnRepository = await Columns.destroy({
        where: { columnId },
        transaction: t,
      });

      await t.commit();
      return columnRepository;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 컬럼 삭제 id 조회
  findDeleteColumn = async (userId, columnId) => {
    const t = await sequelize.transaction();

    try {
      const findColumn = await Columns.findOne({ where: { columnId: columnId } });
      await t.commit();
      return findColumn;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 컬럼 이동 확인 두번째 로직

  // patchServiceColumn = async (position) => {
  //   const transaction = await Columns.sequelize.transaction();
  //   try {
  //     const columnA = await Columns.findAll({ where: { position } }, { transaction });

  //     await columnA.update({ position }, { transaction });

  //     await transaction.commit();
  //   } catch (error) {
  //     await transaction.rollback();
  //     throw error;
  //   }
  // };

  // 컬럼 이동 (트랜잭션 포함)
  patchServiceColumn = async (position, userId, columnId) => {
    const t = await sequelize.transaction();

    try {
      const column = await Columns.findByPk(columnId, { transaction: t });

      if (!column) {
        await t.rollback();
        return false;
      }

      const updatedColumn = await Columns.update(
        {
          position,
        },
        {
          where: { columnId },
          transaction: t,
        }
      );

      await t.commit();
      return updatedColumn;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 컬럼 중복 확인
  // checkPositionDuplicate = async (position, columnId) => {
  //   try {
  //     const duplicateColumn = await Columns.findOne({
  //       where: {
  //         position,
  //         columnId: {
  //           [Op.ne]: columnId,
  //         },
  //       },
  //     });

  //     return duplicateColumn !== null;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };
}

module.exports = ColumnRepository;
