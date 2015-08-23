// SPRITES
var hero;
var enemy1;
var biteEffect;

// STUFF
var hVAngle = 0;
var capA = 250;
var capB = -200;
var step = 10;
var rotStep = 25;
var rotCap = 200
var removeStep2 = 9;
var removeStep = -3;
var m, space;

var playState = {

  create: function() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // HERO
    hero = game.add.sprite(640, 360, 'hero');
    hero.anchor.set(0.5, 0.5);
    hero.angle = 90;
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    hero.body.collideWorldBounds = true;

    // ENEMY1
    enemy1 = game.add.sprite(Math.floor(Math.random() * 500), Math.floor(Math.random() * 650), 'hero');
    enemy1.tint = "0x888888";
    enemy1.anchor.set(0.5, 0.5);
    enemy1.angle = 90;
    game.physics.enable(enemy1, Phaser.Physics.ARCADE);
    enemy1.body.collideWorldBounds = true;

    // BITE EFFECT
    biteEffect = game.add.sprite(640, 360, 'effect');
    game.physics.enable(biteEffect, Phaser.Physics.ARCADE);
    biteEffect.scale.set(2);
    biteEffect.smoothed = false;
    biteEffect.anchor.set(0.5, 3);
    biteEffect.visible = false;

    // KEYBOARD
    m = game.input.keyboard.addKey(Phaser.Keyboard.M);
    m.onDown.add(function() {if(mute) {ArtRemix.play(lastBuffer);} else {ArtRemix.stop();}}, this);
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(function() {
      if (!biteEffect.visible) {
        biteEffect.visible = true;
        setTimeout(function () {
          biteEffect.visible = false;
        }, 250);
      }
    }, this);

    // APPEAR EFFECT
    game.add.tween(game.world).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);
  },

  update: function() {

    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    biteEffect.x = hero.x;
    biteEffect.y = hero.y;

    game.physics.arcade.collide(hero, enemy1);

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

      biteEffect.angle = hero.angle + 90;

  }

};
