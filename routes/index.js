const express = require('express');
const router = express.Router();

const usersRouter = require('./userRoute');
router.use('/', usersRouter);

const boardsRouter = require('./boardRoute');
router.use('/board', boardsRouter);

const columnsRouter = require('./columnRoute');
router.use('/column', columnsRouter);

const cardManagesRouter = require('./cardManageRoute');
router.use('/cardmanage', cardManagesRouter);

const cardCmtsRouter = require('./cardCmtRoute');
router.use('/cardcmt', cardCmtsRouter);

module.exports = router;
