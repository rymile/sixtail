const { Columns, Users, sequelize } = require('../models');
const { Op } = require('sequelize');
const POSITION = { A: 1, B: 2, C: 3, D: 4, E: 5 };

class ColumnRepository {
  //보드에서 컬럼 조회
  getcolumn = async (boardId) => {
    const board = await Columns.findOne({ where: { boardId } });
    return board;
  };

  // 컬럼 생성 (트랜잭션 포함)
  createServiceColumn = async (columnName, position, boardId, userId) => {
    const t = await sequelize.transaction();
    console.log(boardId);
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

  // 컬럼 생성시 보드 조회
  findboard = async (boardId) => {
    const t = await sequelize.transaction();

    try {
      const findColumn = await Columns.findAll({ where: { boardId } });
      await t.commit();
      return findColumn;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  // 컬럼 수정 (트랜잭션 포함)
  putServiceColumn = async (columnName, columnId) => {
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

  // 컬럼 이동 확인 로직

  patchServiceColumn = async (position, userId, columnId, boardId) => {
    const transaction = await Columns.sequelize.transaction();
    try {
      const columns = await Columns.findAll({ where: { boardId } });
      for (let i = 0; i < columns.length - 1; i++) {
        const tempPosition = columns[i].position;
        columns[i].position = columns[i + 1].position;
        columns[i + 1].position = tempPosition;

        await columns[i].save();
        await columns[i + 1].save();
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}

module.exports = ColumnRepository;
