import "phaser";

export default {
  type: Phaser.AUTO,
  parent: "phaser-game",
  width: 800,
  height: 600,
  zoom: 1,
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false, // set to true to view zones
    },
  },
};
