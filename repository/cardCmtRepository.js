const { CardManages, CardCmts } = require('../models');

class CardCmtsRepository {
  findCard = async (cardId) => {
    return await CardManages.findByPk(cardId);
  };

  postCmt = async (cardId, nickname, cardCmt) => {
    await CardCmts.create({ cardId, nickname, cardCmt });
  };

  getCmt = async (cardId) => {
    return await CardCmts.findAll({ where: { cardId } });
  };

  findCmt = async (cmtId) => {
    return await CardCmts.findByPk(cmtId);
  };

  updateCmt = async (cmtId, nickname, cardCmt) => {
    await CardCmts.update({ nickname, cardCmt }, { where: { cmtId } });
  };

  deleteCmt = async (cmtId) => {
    await CardCmts.destroy({ where: { cmtId } });
  };
}

module.exports = CardCmtsRepository;
