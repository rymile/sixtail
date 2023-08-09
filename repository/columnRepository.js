const { Columns } = require('../models');
const { Op } = require('sequelize');

class ColumnRepository {
  // 컬럼 생성
  createServiceColumn = async (columnName, position, boardId, userId) => {
    const columnRepository = await Columns.create({
      columnName,
      position,
      boardId,
      userId,
    });
    return columnRepository;
  };

  // 컬럼 수정
  putServiceColumn = async (columnName, userId, columnId) => {
    const updatedColumn = await Columns.update(
      {
        columnName,
      },
      {
        where: { columnId },
      }
    );

    return updatedColumn;
  };
  // 컬럼 삭제
  deleteServiceColumn = async (columnId) => {
    const findColumn = await Columns.findOne({
      where: { columnId },
    });
    // console.log('=>', columnId);

    if (!findColumn) {
      return false;
    }

    const columnRepository = await Columns.destroy({
      where: { columnId },
    });
    return columnRepository;
  };

  // 컬럼 이동
  patchServiceColumn = async (position, userId, columnId) => {
    const column = await Columns.findByPk(columnId);

    if (!column) {
      return false;
    }

    const columnRepository = await Columns.update(
      {
        position,
      },
      {
        where: { columnId },
      }
    );

    return columnRepository;
  };
  // 컬럼 중복 확인
  // checkPositionDuplicate = async (position) => {
  //   const duplicateColumn = await Columns.findOne({
  //     where: {
  //       position,
  //     },
  //   });

  //   return duplicateColumn;
  // };
}

module.exports = ColumnRepository;
