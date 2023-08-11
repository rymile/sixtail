const ColumnRepository = require('../repository/columnRepository.js');

class ColumnService {
  columnRepository = new ColumnRepository();

  // 컬럼 생성
  createCtrColumn = async (columnName, position, boardId, userId) => {
    try {
      if (!columnName) return { status: 400, mssage: '컬럼 이름을 확인해주세요.' };
      else if (!boardId) return { status: 400, message: '보드를 먼저 생성 해주세요' };

      const findboard = await this.columnRepository.findboard(boardId);
      if (!findboard) {
        return { status: 400, message: ' 보드가 없습니다.' };
      }

      const columnService = await this.columnRepository.createServiceColumn(columnName, position, boardId, userId);
      return { status: 200, message: '컬럼이 생성되었습니다.', columnService };
    } catch (error) {
      console.error(error);
      return { status: 500, massge: '서버오류' };
    }
  };

  // 컬럼 수정

  putCtrColumn = async (columnName, userId, columnId) => {
    try {
      if (!columnName) return { status: 400, message: '컬럼 이름을 입력하세요.' };

      const existColumn = await this.columnRepository.findColumnById(userId, columnId);
      if (!existColumn) {
        return {
          status: 400,
          message: '조회된 컬럼이 없습니다.',
        };
      }

      if (columnName === existColumn.columnName) {
        return {
          status: 400,
          message: '같은 이름으로 수정이 불가능합니다.',
        };
      }

      if (!userId) return { status: 400, message: '로그인이 필요합니다.' };

      const updatedColumn = await this.columnRepository.putServiceColumn(columnName, columnId);
      return { status: 200, message: '컬럼을 수정하였습니다.', updatedColumn };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '서버오류' };
    }
  };

  // 컬럼삭제
  deleteCtrColumn = async (columnId, userId) => {
    try {
      const column = await this.columnRepository.findDeleteColumn(userId, columnId);

      // 컬럼 확인 로직
      if (!column) {
        return { status: 400, message: '조회된 컬럼이 없습니다.' };
      }

      if (!columnId) return { status: 400, message: '조회된 컬럼이 없습니다.' };

      const destroyColumn = await this.columnRepository.deleteServiceColumn(columnId, userId);
      return { status: 200, message: '컬럼을 삭제하였습니다.', destroyColumn };
    } catch (error) {
      console.error(error);
      g;
      return { status: 500, message: '서버오류' };
    }
  };

  // 컬럼 이동
  patchCtrColumn = async (position, userId, columnId, boardId) => {
    try {
      if (!position) return { status: 400, message: '이동할 컬럼이 없습니다.' };
      else if (!columnId) return { stauts: 400, message: '이동할 컬럼이 없습니다.' };

      const updatedColumn = await this.columnRepository.patchServiceColumn(position, userId, columnId, boardId);

      return { status: 200, message: '컬럼을 이동하였습니다.' };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '서버오류' };
    }
  };
}

module.exports = ColumnService;
