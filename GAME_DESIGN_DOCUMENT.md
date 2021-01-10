# Introduction

This is the basis of my work, where I wrote down what I planned for this project since the start of it. The project duration was 5 days and I plan to include more features like boss levels and weapons upgrade later down the line.

# Story

In this game, you play as a spaceship and your primary objective is to survive the army of war gunships. Just like in real life, you get one shot at this. This is an endless war so you have the opportunity to fight as long as you keep yourself alive. Dodging the incoming fire, you get the ability to shoot down as many enemies as you can. The player's score will increase by 10 points every time he destroys an enemy. The game is over when the player gets shot or collides with an enemy.

# Gameplay 

## Player

The player will control a fighter plane that can shoot lasers up at a normal speed. 
The player can:
- Move to the right, left, upwards, and downwards across the game's screen using arrow keys.
- Shoot enemies by pressing the Spacebar key.

![player_plane](./src/assets/player.png)


## Enemies

This is the description of each type of enemy's features:

- Gunship: Shoots lasers downward.

![gunship](./src/assets/enemy2.png)

- Simple enemy: Do not shoot lasers. But larger in size than gunships and have high collision probability.

![collider](./src/assets/enemy1.png)

## Attacks

The player can shoot down enemy spacecrafts by pressing the spacebar key.

# Developer's Notes

This project was developed in these stages:

- Stage 1: Learning how to use Phaser 3, following tutorials and how to setup a game's structure built with Javascript (1 day).
- Stage 2: Building this GDD (0.5 day).
- Stage 3: Creating the project's codes organizational structure (0.5 day).
- Stage 4: Creating the project's scenes (1 day)
- Stage 5: Creating the project's classes and tests (1 day).
- Stage 6: Testing the gameplay, fixing bugs and deployment (1 day).

# Making Of

This project was built using [Phaser 3](https://phaser.io/phaser3), [Webpack](https://webpack.js.org/) and Javascript.

# Acknowledgements

- This project was built during my course at [Microverse](https://www.microverse.org/), which is an amazing school where I learned how to program. Also, Microverse provided me with an [API](https://us-central1-js-capstone-backend.cloudfunctions.net/api/) to keep the player's scores.


- Thanks to [OpenGameArt](https://opengameart.org/) for providing the free assets I used in this game. 

- Thanks to [Canva](https://canva.com) where I designed the Play, Highscore and Main Menu buttons.
  ![play](./src/assets/playbtn.png) ![score](./src/assets/high-score.png) ![menu](./src/assets/backBtn.png)