import GameScene from "../Scenes/GameScene";

const scene = new GameScene();

test("GameScene is of type function", () => {
  expect(typeof GameScene).toBe("function");
});

test("GameScene key name is Game", () => {
  expect(scene.sys.config).toBe("Game");
});

test("GameScene scene is not undefined", () => {
  expect(scene.sys.config).not.toBe(undefined);
});
