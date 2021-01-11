/* eslint-disable consistent-return */
import "babel-polyfill";
import HighScoreApi from "../Objects/HighScoreApi";

test("Post a valid score of 500", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ result: "Leaderboard score created correctly." }),
    })
  );
  HighScoreApi.addNewScore("Test_1", 500).then((response) => {
    expect(response.result).toEqual("Leaderboard score created correctly.");
  });
});

test("Post invalid username", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ result: undefined }),
    })
  );
  HighScoreApi.addNewScore("", 10).then((response) => {
    expect(response.result).toBe(undefined);
  });
});

describe("Testing GetListOfScores function", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            result: [
              { user: "name1", score: 1 },
              { user: "name2", score: 2 },
              { user: "name3", score: 3 },
              { user: "name4", score: 4 },
              { user: "name5", score: 5 },
              { user: "name6", score: 6 },
              { user: "name7", score: 7 },
              { user: "name8", score: 8 },
              { user: "name9", score: 9 },
              { user: "name10", score: 10 },
            ],
          }),
      })
    );
  });

  test("Get object from the API", () => {
    HighScoreApi.getListOfScores().then((scores) => {
      expect(typeof scores).toBe("object");
    });
  });

  test("Get the Top score username", () => {
    HighScoreApi.getListOfScores().then((scores) => {
      const username = scores[0].name;
      expect(username).toBe("name10");
    });
  });

  test("Get the Top score recorded", () => {
    HighScoreApi.getListOfScores().then((scores) => {
      const topScore = scores[0].score;
      expect(topScore).toBe(10);
    });
  });
});

test("Return top five object sorted by score value", () => {
  const objects = [
    { user: "name1", score: 1 },
    { user: "name2", score: 2 },
    { user: "name3", score: 3 },
    { user: "name4", score: 4 },
    { user: "name5", score: 5 },
    { user: "name6", score: 6 },
    { user: "name7", score: 7 },
    { user: "name8", score: 8 },
    { user: "name9", score: 9 },
    { user: "name10", score: 10 },
  ];

  const expected = [
    { name: "name10", score: 10 },
    { name: "name9", score: 9 },
    { name: "name8", score: 8 },
    { name: "name7", score: 7 },
    { name: "name6", score: 6 },
  ];

  expect(HighScoreApi.getTopFive(objects)).toEqual(expected);
});

test("Not to return the scores unsorted", () => {
  const objects = [
    { user: "name1", score: 1 },
    { user: "name2", score: 2 },
    { user: "name3", score: 3 },
    { user: "name4", score: 4 },
    { user: "name5", score: 5 },
    { user: "name6", score: 6 },
    { user: "name7", score: 7 },
    { user: "name8", score: 8 },
    { user: "name9", score: 9 },
    { user: "name10", score: 10 },
  ];

  const expected = [
    { name: "name6", score: 6 },
    { name: "name7", score: 7 },
    { name: "name8", score: 8 },
    { name: "name9", score: 9 },
    { name: "name10", score: 10 },
  ];

  expect(HighScoreApi.getTopFive(objects)).not.toEqual(expected);
});
