import "phaser";
import Button from "../Objects/Button";
import config from "../Config/config";

export default class HighScoreScene extends Phaser.Scene {
  constructor() {
    super("HighScore");
  }

  create() {
    this.text = this.add.text(config.width / 2 - 50, 50, "Top 5", {
      fontSize: 40,
    });
    this.nbr1 = this.add.text(config.width / 2 - 100, 155, "1 - ");
    this.top1 = this.add.text(config.width / 2 - 50, 150, "Player 1", {
      fontSize: 24,
    });
    this.nbr2 = this.add.text(config.width / 2 - 100, 205, "2 - ");
    this.top2 = this.add.text(config.width / 2 - 50, 200, "Player 1", {
      fontSize: 24,
    });
    this.nbr3 = this.add.text(config.width / 2 - 100, 255, "3 - ");
    this.top3 = this.add.text(config.width / 2 - 50, 250, "Player 1", {
      fontSize: 24,
    });
    this.nbr4 = this.add.text(config.width / 2 - 100, 305, "4 - ");
    this.top4 = this.add.text(config.width / 2 - 50, 300, "Player 1", {
      fontSize: 24,
    });
    this.nbr5 = this.add.text(config.width / 2 - 100, 355, "5 - ");
    this.top5 = this.add.text(config.width / 2 - 50, 350, "Player 1", {
      fontSize: 24,
    });

    this.menuButton = new Button(
      this,
      config.width / 2,
      500,
      "blueButton1",
      "blueButton2",
      "Menu",
      "Title"
    );
  }
}
