import CreditsScene from "../Scenes/CreditsScene";

const scene = new CreditsScene();

test("CreditsScene is of type function", () => {
  expect(typeof CreditsScene).toBe("function");
});

test("CreditsScene key name is Credits", () => {
  expect(scene.sys.config).toBe("Credits");
});

test("CreditsScene scene is not undefined", () => {
  expect(scene.sys.config).not.toBe(undefined);
});
