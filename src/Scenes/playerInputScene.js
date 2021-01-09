import "phaser";
import config from "../Config/config";

export default class PlayerInputScene extends Phaser.Scene {
  constructor() {
    super("PlayerInput");
  }

  create() {
    this.text1 = this.add.text(
      config.width / 2 - 200,
      150,
      "Can you survive ?",
      {
        fontSize: "40px",
        fill: "#ffffff",
      }
    );
    this.text2 = this.add.text(
      config.width / 2 - 300,
      280,
      "Enter your name and fight the zombies:",
      {
        fontSize: "25px",
        fill: "#ffffff",
      }
    );

    this.input = this.add.dom(
      config.width / 2 + 100,
      400,
      "input",
      "background-color: white; width: 300px; height: 30px; font: 22px Times New Roman"
    );
    this.button = this.add.dom(
      config.width / 2 + 100,
      500,
      "button",
      "color:white;font-size:24px;background-color: #19d598; width: 220px; height: 50px;border:none;border-radius: 10px",
      "Start the game"
    );

    const addName = document.querySelector("button");

    addName.onclick = () => {
      const name = document.querySelector("input").value;
      if (name.length < 3) {
        this.add.text(
          config.width / 2 - 200,
          450,
          "Name should be over 3 characters!",
          {
            fontSize: "20px",
            fill: "#ff0000",
          }
        );
      } else {
        this.sys.game.globals.playerName = name;
        this.scene.stop("PlayerInput");
        this.scene.start("Game");
      }
    };
  }
}
