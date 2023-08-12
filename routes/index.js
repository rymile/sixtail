const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRoute');
router.use('/', usersRouter);

const boardsRouter = require('./boardRoute');
router.use('/board', boardsRouter);

// const authRouter = require('./authRoute');
// router.use('/', authRouter);

const columnsRouter = require('./columnRoute');
router.use('/column', columnsRouter);

const cardManageRouter = require('./cardManageRoute');
router.use('/cardManage', cardManageRouter);

module.exports = router;
