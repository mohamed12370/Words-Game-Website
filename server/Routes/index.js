const router = require('express').Router();

const getQuestions = require('./Controllers/getQuestios');
const getScore = require('./Controllers/getScore');

router.get('/questions', getQuestions);
router.get('/score', getScore);

module.exports = router;
