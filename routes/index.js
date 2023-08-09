const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRoute');
router.use('/', usersRouter);

const boardsRouter = require('./boardRoute');
router.use('/', boardsRouter);

// const authRouter = require('./authRoute');
// router.use('/', authRouter);

const columnsRouter = require('./columnRoute');
router.use('/', columnsRouter);

// const cardManageRouter = require('./cardManageRoute');
// router.use('/', cardManageRouter);

module.exports = router;
