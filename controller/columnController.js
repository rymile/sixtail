const ColumnService = require('../service/columnService.js');

class ColumnController {
  constructor() {
    this.columnService = new ColumnService();
  }

  // 컬럼 조회
  getcolumn = async (req, res) => {
    // const userId = res.locals.user
    const { columnId } = req.params;

    try {
      const getcolumn = await this.columnService.getcolumn(columnId);
      return res.status(200).json({ data: getcolumn });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  // 컬럼 생성
  post = async (req, res, next) => {
    const { columnName, position } = req.body;

    const { boardId } = req.params;

    const userId = res.locals.user;

    const { status, message } = await this.columnService.createCtrColumn(columnName, position, boardId, userId);

    res.status(status).json(message);
  };

  // 컬럼 수정
  put = async (req, res, next) => {
    const { columnName } = req.body;

    const userId = res.locals.user;

    const { columnId } = req.params;

    const { status, message } = await this.columnService.putCtrColumn(columnName, userId, columnId);

    res.status(status).json(message);
  };

  // 컬럼 삭제

  delete = async (req, res, next) => {
    const userId = res.locals.user;

    const { columnId } = req.params;

    const { status, message } = await this.columnService.deleteCtrColumn(columnId, userId);

    res.status(status).json(message);
  };

  // 컬럼 이동
  patch = async (req, res, next) => {
    const { position } = req.body;

    const userId = res.locals.user;

    const { columnId, boardId } = req.params;

    const { status, message } = await this.columnService.patchCtrColumn(position, userId, columnId, boardId);

    res.status(status).json(message);
  };
}

module.exports = ColumnController;
