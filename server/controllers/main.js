let jsonData = require("../data/TestData.json");

const getWords = async (req, res) => {
  try {
    let { wordList } = jsonData;

    // Shuffle The WordList
    wordList.sort(() => Math.random() - 0.5);

    //Get 10 Words from the Shuffled Word List
    wordList = wordList.slice(0, 10);

    // Send Json of WordList
    res.status(200).json({ result: wordList });
  } catch (err) {
    res.send(500).json({ error: err });
  }
};
const getRank = async (req, res) => {
  try {
    let { scoresList } = jsonData;
    const { score } = req.body;

    // Push the Score to the Array
    scoresList.push(score);

    // Sort The Score List Array after Pushing the New Score
    // Then get the index of the score and add one to them as the index starts with 0
    // This Finally will return us the position of the score in the scoreList also knows as rank

    const rank = scoresList.sort((a, b) => b - a).lastIndexOf(score) + 1;

    res.status(200).json({ rankPos: rank });
  } catch (err) {
    res.send(500).json({ error: err });
  }
};

module.exports = { getWords, getRank };
