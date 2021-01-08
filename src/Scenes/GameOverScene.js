import "phaser";
import config from "../Config/config";
import Button from "../Objects/Button";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.gameOverMusic = this.sound.add("gameOverMusic");
    this.gameOverMusic.play();
    this.add.text(
      config.width / 2 - 200,
      config.height / 2 - 200,
      "GAME OVER",
      {
        fontSize: "75px",
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
