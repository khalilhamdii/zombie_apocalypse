import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    // create the map
    var map = this.make.tilemap({ key: "map" });

    // first parameter is the name of the tilemap in tiled
    var tiles = map.addTilesetImage("map_min", "tiles");

    // creating the layers
    var background = map.createStaticLayer("Map", tiles, 0, 0);
    var obstacles = map.createStaticLayer("Obstacles", tiles, 0, 0);

    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // animation with key 'right'
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [2, 8, 2, 14],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 6, 0, 12],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, "player", 6);
  }
}
