import "phaser";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  zoom: 1,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true, // set to true to view zones
    },
  },
};
