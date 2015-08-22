// SPRITES
var rect, text, logo;

// STUFF
var titleEmitter;

var loadState = {

  preload: function() {

    game.load.image("logo", "../assets/logo.png");
    game.load.image("title", "../assets/working/title.png");
    game.load.image("part", "../assets/bluePart.png");
    game.load.image("part2", "../assets/redPart.png");
    game.load.image("phaser", "../assets/phaser.png");
    game.load.bitmapFont('Munro', '../assets/font/Munro.png', '../assets/font/Munro.fnt');

  },

  create: function() {

    game.stage.backgroundColor = "#2B3D73";

    // WHITE BACKGROUND
    var bmd = game.add.bitmapData(1280, 720);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 1280, 720);
    bmd.ctx.fillStyle = '#ffffff';
    bmd.ctx.fill();
    rect = game.add.sprite(0, 0, bmd);

    // ELLECTRON.COM TEXT
    text = game.add.bitmapText(game.width / 2,  3 * game.height / 4, "Munro", "eLLectron.com", 75);
    text.anchor.set(0.5, 0.5);

    // PARTICLES
    titleEmitter = game.add.emitter(game.width / 2 + 1, game.height / 2 - 65, 1000);
    titleEmitter.makeParticles(['part', 'part2']);
    titleEmitter.gravity = 0;
    titleEmitter.minParticleSpeed.setTo(-300, -300);
    titleEmitter.maxParticleSpeed.setTo(300, 300);

    setTimeout(function () {
      titleEmitter.start(false, 750, 10);
    }, 750);

    // ELLECTRON's LOGO
    logo = game.add.sprite(game.width / 2 - 128, game.height / 2 - 192, 'logo');
    logo.scale.set(4);
    logo.smoothed = false;
    logo.alpha = 0;
    game.add.tween(logo).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);

    // FINAL FADE OUT
    setTimeout(function () {
      titleEmitter.on = false;
      game.add.tween(logo).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(rect).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(text).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.OutIn, true);
    }, 2000);

    // DESTROY SPRITES AND START TITLE SCREEN
    setTimeout(function () {
      logo.destroy();
      rect.destroy();
      text.destroy();
      game.state.start("menu");
    }, 3500);

  },

  update: function() {

    // PARTICLES FADE OUT EFFECT
    titleEmitter.forEachAlive(function(p){
  		p.alpha = p.lifespan / titleEmitter.lifespan;
  	});

  }

};
