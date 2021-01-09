const HighScoreApi = (() => {
  const addNewScore = (name, score) => {
    let _score = {
      user: `${name}`,
      score: score,
    };

    fetch(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/yRcKnB2kevhO71ry1wUe/scores/",
      {
        method: "POST",
        body: JSON.stringify(_score),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  const getTopFive = (obj) => {
    const arr = [];
    obj["result"].forEach((element) =>
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
      return getTopFive(data);
    } catch (error) {
      return error;
    }
  };
  return { addNewScore, getListOfScores };
})();

export default HighScoreApi;
