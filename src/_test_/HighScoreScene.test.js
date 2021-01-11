import 'babel-polyfill';
import HighScoreScene from '../Scenes/HighScoreScene';

const scene = new HighScoreScene();

test('HighScoreScene is of type function', () => {
  expect(typeof HighScoreScene).toBe('function');
});

test('HighScoreScene key name is HighScore', () => {
  expect(scene.sys.config).toBe('HighScore');
});

test('HighScoreScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
