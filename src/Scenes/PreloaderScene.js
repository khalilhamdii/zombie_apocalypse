import "phaser";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // load assets needed in our game
    this.load.image("blueButton1", "src/assets/ui/blue_button02.png");
    this.load.image("blueButton2", "src/assets/ui/blue_button03.png");
    this.load.image("phaserLogo", "src/assets/logo.png");
    this.load.image("box", "src/assets/ui/grey_box.png");
    this.load.image("checkedBox", "src/assets/ui/blue_boxCheckmark.png");
    this.load.audio("bgMusic", ["src/assets/soundtrack.ogg"]);
    this.load.audio("fireGun", ["src/assets/Weapon Blow.wav"]);
    this.load.audio("killedZombie", ["src/assets/Zombie_dead.wav"]);
    this.load.audio("zombieSounds", ["src/assets/zombie_sounds.mp3"]);
    this.load.audio("heroDeath", ["src/assets/Hero_Death_00.mp3"]);
    this.load.audio("gameOverMusic", ["src/assets/GAMEOVER.wav"]);
    // map tiles
    this.load.image("tiles", "src/assets/map/map_min.png");

    // map in json format
    this.load.tilemapTiledJSON("map", "src/assets/map/map.json");

    // character spritesheet
    this.load.spritesheet("player", "src/assets/RPG_assets.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    // zombie spritesheet
    this.load.spritesheet("zombie", "src/assets/Zombie_Spritesheet.png", {
      frameWidth: 30,
      frameHeight: 35,
    });

    // load bullet

    this.load.image("bullet", "src/assets/bullet.png");

    // add logo image
    this.add.image(400, 200, "logo");

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 150,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    // remove progress bar when complete
    this.load.on(
      "complete",
      function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this)
    );

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  ready() {
    this.scene.start("Title");
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start("Title");
    }
  }
}
