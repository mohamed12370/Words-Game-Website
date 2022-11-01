const data = require('../../data/TestData.json');

const getQuestions = (req, res) => {
  try {
    const wordList = data.wordList;
    const sendQues = [];

    do {
      const randomNum = Math.floor(Math.random() * 14) + 1;
      const randomQuestion = wordList[randomNum];
      const findQuestion = sendQues.filter((el) => el === randomQuestion);

      if (findQuestion.length === 0) {
        sendQues.push(randomQuestion);
      }
    } while (sendQues.length < 10);

    res.status(201).json({
      success: true,
      message: 'Questions',
      sendQues,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get 10 questions method',
      error,
    });
  }
};

module.exports = getQuestions;
