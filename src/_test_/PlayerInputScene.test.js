import PlayerInputScene from '../Scenes/playerInputScene';

const scene = new PlayerInputScene();

test('PlayerInputScene is of type function', () => {
  expect(typeof PlayerInputScene).toBe('function');
});

test('PlayerInputScene key name is PlayerInput', () => {
  expect(scene.sys.config).toBe('PlayerInput');
});

test('PlayerInputScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
