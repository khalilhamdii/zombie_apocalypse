import "phaser";
import Button from "../Objects/Button";
import config from "../Config/config";
import HighScoreApi from "../Objects/HighScoreApi";

export default class HighScoreScene extends Phaser.Scene {
  constructor() {
    super("HighScore");
  }

  create() {
    this.text = this.add.text(config.width / 2 - 50, 50, "Top 5", {
      fontSize: 40,
    });
    HighScoreApi.getListOfScores().then((topFiveScores) => {
      let nbr = 1;
      let margin = 150;
      topFiveScores.forEach((element) => {
        this.add.text(config.width / 2 - 100, margin + 5, `${nbr} - `);
        this.add.text(
          config.width / 2 - 50,
          margin,
          element.name + " : " + element.score,
          {
            fontSize: 24,
          }
        );
        nbr += 1;
        margin += 50;
      });
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
