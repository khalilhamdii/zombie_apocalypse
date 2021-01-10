const HighScoreApi = (() => {
  const addNewScore = async (name, score) => {
    let _score = {
      user: `${name}`,
      score: score,
    };
    try {
      const request = await fetch(
        "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/yRcKnB2kevhO71ry1wUe/scores/",
        {
          method: "POST",
          body: JSON.stringify(_score),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const response = await request.json();
      console.log(response);
    } catch (error) {
      return error;
    }
  };

  const getTopFive = (obj) => {
    const arr = [];
    obj.forEach((element) =>
      arr.push({ name: element.user, score: element.score })
    );
    const sortedArr = arr.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    return sortedArr.slice(0, 5);
  };

  const getListOfScores = async () => {
    try {
      const response = await fetch(
        "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/yRcKnB2kevhO71ry1wUe/scores/"
      );
      const data = await response.json();
      return getTopFive(data["result"]);
    } catch (error) {
      return error;
    }
  };
  return { addNewScore, getTopFive, getListOfScores };
})();

export default HighScoreApi;
