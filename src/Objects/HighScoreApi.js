const HighScoreApi = (() => {
  const addNewScore = async (name, score) => {
    const scoreObj = {
      user: `${name}`,
      score,
    };
    try {
      const request = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/eqKpMNxXDBW8q3sLsUNv/scores/',
        {
          method: 'POST',
          body: JSON.stringify(scoreObj),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        },
      );
      const response = await request.json();
      return response;
    } catch (error) {
      return error;
    }
  };

  const getTopFive = (obj) => {
    const arr = [];
    obj.forEach((element) => arr.push({ name: element.user, score: element.score }));
    const sortedArr = arr.sort((a, b) => b.score - a.score);
    return sortedArr.slice(0, 5);
  };

  const getListOfScores = async () => {
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/eqKpMNxXDBW8q3sLsUNv/scores/',
      );
      const data = await response.json();
      return getTopFive(data.result);
    } catch (error) {
      return error;
    }
  };
  return { addNewScore, getTopFive, getListOfScores };
})();

export default HighScoreApi;
