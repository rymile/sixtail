const CardCmtsRepository = require('../repository/cardCmtRepository');
const ApiError = require('../apierror');

class CardCmtsService {
  cardCmtsRepository = new CardCmtsRepository();

  postCmt = async (cardId, nickname, cardCmt) => {
    const isExistCard = await this.cardCmtsRepository.findCard(cardId);
    if (!isExistCard) {
      throw new ApiError('카드가 존재하지 않습니다.', 404);
    }
    await this.cardCmtsRepository.postCmt(cardId, nickname, cardCmt);
  };

  getCmt = async (cardId) => {
    const isExistCard = await this.cardCmtsRepository.findCard(cardId);
    if (!isExistCard) {
      throw new ApiError('카드가 존재하지 않습니다.', 404);
    }
    return await this.cardCmtsRepository.getCmt(cardId);
  };

  updateCmt = async (cmtId, nickname, cardCmt) => {
    const updatedCmt = await this.cardCmtsRepository.findCmt(cmtId);
    if (!updatedCmt) {
      throw new ApiError('댓글이 존재하지 않습니다.', 404);
    }

    await this.cardCmtsRepository.updateCmt(cmtId, nickname, cardCmt);
  };

  deleteCmt = async (cmtId) => {
    const deletedCmt = await this.cardCmtsRepository.findCmt(cmtId);
    if (!deletedCmt) {
      throw new ApiError('댓글이 존재하지 않습니다.', 404);
    }

    await this.cardCmtsRepository.deleteCmt(cmtId);
  };
}

module.exports = CardCmtsService;
