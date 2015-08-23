// SPRITES
var biteEffect;

// MONSTERS
var hero;
var enemy1;

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

    // MUSIC PLAYBACK
    var buffer = game.cache.getBinary('cbt_xm');
    ArtRemix.play(buffer);

    // HERO
    hero = game.add.sprite(640, 360, 'hero');
    hero.anchor.set(0.5, 0.5);
    hero.angle = 90;
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    hero.body.collideWorldBounds = true;
    hero.life = 100;
    hero.justT = false;
    hero.emitter = game.add.emitter(hero.x, hero.y, 50);
    hero.emitter.makeParticles('part2');
    hero.emitter.gravity = 0;
    hero.emitter.minParticleSpeed.setTo(-100, -100);
    hero.emitter.maxParticleSpeed.setTo(100, 100);
    // BITE EFFECT
    hero.biteEffect = game.add.sprite(640, 360, 'effect');
    game.physics.enable(hero.biteEffect, Phaser.Physics.ARCADE);
    hero.biteEffect.scale.set(2);
    hero.biteEffect.smoothed = false;
    hero.biteEffect.anchor.set(0.5, 3);
    hero.biteEffect.visible = false;

    // ENEMY1
    enemy1 = game.add.sprite(Math.floor(Math.random() * 500), Math.floor(Math.random() * 650), 'hero');
    enemy1.tint = "0x888888";
    enemy1.anchor.set(0.5, 0.5);
    enemy1.angle = 90;
    game.physics.enable(enemy1, Phaser.Physics.ARCADE);
    enemy1.body.collideWorldBounds = true;
    enemy1.life = 100;
    enemy1.justT = false;
    enemy1.emitter = game.add.emitter(enemy1.x, enemy1.y, 50);
    enemy1.emitter.makeParticles('part2');
    enemy1.emitter.gravity = 0;
    enemy1.emitter.minParticleSpeed.setTo(-100, -100);
    enemy1.emitter.maxParticleSpeed.setTo(100, 100);



    // KEYBOARD
    m = game.input.keyboard.addKey(Phaser.Keyboard.M);
    m.onDown.add(function() {if(mute) {ArtRemix.play(lastBuffer);} else {ArtRemix.stop();}}, this);
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(function() {
      if (!hero.biteEffect.visible) {
        bite(hero);
      }
    }, this);

    // APPEAR EFFECT
    game.add.tween(game.world).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);
  },

  update: function() {

    hero.body.velocity.x = 0;
    hero.body.velocity.y = 0;
    hero.biteEffect.x = hero.x;
    hero.biteEffect.y = hero.y;

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
    if (Math.abs(hero.body.angularVelocity) <= Math.abs(removeStep))
      hero.body.angularVelocity = 0;

      hero.biteEffect.angle = hero.angle + 90;

  },

  render: function() {

    game.debug.inputInfo(32, 32);

  }

};

function bite(obj) {

  obj.biteEffect.visible = true;
  setTimeout(function () {
    obj.biteEffect.visible = false;
  }, 250);

  // console.log("xA = " + (obj.x + 32 * Math.cos((26.535 - obj.angle) * Math.PI / 180)) + " - yA = " + (obj.y - 32 * Math.sin((26.535 + obj.angle) * Math.PI / 180)));
  // console.log("xA' = " + (obj.x + 32 * Math.cos((-26.535 - obj.angle) * Math.PI / 180)) + " - yA' = " + (obj.y - 32 * Math.sin((-26.535 + obj.angle) * Math.PI / 180)));
  // console.log("xB = " + (obj.x + 48 * Math.cos((18.435 - obj.angle) * Math.PI / 180)) + " - yB = " + (obj.y - 48 * Math.sin((18.435 + obj.angle) * Math.PI / 180)));
  // console.log("xB' = " + (obj.x + 48 * Math.cos((-18.435 - obj.angle) * Math.PI / 180)) + " - yB' = " + (obj.y - 48 * Math.sin((-18.435 + obj.angle) * Math.PI / 180)));

  var boundA = [obj.x + 32 * Math.cos((26.535 - obj.angle) * Math.PI / 180), obj.y + 32 * Math.sin((26.535 + obj.angle) * Math.PI / 180)];
  var boundA_ = [obj.x + 32 * Math.cos((-26.535 - obj.angle) * Math.PI / 180), obj.y + 32 * Math.sin((-26.535 + obj.angle) * Math.PI / 180)];
  var boundB = [obj.x + 48 * Math.cos((18.435 - obj.angle) * Math.PI / 180), obj.y + 48 * Math.sin((18.435 + obj.angle) * Math.PI / 180)];
  var boundB_ = [obj.x + 48 * Math.cos((-18.435 - obj.angle) * Math.PI / 180), obj.y + 48 * Math.sin((-18.435 + obj.angle) * Math.PI / 180)];

  if (!enemy1.justT) {
    if ((boundA[0] < enemy1.x + 32 && boundA[0] > enemy1.x - 32 && boundA[1] < enemy1.y + 32 && boundA[1] > enemy1.y - 32)
    || (boundA_[0] < enemy1.x + 32 && boundA_[0] > enemy1.x - 32 && boundA_[1] < enemy1.y + 32 && boundA_[1] > enemy1.y - 32)
    || (boundB[0] < enemy1.x + 32 && boundB[0] > enemy1.x - 32 && boundB[1] < enemy1.y + 32 && boundB[1] > enemy1.y - 32)
    || (boundB_[0] < enemy1.x + 32 && boundB_[0] > enemy1.x - 32 && boundB_[1] < enemy1.y + 32 && boundB_[1] > enemy1.y - 32)) {

      console.log("OK");
      enemy1.tint -= "0x100000";
      enemy1.justT = true;
      enemy1.invul = setInterval(function() {
        enemy1.visible = !enemy1.visible;
      }, 200);
      setTimeout(function() {
        clearInterval(enemy1.invul);
        enemy1.visible = true;
        enemy1.justT = false;
      }, 1500);

    }
  }
}
