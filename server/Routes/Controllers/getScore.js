const data = require('../../data/TestData.json');

const getScore = (req, res) => {
  try {
    const scoreList = data.scoresList;
    const score = req.query.score;
    const newScore = (Number(score) / 10) * 100;
    const numOfScore = scoreList.filter((el) => el < newScore);
    const rank = Number((numOfScore.length / 30) * 100).toFixed(2);

    res.status(201).json({
      success: true,
      message: 'rank',
      rank,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'catch error from get score method',
      error,
    });
  }
};

module.exports = getScore;
