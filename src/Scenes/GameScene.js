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
  }
}
