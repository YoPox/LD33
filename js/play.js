// SPRITES
var hero;

// STUFF
var hVAngle = 0;

var playState = {

  create: function() {

    console.log(piece1);
    console.log(piece2);
    console.log(piece3);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // HERO
    hero = game.add.sprite(640, 360, 'hero');
    hero.anchor.set(0.5, 0.5);
    hero.angle = 90;
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    hero.body.collideWorldBounds = true;

    // APPEAR EFFECT
    game.add.tween(game.world).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);
  },

  update: function() {

    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    hero.body.angularVelocity = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      hero.body.angularVelocity = -200;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      hero.body.angularVelocity = 200;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      if (hVAngle < 250)
        hVAngle += 10;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      if (hVAngle > -250)
        hVAngle -= 10;
    }

    game.physics.arcade.velocityFromAngle(hero.angle, hVAngle, hero.body.velocity);
    if (hVAngle != 0)
      hVAngle += -5 * hVAngle / Math.abs(hVAngle);
  }

};
