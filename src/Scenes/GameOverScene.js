import "phaser";
import config from "../Config/config";
import Button from "../Objects/Button";
import HighScoreApi from "../Objects/HighScoreApi";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.gameOverMusic = this.sound.add("gameOverMusic");
    this.gameOverMusic.play();
    this.playerName = this.sys.game.globals.playerName;
    this.score = this.sys.game.globals.score;
    HighScoreApi.addNewScore(this.playerName, this.score);
    this.add.text(
      config.width / 2 - 200,
      config.height / 2 - 200,
      "GAME OVER",
      {
        fontSize: "75px",
        fill: "#ff0000",
      }
    );

    this.add.text(
      config.width / 2 - 200 - 25,
      config.height / 2 - 100,
      "Your score is " + this.score,
      {
        fontSize: "50px",
        fill: "#ffffff",
      }
    );

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      "blueButton1",
      "blueButton2",
      "Try again!",
      "Game"
    );

    this.titleButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      "blueButton1",
      "blueButton2",
      "Main menu",
      "Title"
    );
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height
      )
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
