import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  onTouchEnemy(player, zombie) {
    this.physics.pause();

    player.setTint(0xff0000);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.start("GameOver");
      },
      loop: false,
    });
  }

  create() {
    this.cameras.main.setZoom(2);
    // create the map
    var map = this.make.tilemap({ key: "map" });

    // first parameter is the name of the tilemap in tiled
    var tiles = map.addTilesetImage("map_min", "tiles");

    // creating the layers
    var background = map.createStaticLayer("Map", tiles, 0, 0);
    var obstacles = map.createStaticLayer("Obstacles", tiles, 0, 0);

    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, "player", 6);
    this.zombies = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // player animation keys
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

    // zombie animation keys
    this.anims.create({
      key: "zleft",
      frames: this.anims.generateFrameNumbers("zombie", {
        frames: [9, 10, 11],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "zright",
      frames: this.anims.generateFrameNumbers("zombie", {
        frames: [3, 4, 5],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "zup",
      frames: this.anims.generateFrameNumbers("zombie", {
        frames: [6, 7, 8],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "zdown",
      frames: this.anims.generateFrameNumbers("zombie", {
        frames: [0, 1, 2],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on obstacles
    this.physics.add.collider(this.player, obstacles);
    this.physics.add.collider(this.zombies, obstacles);
    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    for (var i = 0; i < 1; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      // parameters are x, y, width, height
      let zombie = this.physics.add.sprite(x + 50, y + 100, "zombie", 1);
      this.zombies.add(zombie);
    }
    // add collider
    this.physics.add.collider(
      this.player,
      this.zombies,
      this.onTouchEnemy,
      false,
      this
    );
  }

  update(time, delta) {
    this.zombies.getChildren().forEach(function (zombie) {
      zombie.setScale(0.5);
      zombie.body.collideWorldBounds = true;
      var dx = this.player.x - zombie.x;
      var dy = this.player.y - zombie.y;
      var speed = 10;
      var angle = Math.atan2(dy, dx);
      var vx = Math.cos(angle) * speed;
      var vy = Math.sin(angle) * speed;
      zombie.body.setVelocity(vx, vy);

      if (vy < 0 && dx < 100 && dx > -100) {
        zombie.anims.play("zup", true);
      } else if (vy > 0 && dx < 100 && dx > -100) {
        zombie.anims.play("zdown", true);
      } else if (vx > 0) {
        zombie.anims.play("zright", true);
      } else if (vx < 0) {
        zombie.anims.play("zleft", true);
      }
    }, this);

    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }
  }
}
