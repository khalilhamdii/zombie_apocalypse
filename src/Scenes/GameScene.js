/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  fireBullet() {
    this.gun = 1;
    this.fireGun.play();
    this.time.addEvent({
      delay: 150,
      callback: () => {
        this.gun = 0;
      },
      callbackScope: this,
      loop: false,
    });

    const bullet = this.physics.add.sprite(
      this.player.x,
      this.player.y,
      'bullet',
    );
    bullet.setScale(0.3);
    const PointerAngle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.input.activePointer.worldX,
      this.input.activePointer.worldY,
    );

    const vx = Math.cos(PointerAngle) * this.bulletSpeed;
    const vy = Math.sin(PointerAngle) * this.bulletSpeed;
    bullet.body.setVelocity(vx, vy);
    this.bullets.add(bullet);
  }

  killZombie(bullet, zombie) {
    this.killedZombie.play();
    bullet.destroy(true, true);
    zombie.destroy(true, true);
    this.score += 1;
    this.zombieRemaining -= 1;
    this.scoreText.setText(`Zombie Killed : ${this.score}`);
    this.zombieText.setText(`Zombie remaining : ${this.zombieRemaining}`);
    if (this.zombieRemaining === 0) {
      this.zombieSounds.stop();
      this.spawnZombies();
      this.waveText.setText(`Wave : ${this.wave}`);
    }
  }

  onTouchEnemy(player) {
    this.physics.pause();
    this.sys.game.globals.score = this.score;
    player.setTint(0xff0000);
    this.heroDeath.play();
    this.zombieSounds.stop();
    this.bgMusic.stop();
    this.sys.game.globals.bgMusic.stop();
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.start('GameOver');
      },
      loop: false,
    });
  }

  killBullet(bullet) {
    bullet.destroy(true, true);
  }

  spawnZombies() {
    if (this.zombieRemaining === 0) {
      this.wave += 1;
      this.zombieNumber += 50;
      this.bulletSpeed += 100;
      this.zombieRemaining = this.zombieNumber;
      this.zombieSpeed += 5;
      this.infoText = this.add.text(
        16,
        16,
        `Wave ${this.wave} coming in 5 seconds! \n         GET READY `,
        {
          fontSize: '24px',
          fill: '#fff',
        },
      );
      this.infoText.depth = 10;
      this.time.addEvent({
        delay: 5000,
        callback: () => {
          this.infoText.depth = -1;
          this.zombieSounds.play();
          for (let i = 0; i < this.zombieNumber; i += 1) {
            let tmp = true;
            while (tmp) {
              tmp = false;
              const x = Phaser.Math.RND.between(
                0,
                this.physics.world.bounds.width,
              );
              const y = Phaser.Math.RND.between(
                0,
                this.physics.world.bounds.height,
              );
              const dx = this.player.x - x;
              const dy = this.player.y - y;
              if (dx > 200 || dy > 200 || dx < -200 || dy < -200) {
                const zombie = this.physics.add.sprite(x, y, 'zombie', 1);
                this.zombies.add(zombie);
                tmp = false;
              } else {
                tmp = true;
              }
            }
          }
        },
        loop: false,
      });
    }
  }

  create() {
    this.infoText;
    this.score = 0;
    this.wave = 0;
    this.zombieNumber = 0;
    this.zombieRemaining = 0;
    this.zombieSpeed = 5;
    this.bulletSpeed = 100;
    this.cameras.main.setZoom(2);
    this.gun = 0;
    this.fireGun = this.sound.add('fireGun', {
      volume: 0.2,
      loop: false,
    });
    this.killedZombie = this.sound.add('killedZombie');
    this.zombieSounds = this.sound.add('zombieSounds', {
      volume: 0.2,
      loop: true,
    });
    this.heroDeath = this.sound.add('heroDeath');
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
    this.bgMusic.play();
    // create the map
    const map = this.make.tilemap({ key: 'map' });

    // first parameter is the name of the tilemap in tiled
    const tiles = map.addTilesetImage('map_min', 'tiles');

    // creating the layers
    map.createStaticLayer('Map', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    // create player sprite + zombies and bullets groupes
    this.player = this.physics.add.sprite(50, 100, 'player', 6);
    this.zombies = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    this.bullets = this.add.group();
    // spawn zombies
    this.spawnZombies();
    //  animation with key 'left'
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // player animation keys
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [2, 8, 2, 14],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [0, 6, 0, 12],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // zombie animation keys
    this.anims.create({
      key: 'zleft',
      frames: this.anims.generateFrameNumbers('zombie', {
        frames: [9, 10, 11],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'zright',
      frames: this.anims.generateFrameNumbers('zombie', {
        frames: [3, 4, 5],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'zup',
      frames: this.anims.generateFrameNumbers('zombie', {
        frames: [6, 7, 8],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'zdown',
      frames: this.anims.generateFrameNumbers('zombie', {
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

    this.upBtn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.downBtn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.rightBtn = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D,
    );
    this.leftBtn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    // add collider
    this.physics.add.overlap(
      this.bullets,
      this.zombies,
      this.killZombie,
      null,
      this,
    );
    this.physics.add.collider(
      this.player,
      this.zombies,
      this.onTouchEnemy,
      false,
      this,
    );

    this.physics.add.collider(
      this.bullets,
      obstacles,
      this.killBullet,
      false,
      this,
    );
    // Score text
    this.scoreText = this.add.text(16, 16, `Zombie killed : ${this.wave}`, {
      fontSize: '24px',
      fill: '#fff',
    });
    this.zombieText = this.add.text(
      16,
      32,
      `Zombie remaining : ${this.zombieRemaining}`,
      {
        fontSize: '24px',
        fill: '#fff',
      },
    );
    this.waveText = this.add.text(16, 48, `Wave : ${this.wave}`, {
      fontSize: '24px',
      fill: '#fff',
    });
    this.scoreText.depth = 1000;
    this.zombieText.depth = 1000;
    this.waveText.depth = 1000;
  }

  update() {
    this.scoreText.x = 16 + this.cameras.main.worldView.left;
    this.scoreText.y = 16 + this.cameras.main.worldView.top;
    this.scoreText.setScale(0.5);
    this.zombieText.x = 16 + this.cameras.main.worldView.left;
    this.zombieText.y = 32 + this.cameras.main.worldView.top;
    this.zombieText.setScale(0.5);
    this.waveText.x = 16 + this.cameras.main.worldView.left;
    this.waveText.y = 48 + this.cameras.main.worldView.top;
    this.waveText.setScale(0.5);
    this.infoText.x = 100 + this.cameras.main.worldView.left;
    this.infoText.y = 100 + this.cameras.main.worldView.top;
    this.infoText.setScale(0.5);

    this.zombies.getChildren().forEach((zombie) => {
      zombie.setScale(0.5);
      zombie.body.collideWorldBounds = true;
      const dx = this.player.x - zombie.x;
      const dy = this.player.y - zombie.y;
      const angle = Math.atan2(dy, dx);
      const vx = Math.cos(angle) * this.zombieSpeed;
      const vy = Math.sin(angle) * this.zombieSpeed;
      zombie.body.setVelocity(vx, vy);

      if (vy < 0 && dx < 50 && dx > -50) {
        zombie.anims.play('zup', true);
      } else if (vy > 0 && dx < 50 && dx > -50) {
        zombie.anims.play('zdown', true);
      } else if (vx > 0) {
        zombie.anims.play('zright', true);
      } else if (vx < 0) {
        zombie.anims.play('zleft', true);
      }
    }, this);

    this.player.body.setVelocity(0);

    if (this.input.activePointer.isDown && this.gun === 0) {
      this.fireBullet();
    }
    if (this.leftBtn.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.rightBtn.isDown) {
      this.player.body.setVelocityX(80);
    }

    if (this.upBtn.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.downBtn.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.leftBtn.isDown) {
      this.player.anims.play('left', true);
      this.player.flipX = true;
    } else if (this.rightBtn.isDown) {
      this.player.anims.play('right', true);
      this.player.flipX = false;
    } else if (this.upBtn.isDown) {
      this.player.anims.play('up', true);
    } else if (this.downBtn.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
}
