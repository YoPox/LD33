// MONSTERS
var hero;
var enemy1;
var enemy2;
var enemy3;

var bg;
var countdown;

// STUFF
var rotStep = 25;
var rotCap = 200
var removeStep2 = 9;
var removeStep = -3;
var m, c, v, b;
var spitSpeed = 400;
var jawDamage = 30;
var spitDamage = 10;
var bombDamage = 40;
var hornDamage = 10;
var bombAniSpeed = 100;
var startGame = false;

var playState = {

  create: function() {

    // MUSIC PLAYBACK
    var buffer = game.cache.getBinary('cbt_xm');
    ArtRemix.play(buffer);

    bg = game.add.sprite(0, 0, "sand");
    bg.scale.set(4);
    bg.smoothed = false;

    var heroPosition = Math.floor(Math.random() * 4);

    switch (heroPosition) {
      case 0:
        hero = game.add.sprite(128, 128, 'hero');
        hero.angle = 45;
        enemy1 = game.add.sprite(1152, 128, 'hero');
        enemy1.angle = 135;
        enemy2 = game.add.sprite(128, 592, 'hero');
        enemy2.angle = -45;
        enemy3 = game.add.sprite(1152, 592, 'hero');
        enemy3.angle = -135;
        break;
      case 1:
        hero = game.add.sprite(1152, 128, 'hero');
        hero.angle = 135;
        enemy1 = game.add.sprite(128, 128, 'hero');
        enemy1.angle = 45;
        enemy2 = game.add.sprite(128, 592, 'hero');
        enemy2.angle = -45;
        enemy3 = game.add.sprite(1152, 592, 'hero');
        enemy3.angle = -135;
        break;
      case 2:
        hero = game.add.sprite(128, 592, 'hero');
        hero.angle = -45;
        enemy1 = game.add.sprite(1152, 128, 'hero');
        enemy1.angle = 135;
        enemy2 = game.add.sprite(128, 128, 'hero');
        enemy2.angle = 45;
        enemy3 = game.add.sprite(1152, 592, 'hero');
        enemy3.angle = -135;
        break;
      case 3:
        hero = game.add.sprite(1152, 592, 'hero');
        hero.angle = -135;
        enemy1 = game.add.sprite(1152, 128, 'hero');
        enemy1.angle = 135;
        enemy2 = game.add.sprite(128, 592, 'hero');
        enemy2.angle = -45;
        enemy3 = game.add.sprite(128, 128, 'hero');
        enemy3.angle = 45;
        break;
    }

    initCapacities(hero);
    makeParts(hero, piece1, piece2, piece3);
    hero.id = "hero";

    initCapacities(enemy1);
    makeParts(enemy1, Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4));
    enemy1.id = "enemy1";

    initCapacities(enemy2);
    makeParts(enemy2, Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4));
    enemy2.id = "enemy2";

    initCapacities(enemy3);
    makeParts(enemy3, Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4));
    enemy3.id = "enemy3";

    // KEYBOARD
    m = game.input.keyboard.addKey(Phaser.Keyboard.M);
    m.onDown.add(function() {if(mute) {ArtRemix.play(lastBuffer);} else {ArtRemix.stop();}}, this);
    c = game.input.keyboard.addKey(Phaser.Keyboard.C);
    c.onDown.add(function() {
      switch (hero.part1) {
        case 0:
          if (hero.canBite)
            bite(hero);
          break;
        case 2:
          if (hero.canSpit)
            spit(hero);
          break;
        case 3:
          if (hero.canBomb)
            bomb(hero);
          break;
      }

    }, this);
    v = game.input.keyboard.addKey(Phaser.Keyboard.V);
    v.onDown.add(function() {
      switch (hero.part2) {
        case 3:
          if (hero.canShock)
            shocker(hero);
          break;
      }

    }, this);
    b = game.input.keyboard.addKey(Phaser.Keyboard.B);
    b.onDown.add(function() {
      switch (hero.part3) {
        case 2:
          if (hero.canSprint)
            sprint(hero);
          break;
        case 3:
          if (hero.canDash)
            dash(hero);
          break;
      }

    }, this);

    // APPEAR EFFECT
    game.add.tween(game.world).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);

    // COUNTDOWN
    countdown = game.add.sprite(640, 360, "countdown", 2);
    countdown.scale.set(2);
    countdown.anchor.set(0.5);
    countdown.smoothed = false;
    countdown.alpha = 0;
    // 3
    setTimeout(function () {
      game.add.tween(countdown).to( { alpha: 1 }, 500, Phaser.Easing.Exponential.InOut, true);
    }, 1500);
    setTimeout(function () {
      game.add.tween(countdown).to( { alpha: 0 }, 500, Phaser.Easing.Exponential.InOut, true);
    }, 2000);
    // 2
    setTimeout(function () {
      countdown.frame = 1;
      game.add.tween(countdown).to( { alpha: 1 }, 500, Phaser.Easing.Exponential.InOut, true);
    }, 2500);
    setTimeout(function () {
      game.add.tween(countdown).to( { alpha: 0 }, 500, Phaser.Easing.Exponential.InOut, true);
    }, 3000);
    // 1
    setTimeout(function () {
      countdown.frame = 0;
      game.add.tween(countdown).to( { alpha: 1 }, 500, Phaser.Easing.Exponential.InOut, true);
    }, 3500);
    setTimeout(function () {
      game.add.tween(countdown).to( { alpha: 0 }, 500, Phaser.Easing.Exponential.InOut, true);
    }, 4000);

    setTimeout(function () {
      countdown.destroy();
      startGame = true;
      doIA(enemy1);
      doIA(enemy2);
      doIA(enemy3);
    }, 4500);

  },

  update: function() {

    if (startGame) {

      // UPDATE POS VALUES
      hero.body.velocity.x = 0;
      hero.body.velocity.y = 0;
      // EMITTERS
      hero.emitter.x = hero.x;
      hero.emitter.y = hero.y;
      enemy1.emitter.x = enemy1.x;
      enemy1.emitter.y = enemy1.y;
      enemy2.emitter.x = enemy2.x;
      enemy2.emitter.y = enemy2.y;
      enemy3.emitter.x = enemy3.x;
      enemy3.emitter.y = enemy3.y;

      // MOUTH
      hero.mouth.angle = hero.angle;
      hero.mouth.x = hero.x + (32 + (6 / (1 + Math.exp(-0.015 * hero.hVAngle)) - 3)) * Math.cos(hero.angle * Math.PI / 180);
      hero.mouth.y = hero.y + (32 + (6 / (1 + Math.exp(-0.015 * hero.hVAngle)) - 3)) * Math.sin(hero.angle * Math.PI / 180);
      enemy1.mouth.angle = enemy1.angle;
      enemy1.mouth.x = enemy1.x + (32 + (4 / (1 + Math.exp(-0.02 * enemy1.hVAngle)) - 2)) * Math.cos(enemy1.angle * Math.PI / 180);
      enemy1.mouth.y = enemy1.y + (32 + (4 / (1 + Math.exp(-0.02 * enemy1.hVAngle)) - 2)) * Math.sin(enemy1.angle * Math.PI / 180);
      enemy2.mouth.angle = enemy2.angle;
      enemy2.mouth.x = enemy2.x + (32 + (4 / (1 + Math.exp(-0.02 * enemy2.hVAngle)) - 2)) * Math.cos(enemy2.angle * Math.PI / 180);
      enemy2.mouth.y = enemy2.y + (32 + (4 / (1 + Math.exp(-0.02 * enemy2.hVAngle)) - 2)) * Math.sin(enemy2.angle * Math.PI / 180);
      enemy3.mouth.angle = enemy3.angle;
      enemy3.mouth.x = enemy3.x + (32 + (4 / (1 + Math.exp(-0.02 * enemy3.hVAngle)) - 2)) * Math.cos(enemy3.angle * Math.PI / 180);
      enemy3.mouth.y = enemy3.y + (32 + (4 / (1 + Math.exp(-0.02 * enemy3.hVAngle)) - 2)) * Math.sin(enemy3.angle * Math.PI / 180);

      hero.legs.angle = hero.angle;
      hero.legs.x = hero.x;
      hero.legs.y = hero.y;
      enemy1.legs.angle = enemy1.angle;
      enemy1.legs.x = enemy1.x;
      enemy1.legs.y = enemy1.y;
      enemy2.legs.angle = enemy2.angle;
      enemy2.legs.x = enemy2.x;
      enemy2.legs.y = enemy2.y;
      enemy3.legs.angle = enemy3.angle;
      enemy3.legs.x = enemy3.x;
      enemy3.legs.y = enemy3.y;

      // COLLISIONS
      game.physics.arcade.collide(hero, [enemy1, enemy2, enemy3]);
      game.physics.arcade.collide(enemy1, [hero, enemy2, enemy3]);
      game.physics.arcade.collide(enemy2, [enemy1, hero, enemy3]);
      game.physics.arcade.collide(enemy3, [enemy1, enemy2, hero]);
      game.physics.arcade.collide([hero, enemy1, enemy2, enemy3], [hero.bomb, enemy1.bomb, enemy2.bomb, enemy3.bomb]);
      game.physics.arcade.overlap(hero.spits, [enemy1, enemy2, enemy3], spitHit, null, this);
      game.physics.arcade.overlap(enemy1.spits, [hero, enemy2, enemy3], spitHit, null, this);
      game.physics.arcade.overlap(enemy2.spits, [enemy1, hero, enemy3], spitHit, null, this);
      game.physics.arcade.overlap(enemy3.spits, [enemy1, enemy2, hero], spitHit, null, this);

      // PLAYER CONTROLS
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        if (hero.body.angularVelocity > -rotCap)
          hero.body.angularVelocity -= rotStep;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        if (hero.body.angularVelocity < rotCap)
          hero.body.angularVelocity += rotStep;
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        if (hero.hVAngle < hero.capA)
          hero.hVAngle += hero.step;
        hero.legs.animations.play("walk", 6, true);
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        if (hero.hVAngle > hero.capB)
          hero.hVAngle -= hero.step;
        hero.legs.animations.play("walk", 6, true);
      }

      // HORNS
      if (hero.hornHitbox) {
        var hornX = hero.x + 96 * Math.cos(hero.angle * Math.PI / 180);
        var hornY = hero.y + 96 * Math.sin(hero.angle * Math.PI / 180);
        if (!enemy1.justT) {
          if (hornX < enemy1.x + 32 && hornX > enemy1.x - 32 && hornY < enemy1.y + 32 && hornY > enemy1.y - 32) {
            damage(enemy1, hornDamage);
          }
        }
        if (!enemy2.justT) {
          if (hornX < enemy2.x + 32 && hornX > enemy2.x - 32 && hornY < enemy2.y + 32 && hornY > enemy2.y - 32) {
            damage(enemy2, hornDamage);
          }
        }
        if (!enemy3.justT) {
          if (hornX < enemy3.x + 32 && hornX > enemy3.x - 32 && hornY < enemy3.y + 32 && hornY > enemy3.y - 32) {
            damage(enemy3, hornDamage);
          }
        }
      }
      if (enemy1.hornHitbox) {
        var hornX = enemy1.x + 96 * Math.cos(enemy1.angle * Math.PI / 180);
        var hornY = enemy1.y + 96 * Math.sin(enemy1.angle * Math.PI / 180);
        if (!hero.justT) {
          if (hornX < hero.x + 32 && hornX > hero.x - 32 && hornY < hero.y + 32 && hornY > hero.y - 32) {
            damage(hero, hornDamage);
          }
        }
        if (!enemy2.justT) {
          if (hornX < enemy2.x + 32 && hornX > enemy2.x - 32 && hornY < enemy2.y + 32 && hornY > enemy2.y - 32) {
            damage(enemy2, hornDamage);
          }
        }
        if (!enemy3.justT) {
          if (hornX < enemy3.x + 32 && hornX > enemy3.x - 32 && hornY < enemy3.y + 32 && hornY > enemy3.y - 32) {
            damage(enemy3, hornDamage);
          }
        }
      }
      if (enemy2.hornHitbox) {
        var hornX = enemy2.x + 96 * Math.cos(enemy2.angle * Math.PI / 180);
        var hornY = enemy2.y + 96 * Math.sin(enemy2.angle * Math.PI / 180);
        if (!hero.justT) {
          if (hornX < hero.x + 32 && hornX > hero.x - 32 && hornY < hero.y + 32 && hornY > hero.y - 32) {
            damage(hero, hornDamage);
          }
        }
        if (!enemy1.justT) {
          if (hornX < enemy1.x + 32 && hornX > enemy1.x - 32 && hornY < enemy1.y + 32 && hornY > enemy1.y - 32) {
            damage(enemy1, hornDamage);
          }
        }
        if (!enemy3.justT) {
          if (hornX < enemy3.x + 32 && hornX > enemy3.x - 32 && hornY < enemy3.y + 32 && hornY > enemy3.y - 32) {
            damage(enemy3, hornDamage);
          }
        }
      }
      if (enemy3.hornHitbox) {
        var hornX = enemy3.x + 96 * Math.cos(enemy3.angle * Math.PI / 180);
        var hornY = enemy3.y + 96 * Math.sin(enemy3.angle * Math.PI / 180);
        if (!hero.justT) {
          if (hornX < hero.x + 32 && hornX > hero.x - 32 && hornY < hero.y + 32 && hornY > hero.y - 32) {
            damage(hero, hornDamage);
          }
        }
        if (!enemy1.justT) {
          if (hornX < enemy1.x + 32 && hornX > enemy1.x - 32 && hornY < enemy1.y + 32 && hornY > enemy1.y - 32) {
            damage(enemy1, hornDamage);
          }
        }
        if (!enemy2.justT) {
          if (hornX < enemy2.x + 32 && hornX > enemy2.x - 32 && hornY < enemy2.y + 32 && hornY > enemy2.y - 32) {
            damage(enemy2, hornDamage);
          }
        }
      }

      // MOVEMENTS
      game.physics.arcade.velocityFromAngle(hero.angle, hero.hVAngle, hero.body.velocity);
      game.physics.arcade.velocityFromAngle(enemy1.angle, enemy1.hVAngle, enemy1.body.velocity);
      game.physics.arcade.velocityFromAngle(enemy2.angle, enemy2.hVAngle, enemy2.body.velocity);
      game.physics.arcade.velocityFromAngle(enemy3.angle, enemy3.hVAngle, enemy3.body.velocity);

      hero.spits.forEachAlive(function(p){
    		game.physics.arcade.velocityFromAngle(p.angle, p._speed, p.body.velocity);
    	});
      enemy1.spits.forEachAlive(function(p){
    		game.physics.arcade.velocityFromAngle(p.angle, p._speed, p.body.velocity);
    	});
      enemy2.spits.forEachAlive(function(p){
    		game.physics.arcade.velocityFromAngle(p.angle, p._speed, p.body.velocity);
    	});
      enemy3.spits.forEachAlive(function(p){
    		game.physics.arcade.velocityFromAngle(p.angle, p._speed, p.body.velocity);
    	});
      if (hero.hasBomb) {
        game.physics.arcade.velocityFromAngle(hero.bomb.angle, hero.bomb.speed, hero.bomb.body.velocity);
        hero.bomb.speed -= 1;
        if (hero.bomb.speed < 0) {
          hero.bomb.speed = 0;
        }
      }
      if (enemy1.hasBomb) {
        game.physics.arcade.velocityFromAngle(enemy1.bomb.angle, enemy1.bomb.speed, enemy1.bomb.body.velocity);
        enemy1.bomb.speed -= 1;
        if (enemy1.bomb.speed < 0) {
          enemy1.bomb.speed = 0;
        }
      }
      if (enemy2.hasBomb) {
        game.physics.arcade.velocityFromAngle(enemy2.bomb.angle, enemy2.bomb.speed, enemy2.bomb.body.velocity);
        enemy2.bomb.speed -= 1;
        if (enemy2.bomb.speed < 0) {
          enemy2.bomb.speed = 0;
        }
      }
      if (enemy3.hasBomb) {
        game.physics.arcade.velocityFromAngle(enemy3.bomb.angle, enemy3.bomb.speed, enemy3.bomb.body.velocity);
        enemy3.bomb.speed -= 1;
        if (enemy3.bomb.speed < 0) {
          enemy3.bomb.speed = 0;
        }
      }

      // CHECKS
      if (hero.hVAngle != 0)
        hero.hVAngle += removeStep * hero.hVAngle / Math.abs(hero.hVAngle);
      if (enemy1.hVAngle != 0)
        enemy1.hVAngle += removeStep * enemy1.hVAngle / Math.abs(enemy1.hVAngle);
      if (enemy2.hVAngle != 0)
        enemy2.hVAngle += removeStep * enemy2.hVAngle / Math.abs(enemy2.hVAngle);
      if (enemy3.hVAngle != 0)
        enemy3.hVAngle += removeStep * enemy3.hVAngle / Math.abs(enemy3.hVAngle);

      if (Math.abs(hero.hVAngle) < 15)
        hero.legs.animations.stop();
      if (Math.abs(enemy1.hVAngle) < 15)
        enemy1.legs.animations.stop();
      if (Math.abs(enemy2.hVAngle) < 15)
        enemy2.legs.animations.stop();
      if (Math.abs(enemy3.hVAngle) < 15)
        enemy3.legs.animations.stop();

      if (hero.body.angularVelocity != 0)
        hero.body.angularVelocity -= removeStep2 * hero.body.angularVelocity / Math.abs(hero.body.angularVelocity);
      if (Math.abs(hero.body.angularVelocity) <= Math.abs(removeStep))
        hero.body.angularVelocity = 0;
      if (enemy1.body.angularVelocity != 0)
        enemy1.body.angularVelocity -= removeStep2 * enemy1.body.angularVelocity / Math.abs(enemy1.body.angularVelocity);
      if (Math.abs(enemy1.body.angularVelocity) <= Math.abs(removeStep))
        enemy1.body.angularVelocity = 0;
      if (enemy2.body.angularVelocity != 0)
        enemy2.body.angularVelocity -= removeStep2 * enemy2.body.angularVelocity / Math.abs(enemy2.body.angularVelocity);
      if (Math.abs(enemy2.body.angularVelocity) <= Math.abs(removeStep))
        enemy2.body.angularVelocity = 0;
      if (enemy3.body.angularVelocity != 0)
        enemy3.body.angularVelocity -= removeStep2 * enemy3.body.angularVelocity / Math.abs(enemy3.body.angularVelocity);
      if (Math.abs(enemy3.body.angularVelocity) <= Math.abs(removeStep))
        enemy3.body.angularVelocity = 0;

      // PARTICLES FADE OUT EFFECT
      hero.emitter.forEachAlive(function(p){
    		p.alpha = p.lifespan / hero.emitter.lifespan;
    	});
      enemy1.emitter.forEachAlive(function(p){
    		p.alpha = p.lifespan / enemy1.emitter.lifespan;
    	});
      enemy2.emitter.forEachAlive(function(p){
    		p.alpha = p.lifespan / enemy2.emitter.lifespan;
    	});
      enemy3.emitter.forEachAlive(function(p){
    		p.alpha = p.lifespan / enemy3.emitter.lifespan;
    	});
      hero.shocker.forEachAlive(function(p){
    		p.alpha = p.lifespan / hero.emitter.lifespan;
    	});
      enemy1.shocker.forEachAlive(function(p){
    		p.alpha = p.lifespan / enemy1.emitter.lifespan;
    	});
      enemy2.shocker.forEachAlive(function(p){
    		p.alpha = p.lifespan / enemy2.emitter.lifespan;
    	});
      enemy3.shocker.forEachAlive(function(p){
    		p.alpha = p.lifespan / enemy3.emitter.lifespan;
    	});

    }

  },

  render: function() {

    // game.debug.inputInfo(32, 32);
    // game.debug.body(hero);

  }

};

function initCapacities(obj) {

  // GENERAL
  obj.anchor.set(0.5, 0.5);
  game.physics.enable(obj, Phaser.Physics.ARCADE);
  obj.body.collideWorldBounds = true;
  obj.life = 100;
  obj.justT = false;
  obj.emitter = game.add.emitter(obj.x, obj.y, 50);
  obj.emitter.makeParticles('part3');
  obj.emitter.gravity = 0;
  obj.emitter.minParticleSpeed.setTo(-74, -74);
  obj.emitter.maxParticleSpeed.setTo(74, 74);
  obj.hVAngle = 0;

  // BITE EFFECT
  obj.canBite = true;

  // SPIT
  obj.canSpit = true;
  obj.spits = game.add.group();

  // BOMB
  obj.canBomb = true;
  obj.hasBomb = false;

  // HORN
  obj.hornHitbox = false;

  // THORNY
  obj.hitSides = false;

  // SHOCKER
  obj.canShock = true;
  obj.shocker = game.add.emitter(obj.x, obj.y, 50);
  obj.shocker.makeParticles('part4');
  obj.shocker.gravity = 0;
  obj.shocker.minParticleSpeed.setTo(-100, -100);
  obj.shocker.maxParticleSpeed.setTo(100, 100);

  // DASH
  obj.canDash = true;

  // SPRINT
  obj.canSprint = true;
  obj.capA = 250;
  obj.capB = -200;
  obj.step = 10;
}

function bite(obj) {
  audio_morsure.play();
  obj.canBite = false;
  obj.mouth.frame = 1;
  setTimeout(function () {
    obj.mouth.frame = 2;
  }, 50);
  setTimeout(function () {
    obj.mouth.frame = 1;
  }, 200);
  setTimeout(function () {
    obj.mouth.frame = 0;
    obj.canBite = true;
  }, 250);

  var boundA = [obj.x + 32 * Math.cos((26.535 - obj.angle) * Math.PI / 180), obj.y + 32 * Math.sin((26.535 + obj.angle) * Math.PI / 180)];
  var boundA_ = [obj.x + 32 * Math.cos((-26.535 - obj.angle) * Math.PI / 180), obj.y + 32 * Math.sin((-26.535 + obj.angle) * Math.PI / 180)];
  var boundB = [obj.x + 48 * Math.cos((18.435 - obj.angle) * Math.PI / 180), obj.y + 48 * Math.sin((18.435 + obj.angle) * Math.PI / 180)];
  var boundB_ = [obj.x + 48 * Math.cos((-18.435 - obj.angle) * Math.PI / 180), obj.y + 48 * Math.sin((-18.435 + obj.angle) * Math.PI / 180)];

  if (!enemy1.justT && obj.id != enemy1.id) {
    if ((boundA[0] < enemy1.x + 32 && boundA[0] > enemy1.x - 32 && boundA[1] < enemy1.y + 32 && boundA[1] > enemy1.y - 32)
    || (boundA_[0] < enemy1.x + 32 && boundA_[0] > enemy1.x - 32 && boundA_[1] < enemy1.y + 32 && boundA_[1] > enemy1.y - 32)
    || (boundB[0] < enemy1.x + 32 && boundB[0] > enemy1.x - 32 && boundB[1] < enemy1.y + 32 && boundB[1] > enemy1.y - 32)
    || (boundB_[0] < enemy1.x + 32 && boundB_[0] > enemy1.x - 32 && boundB_[1] < enemy1.y + 32 && boundB_[1] > enemy1.y - 32)) {

      damage(enemy1, jawDamage);

    }
  }
  if (!enemy2.justT && obj.id != enemy2.id) {
    if ((boundA[0] < enemy2.x + 32 && boundA[0] > enemy2.x - 32 && boundA[1] < enemy2.y + 32 && boundA[1] > enemy2.y - 32)
    || (boundA_[0] < enemy2.x + 32 && boundA_[0] > enemy2.x - 32 && boundA_[1] < enemy2.y + 32 && boundA_[1] > enemy2.y - 32)
    || (boundB[0] < enemy2.x + 32 && boundB[0] > enemy2.x - 32 && boundB[1] < enemy2.y + 32 && boundB[1] > enemy2.y - 32)
    || (boundB_[0] < enemy2.x + 32 && boundB_[0] > enemy2.x - 32 && boundB_[1] < enemy2.y + 32 && boundB_[1] > enemy2.y - 32)) {

      damage(enemy2, jawDamage);

    }
  }
  if (!enemy3.justT && obj.id != enemy3.id) {
    if ((boundA[0] < enemy3.x + 32 && boundA[0] > enemy3.x - 32 && boundA[1] < enemy3.y + 32 && boundA[1] > enemy3.y - 32)
    || (boundA_[0] < enemy3.x + 32 && boundA_[0] > enemy3.x - 32 && boundA_[1] < enemy3.y + 32 && boundA_[1] > enemy3.y - 32)
    || (boundB[0] < enemy3.x + 32 && boundB[0] > enemy3.x - 32 && boundB[1] < enemy3.y + 32 && boundB[1] > enemy3.y - 32)
    || (boundB_[0] < enemy3.x + 32 && boundB_[0] > enemy3.x - 32 && boundB_[1] < enemy3.y + 32 && boundB_[1] > enemy3.y - 32)) {

      damage(enemy3, jawDamage);

    }
  }
  if (!hero.justT && obj.id != hero.id) {
    if ((boundA[0] < hero.x + 32 && boundA[0] > hero.x - 32 && boundA[1] < hero.y + 32 && boundA[1] > hero.y - 32)
    || (boundA_[0] < hero.x + 32 && boundA_[0] > hero.x - 32 && boundA_[1] < hero.y + 32 && boundA_[1] > hero.y - 32)
    || (boundB[0] < hero.x + 32 && boundB[0] > hero.x - 32 && boundB[1] < hero.y + 32 && boundB[1] > hero.y - 32)
    || (boundB_[0] < hero.x + 32 && boundB_[0] > hero.x - 32 && boundB_[1] < hero.y + 32 && boundB_[1] > hero.y - 32)) {

      damage(hero, jawDamage);

    }
  }
}

function spit(obj) {
  obj.canSpit = false;
  setTimeout(function () {
    obj.canSpit = true;
  }, spitSpeed);
  var item = game.add.sprite(obj.x + 58 * Math.cos(obj.angle * Math.PI / 180), obj.y + 58 * Math.sin(obj.angle * Math.PI / 180), 'spit', 0);
  item.anchor.setTo(0.5, 0.5);
  game.physics.enable(item, Phaser.Physics.ARCADE);
  item.angle = obj.angle;
  item.smoothed = false;
  item._speed = 400;
  obj.mouth.frame = 1;
  setTimeout(function () {
    obj.mouth.frame = 0;
  }, 200);
  item.animations.add('a', [0, 1, 2, 3, 4, 5, 6]);
  item.animations.play('a', 25, true);
  game.add.tween(item).to( { width: 64 }, 250, Phaser.Easing.Exponential.OutIn, true);
  game.add.tween(item).to( { height: 64 }, 250, Phaser.Easing.Exponential.OutIn, true);
  setTimeout(function () {
    game.add.tween(item).to( { width: 0 }, 1000, Phaser.Easing.Exponential.OutIn, true);
    game.add.tween(item).to( { height: 0 }, 1000, Phaser.Easing.Exponential.OutIn, true);
  }, 250);
  setTimeout(function () {
    if (item) item.destroy();
  }, 1250);
  // game.add.tween(item).to( { angle: Math.random() * 30 + 30 }, Math.random() * 2000 + 750, Phaser.Easing.Quadratic.OutIn, true);
  obj.spits.add(item);
}

function spitHit(obj1, obj2) {
  audio_degat.play();
  if (!obj1.justT) {
    game.add.tween(obj2).to( { alpha: 0 }, 250, Phaser.Easing.Exponential.InOut, true);
    setTimeout(function () {
      obj2.destroy();
    }, 250);
    damage(obj1, spitDamage);
  }
}

function bomb(obj) {
  obj.canBomb = false;
  obj.hasBomb = true;
  setTimeout(function () {
    obj.canBomb = true;
  }, 5000);
  obj.bomb = game.add.sprite(obj.x + 40 * Math.cos(obj.angle * Math.PI / 180), obj.y + 40 * Math.sin(obj.angle * Math.PI / 180), 'bomb');
  obj.bomb.anchor.setTo(0.5, 0.5);
  game.physics.enable(obj.bomb, Phaser.Physics.ARCADE);
  obj.bomb.angle = obj.angle;
  obj.bomb.smoothed = false;
  game.add.tween(obj.bomb).to( { width: 48 }, 2800, Phaser.Easing.Exponential.OutIn, true);
  game.add.tween(obj.bomb).to( { height: 48 }, 2800, Phaser.Easing.Exponential.OutIn, true);
  obj.bomb.intSpeed = 300;
  obj.bomb.speed = 200;
  obj.bomb.stop = false;
  obj.bomb.body.collideWorldBounds = true;
  obj.bomb.animations.add('explode', [0, 1, 2, 3, 4]);
  obj.mouth.frame = 1;
  setTimeout(function () {
    obj.mouth.frame = 0;
  }, 300);
  setTimeout(function () {
    bombCallback(obj.bomb);
  }, 300);
  setTimeout(function () {
    obj.bomb.animations.play('explode', bombAniSpeed, false);
    setTimeout(function () {
      obj.hasBomb = false;
      obj.bomb.stop = true;
      clearInterval(obj.bomb.before);
      obj.bomb.destroy();
      bombExplode(obj.bomb.x, obj.bomb.y);
    }, 200);
  }, 2800);
}

function bombExplode(x, y) {
  audio_explosion.play();
  if (!enemy1.justT) {
    if (Math.sqrt((x - enemy1.x)*(x - enemy1.x) + (y - enemy1.y)*(y - enemy1.y)) < 100) {
      damage(enemy1, bombDamage);
    }
  }
  if (!enemy2.justT) {
    if (Math.sqrt((x - enemy2.x)*(x - enemy2.x) + (y - enemy2.y)*(y - enemy2.y)) < 100) {
      damage(enemy2, bombDamage);
    }
  }
  if (!enemy3.justT) {
    if (Math.sqrt((x - enemy3.x)*(x - enemy3.x) + (y - enemy3.y)*(y - enemy3.y)) < 100) {
      damage(enemy3, bombDamage);
    }
  }
  if (!hero.justT) {
    if (Math.sqrt((x - hero.x)*(x - hero.x) + (y - hero.y)*(y - hero.y)) < 100) {
      damage(hero, bombDamage);
    }
  }
}

function bombCallback(bomb) {
  bomb.alpha = 1 - bomb.alpha;
  bomb.intSpeed -= 20;
  if (bomb.intSpeed < 0) {
    bomb.intSpeed = 5;
  }
  if (!bomb.stop) {
    setTimeout(function () {
      bombCallback(bomb);
    }, bomb.intSpeed);
  }

}

function damage(obj, quantity) {
  audio_degat.play();
  obj.life -= quantity;
  obj.justT = true;
  if (obj.life <= 0) {
    obj.emitter.start(true, 500, 0, 50);
    game.add.tween(obj).to( { alpha: 0 }, 500, Phaser.Easing.Exponential.InOut, true);
    game.add.tween(obj.mouth).to( { alpha: 0 }, 500, Phaser.Easing.Exponential.InOut, true);
    game.add.tween(obj.legs).to( { alpha: 0 }, 500, Phaser.Easing.Exponential.InOut, true);
    clearInterval(obj.atk);
    clearInterval(obj.ia1);
  } else {
    obj.emitter.start(true, 500, 0, 15);
    obj.invul = setInterval(function() {
      obj.alpha = 1 - obj.alpha;
      obj.mouth.alpha = 1 - obj.mouth.alpha;
      obj.legs.alpha = 1 - obj.legs.alpha;
    }, 200);
    setTimeout(function() {
      clearInterval(obj.invul);
      obj.alpha = 1;
      obj.mouth.alpha = 1;
      obj.legs.alpha = 1;
      obj.justT = false;
    }, 1500);
  }

}

function shocker(obj) {
  audio_shockwave.play();
  obj.canShock = false;
  setTimeout(function () {
    obj.canShock = true;
  }, 10000);
  obj.shocker.x = obj.x;
  obj.shocker.y = obj.y;
  obj.shocker.start(true, 500, null, 50);
  var x = obj.shocker.x;
  var y = obj.shocker.y;
  // ENEMY1
  if (Math.sqrt((x - enemy1.x)*(x - enemy1.x) + (y - enemy1.y)*(y - enemy1.y)) < 100 && enemy1.id != obj.id) {
    var a = (obj.x + 32 - enemy1.x)*(obj.x + 32 - enemy1.x) + (obj.y - enemy1.y)*(obj.y - enemy1.y);
    var b = (obj.x - enemy1.x)*(obj.x - enemy1.x) + (obj.y - enemy1.y)*(obj.y - enemy1.y);
    var c = 32*32;
    var angle = Math.acos((b + c - a) / (2 * Math.sqrt(b) * Math.sqrt(c))) * 180 / Math.PI;
    enemy1.angle = -angle;
    enemy1.hVAngle = 250;
  }
  // ENEMY2
  if (Math.sqrt((x - enemy2.x)*(x - enemy2.x) + (y - enemy2.y)*(y - enemy2.y)) < 100 && enemy2.id != obj.id) {
    var a = (obj.x + 32 - enemy2.x)*(obj.x + 32 - enemy2.x) + (obj.y - enemy2.y)*(obj.y - enemy2.y);
    var b = (obj.x - enemy2.x)*(obj.x - enemy2.x) + (obj.y - enemy2.y)*(obj.y - enemy2.y);
    var c = 32*32;
    var angle = Math.acos((b + c - a) / (2 * Math.sqrt(b) * Math.sqrt(c))) * 180 / Math.PI;
    enemy2.angle = -angle;
    enemy2.hVAngle = 250;
  }
  // ENEMY3
  if (Math.sqrt((x - enemy3.x)*(x - enemy3.x) + (y - enemy3.y)*(y - enemy3.y)) < 100 && enemy3.id != obj.id) {
    var a = (obj.x + 32 - enemy3.x)*(obj.x + 32 - enemy3.x) + (obj.y - enemy3.y)*(obj.y - enemy3.y);
    var b = (obj.x - enemy3.x)*(obj.x - enemy3.x) + (obj.y - enemy3.y)*(obj.y - enemy3.y);
    var c = 32*32;
    var angle = Math.acos((b + c - a) / (2 * Math.sqrt(b) * Math.sqrt(c))) * 180 / Math.PI;
    enemy3.angle = -angle;
    enemy3.hVAngle = 250;
  }
  // HERO
  if (Math.sqrt((x - hero.x)*(x - hero.x) + (y - hero.y)*(y - hero.y)) < 100 && hero.id != obj.id) {
    var a = (obj.x + 32 - hero.x)*(obj.x + 32 - hero.x) + (obj.y - hero.y)*(obj.y - hero.y);
    var b = (obj.x - hero.x)*(obj.x - hero.x) + (obj.y - hero.y)*(obj.y - hero.y);
    var c = 32*32;
    var angle = Math.acos((b + c - a) / (2 * Math.sqrt(b) * Math.sqrt(c))) * 180 / Math.PI;
    hero.angle = -angle;
    hero.hVAngle = 250;
  }
}

function dash(obj) {
  audio_dash.play();
  obj.canDash = false;
  setTimeout(function () {
    obj.canDash = true;
  }, 5000);
  obj.hVAngle = 400;
  obj.capA += 150;
  setTimeout(function () {
    obj.capA -= 150;
  }, 1500);
}

function sprint(obj) {
  audio_sprint.play();
  obj.canSprint = false;
  setTimeout(function () {
    obj.canSprint = true;
  }, 15000);
  setTimeout(function () {
    obj.capA -= 100;
    obj.capB += 100;
    obj.step = 10;
    if (obj.hVAngle > obj.capA)
      obj.hVAngle = obj.capA;
    if (obj.hVAngle < obj.capB)
      obj.hVAngle = obj.capB;
  }, 5000);
  obj.capA += 100;
  obj.capB -= 100;
  obj.step = 20;
}

function makeParts(obj, p1, p2, p3) {
  // MOUTH
  obj.part1 = p1;
  if (p1 == 1) {
    obj.hornHitbox = true;
  }

  // BODY
  obj.part2 = p2;
  switch (p2) {
    case 0:
      obj.life = 150;
      break;
    case 1:
      obj.capA -= 50;
      obj.capB += 50;
      obj.life = 250;
      break;
    case 2:
      obj.hitSides = true;
      break;
  }
  // LEGS
  obj.part3 = p3;
  switch (p3) {
    case 1:
      obj.capB = -obj.capA;
      break;
    case 2:
      obj.capA -= 25;
      obj.capB -= 50;
      break;
    case 3:
      obj.capA -= 25;
      obj.capB += 25;
      break;
    case 4:
      obj.capA -= 25;
      obj.capB += 25;
      obj.slimeInt = setInterval(function () {
        // TODO: SPAWN SLIME
      }, 2000);
      break;
  }

  // BODY GRAPHICS
  switch (p2) {
    case 0:
      obj.loadTexture('body1');
      break;
    case 1:
      obj.loadTexture('body2');
      break;
    case 2:
      obj.loadTexture('body3');
      break;
    case 3:
      obj.loadTexture('body4');
      break;
  }
  // MOUTH GRAPHICS
  switch (p1) {
    case 0:
      obj.mouth = game.add.sprite(obj.x, obj.y + 32, piece1_sprite[p1][p2]);
      obj.mouth.anchor.set(0, 0.5);
      obj.mouth.angle = obj.angle;
      break;
    case 1:
      obj.mouth = game.add.sprite(obj.x, obj.y + 32, piece1_sprite[p1][p2]);
      obj.mouth.anchor.set(0, 0.5);
      obj.mouth.angle = obj.angle;
      break;
    case 2:
      obj.mouth = game.add.sprite(obj.x, obj.y + 32, piece1_sprite[p1][p2]);
      obj.mouth.anchor.set(0, 0.5);
      obj.mouth.angle = obj.angle;
      break;
    case 3:
      obj.mouth = game.add.sprite(obj.x, obj.y + 32, piece1_sprite[p1][p2]);
      obj.mouth.anchor.set(0, 0.5);
      obj.mouth.angle = obj.angle;
      break;
  }
  // LEGS GRAPHICS
  switch (p1) {
    case 0:
      obj.legs = game.add.sprite(obj.x, obj.y, piece3_sprite[p3]);
      obj.legs.anchor.set(0.5);
      obj.legs.angle = obj.angle;
      break;
    case 1:
      obj.legs = game.add.sprite(obj.x, obj.y, piece3_sprite[p3]);
      obj.legs.anchor.set(0.5);
      obj.legs.angle = obj.angle;
      break;
    case 2:
      obj.legs = game.add.sprite(obj.x, obj.y, piece3_sprite[p3]);
      obj.legs.anchor.set(0.5);
      obj.legs.angle = obj.angle;
      break;
    case 3:
      obj.legs = game.add.sprite(obj.x, obj.y, piece3_sprite[p3]);
      obj.legs.anchor.set(0.5);
      obj.legs.angle = obj.angle;
      break;
  }
  obj.legs.animations.add("walk", [0, 1, 2, 3]);
  obj.legs.animations.play("walk", 6, false);
  obj.bringToTop();
}

function doIA(obj) {

    if (obj.part1 == 0 && obj.canBite) {
      obj.atk = setInterval(function () {
        bite(obj);
      }, 550);
    } else if (obj.part1 == 2 && obj.canSpit) {
      obj.atk = setInterval(function () {
        spit(obj);
      }, 450);
    } else if(obj.part1 == 3 && obj.canBomb) {
      obj.atk = setInterval(function () {
        bomb(obj);
      }, 5000);
    }

    obj.ia1 = setInterval(function () {

      // MOVE

      // DISTANCE CALCUL
      var distance1 = Math.sqrt((hero.x - obj.x)*(hero.x - obj.x) + (hero.y - obj.y)*(hero.y - obj.y));
      if (obj.id == "enemy1") {
        var distance2 = Math.sqrt((enemy2.x - obj.x)*(enemy2.x - obj.x) + (enemy2.y - obj.y)*(enemy2.y - obj.y));
        var distance3 = Math.sqrt((enemy3.x - obj.x)*(enemy3.x - obj.x) + (enemy3.y - obj.y)*(enemy3.y - obj.y));
      } else if (obj.id == "enemy2") {
        var distance2 = Math.sqrt((enemy1.x - obj.x)*(enemy1.x - obj.x) + (enemy1.y - obj.y)*(enemy1.y - obj.y));
        var distance3 = Math.sqrt((enemy3.x - obj.x)*(enemy3.x - obj.x) + (enemy3.y - obj.y)*(enemy3.y - obj.y));
      } else {
        var distance2 = Math.sqrt((enemy1.x - obj.x)*(enemy1.x - obj.x) + (enemy1.y - obj.y)*(enemy1.y - obj.y));
        var distance3 = Math.sqrt((enemy2.x - obj.x)*(enemy2.x - obj.x) + (enemy2.y - obj.y)*(enemy2.y - obj.y));
      }
      // CIBLE
      if ((distance1 > distance2 && distance2 > distance3) || (distance1 > distance3 && distance3 > distance2)) {
        var distance = distance1;
      } else if ((distance2 > distance1 && distance1 > distance3) || (distance2 > distance3 && distance3 > distance1)) {
        var distance = distance2;
      } else {
        var distance = distance3;
      }

      if (distance > 550) {
        // REALLY DISTANT
        // TRY TO GET CLOSER

        clearInterval(moveInt);
        clearInterval(rotateInt);

        // INTERVAL TO MOVE
        var moveInt = setInterval(function () {
          if (obj.hVAngle < obj.capA)
            obj.hVAngle += 5;
            obj.legs.animations.play("walk", 6, true);
        }, 17);

        // INTERVAL TO ROTATE
        var rotateInt = setInterval(function () {
          var angle = getCloserAngle(obj);
          if (angle - obj.angle < 25) {
            clearInterval(rotateInt);
          }
          if (angle < obj.angle && angle - obj.angle < 180) {
            if (obj.body.angularVelocity > -rotCap)
              obj.body.angularVelocity -= rotStep;
          } else {
            if (obj.body.angularVelocity < rotCap)
              obj.body.angularVelocity += rotStep;
          }
        }, 17);

      } else if (distance > 250) {
        // DISTANT
        // AIM AND SHOOT

        clearInterval(moveInt);
        clearInterval(rotateInt);

        // INTERVAL TO MOVE
        var moveInt = setInterval(function () {
          if (obj.hVAngle < obj.capA)
            obj.hVAngle += 1;
            obj.legs.animations.play("walk", 6, true);
        }, 17);

        // INTERVAL TO ROTATE
        var rotateInt = setInterval(function () {
          var angle = getCloserAngle(obj);

          if (Math.abs(angle - obj.angle) < 17.5) {
            clearInterval(rotateInt);
          }
          if (angle < obj.angle && angle - obj.angle < 180) {
            if (obj.body.angularVelocity > -rotCap)
              obj.body.angularVelocity -= rotStep;
          } else {
            if (obj.body.angularVelocity < rotCap)
              obj.body.angularVelocity += rotStep;
          }
        }, 17);

      } else {
        // CLOSE
        // BITE

        clearInterval(moveInt);
        clearInterval(rotateInt);

        var moveInt = setInterval(function () {
          if (obj.hVAngle > obj.capB)
            obj.hVAngle -= 5;
            obj.legs.animations.play("walk", 6, true);
        }, 17);

        // INTERVAL TO ROTATE
        var rotateInt = setInterval(function () {
          var angle = getCloserAngle(obj);

          if (Math.abs(angle - obj.angle) < 15) {
            clearInterval(rotateInt);
          }

          if (angle < obj.angle && angle - obj.angle < 180) {
            if (obj.body.angularVelocity > -rotCap)
              obj.body.angularVelocity -= rotStep;
          } else {
            if (obj.body.angularVelocity < rotCap)
              obj.body.angularVelocity += rotStep;
          }

        }, 17);
      }

      //
    }, 960);

}

function getCloserAngle(obj) {
  var distance1 = Math.sqrt((hero.x - obj.x)*(hero.x - obj.x) + (hero.y - obj.y)*(hero.y - obj.y));
  if (obj.id == "enemy1") {
    var distance2 = Math.sqrt((enemy2.x - obj.x)*(enemy2.x - obj.x) + (enemy2.y - obj.y)*(enemy2.y - obj.y));
    var distance3 = Math.sqrt((enemy3.x - obj.x)*(enemy3.x - obj.x) + (enemy3.y - obj.y)*(enemy3.y - obj.y));
  } else if (obj.id == "enemy2") {
    var distance2 = Math.sqrt((enemy1.x - obj.x)*(enemy1.x - obj.x) + (enemy1.y - obj.y)*(enemy1.y - obj.y));
    var distance3 = Math.sqrt((enemy3.x - obj.x)*(enemy3.x - obj.x) + (enemy3.y - obj.y)*(enemy3.y - obj.y));
  } else {
    var distance2 = Math.sqrt((enemy1.x - obj.x)*(enemy1.x - obj.x) + (enemy1.y - obj.y)*(enemy1.y - obj.y));
    var distance3 = Math.sqrt((enemy2.x - obj.x)*(enemy2.x - obj.x) + (enemy2.y - obj.y)*(enemy2.y - obj.y));
  }
  // CIBLE
  if ((distance1 < distance2 && distance2 < distance3) || (distance1 < distance3 && distance3 < distance2)) {
    var angle = game.physics.arcade.angleBetween(obj, hero) * 60;
  } else if ((distance2 < distance1 && distance1 < distance3) || (distance2 < distance3 && distance3 < distance1)) {
    if (obj.id == "enemy1") {
      var angle = game.physics.arcade.angleBetween(obj, enemy2) * 60;
    } else if (obj.id == "enemy2") {
      var angle = game.physics.arcade.angleBetween(obj, enemy1) * 60;
    } else {
      var angle = game.physics.arcade.angleBetween(obj, enemy1) * 60;
    }
  } else {
    if (obj.id == "enemy1") {
      var angle = game.physics.arcade.angleBetween(obj, enemy3) * 60;
    } else if (obj.id == "enemy2") {
      var angle = game.physics.arcade.angleBetween(obj, enemy3) * 60;
    } else {
      var angle = game.physics.arcade.angleBetween(obj, enemy2) * 60;
    }
  }
  return angle;
}
