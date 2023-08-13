const CardCmtsService = require('../service/cardCmtService');

class CardCmtsController {
  cardCmtsService = new CardCmtsService();
  // 댓글 작성 API
  postCmt = async (req, res) => {
    try {
      const { cardId } = req.params;
      const { nickname } = res.locals.user;
      const { cardCmt } = req.body;

      if (!cardCmt) {
        return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      await this.cardCmtsService.postCmt(cardId, nickname, cardCmt);
      return res.status(201).json({ message: '댓글을 작성하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  // 카드 id로 댓글 조회 API
  getCmt = async (req, res) => {
    try {
      const { cardId } = req.params;

      const cmts = await this.cardCmtsService.getCmt(cardId);

      return res.status(200).json({ cmts });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //댓글 수정 API
  updateCmt = async (req, res) => {
    try {
      const { cmtId } = req.params;
      const { nickname } = res.locals.user;
      const { cardCmt } = req.body;

      await this.cardCmtsService.updateCmt(cmtId, nickname, cardCmt);
      return res.status(200).json({ message: '댓글을 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //댓글 삭제 API
  deleteCmt = async (req, res) => {
    try {
      const { cmtId } = req.params;

      await this.cardCmtsService.deleteCmt(cmtId);
      return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = CardCmtsController;
