// SPRITES
var hero;

// STUFF
var hVAngle = 0;
var capA = 250;
var capB = -200;
var step = 10;
var rotStep = 25;
var rotCap = 200
var removeStep2 = 5;
var removeStep = -5;

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

    // KEYBOARD
    m = game.input.keyboard.addKey(Phaser.Keyboard.M);
    m.onDown.add(function() {if(mute) {ArtRemix.play(lastBuffer);} else {ArtRemix.stop();}}, this);

    // APPEAR EFFECT
    game.add.tween(game.world).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);
  },

  update: function() {

    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      if (hero.body.angularVelocity > -rotCap)
        hero.body.angularVelocity -= rotStep;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      if (hero.body.angularVelocity < rotCap)
        hero.body.angularVelocity += rotStep;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      if (hVAngle < capA)
        hVAngle += step;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      if (hVAngle > capB)
        hVAngle -= step;
    }

    game.physics.arcade.velocityFromAngle(hero.angle, hVAngle, hero.body.velocity);
    if (hVAngle != 0)
      hVAngle += removeStep * hVAngle / Math.abs(hVAngle);
    if (hero.body.angularVelocity != 0)
      hero.body.angularVelocity -= removeStep2 * hero.body.angularVelocity / Math.abs(hero.body.angularVelocity);
  }

};
