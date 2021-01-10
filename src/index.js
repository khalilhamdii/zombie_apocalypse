import './assets/stylesheets/style.css';
import Phaser from 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import PlayerInputScene from './Scenes/playerInputScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import HighScoreScene from './Scenes/HighScoreScene';
import GameOverScene from './Scenes/GameOverScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = {
      model,
      bgMusic: null,
      fireGun: null,
      playerName: '',
      score: 0,
    };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('HighScore', HighScoreScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('PlayerInput', PlayerInputScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
