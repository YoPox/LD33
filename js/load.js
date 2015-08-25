// SPRITES
var rect, text, logo;

// STUFF
var titleEmitter;

var loadState = {

  preload: function() {

    // BOOT
    game.load.image("logo", "assets/logo.png");
    game.load.image("part", "assets/bluePart.png");
    game.load.image("part2", "assets/redPart.png");

    // TITLE
    game.load.image("title", "assets/title.png");
    game.load.image("phaser", "assets/phaser.png");

    // CHOOSE
    game.load.image("arrow", "assets/arrow.png");
    game.load.spritesheet("ic_rand", "assets/ic_rand_sheet.png", 32, 32);
    game.load.spritesheet("ic_ok", "assets/ic_ok_sheet.png", 32, 32);
    game.load.image("ic_sword", "assets/ic_sword.png");
    game.load.image("ic_shield", "assets/ic_shield.png");
    game.load.image("ic_boots", "assets/ic_boots.png");

    // GAME
    game.load.image("hero", "assets/dummyHero.png");
    game.load.image("part3", "assets/redPart_small.png");
    game.load.image("part4", "assets/particule_sand.png");
    game.load.image("sand", "assets/sand.png");
    game.load.image("win", "assets/win.png");
    game.load.image("lose", "assets/lose.png");
    game.load.image("shadow", "assets/shadow.png");
    game.load.spritesheet("countdown", "assets/countdown.png", 64, 64);
    game.load.spritesheet("spit", "assets/spit.png", 32, 32);
    game.load.spritesheet("bomb", "assets/bomb.png", 32, 32);

    // MOUTH
    game.load.spritesheet("mouth1_1", "assets/mouth_jaw_skin.png", 32, 32);
    game.load.spritesheet("mouth1_2", "assets/mouth_jaw_shell.png", 32, 32);
    game.load.spritesheet("mouth1_3", "assets/mouth_jaw_thorny.png", 32, 32);
    game.load.spritesheet("mouth1_4", "assets/mouth_jaw_shocker.png", 32, 32);
    game.load.image("mouth2_1", "assets/mouth_horn_skin.png");
    game.load.image("mouth2_2", "assets/mouth_horn_shell.png");
    game.load.image("mouth2_3", "assets/mouth_horn_thorny.png");
    game.load.image("mouth2_4", "assets/mouth_horn_shocker.png");
    game.load.spritesheet("mouth3_1", "assets/mouth_spitter_skin.png", 32, 32);
    game.load.spritesheet("mouth3_2", "assets/mouth_spitter_shell.png", 32, 32);
    game.load.spritesheet("mouth3_3", "assets/mouth_spitter_thorny.png", 32, 32);
    game.load.spritesheet("mouth3_4", "assets/mouth_spitter_shocker.png", 32, 32);
    game.load.spritesheet("mouth4_1", "assets/mouth_bomb_skin.png", 32, 32);
    game.load.spritesheet("mouth4_2", "assets/mouth_bomb_shell.png", 32, 32);
    game.load.spritesheet("mouth4_3", "assets/mouth_bomb_thorny.png", 32, 32);
    game.load.spritesheet("mouth4_4", "assets/mouth_bomb_shocker.png", 32, 32);

    // BODY
    game.load.image("body1", "assets/body_skin.png");
    game.load.spritesheet("body2", "assets/body_shell.png", 64, 64);
    game.load.image("body3", "assets/body_thorny.png");
    game.load.spritesheet("body4", "assets/body_shocker.png", 64, 64);

    // LEGS
    game.load.spritesheet("legs1", "assets/leg_leg.png", 64, 64);
    game.load.spritesheet("legs2", "assets/leg_spider.png", 64, 64);
    game.load.spritesheet("legs3", "assets/leg_antilope.png", 64, 64);
    game.load.spritesheet("legs4", "assets/leg_frog.png", 64, 64);

    // FONT
    game.load.bitmapFont('Munro', 'assets/font/Munro.png', 'assets/font/Munro.fnt');

    // MUSIC
    game.load.binary('title_xm', 'assets/audio/title.xm', binaryLoadCallback, this);
    game.load.binary('selec_xm', 'assets/audio/selec.xm', binaryLoadCallback, this);
    game.load.binary('cbt_xm', 'assets/audio/cbt.xm', binaryLoadCallback, this);

    // EFFECTS
    game.load.audio('audio_dash', 'assets/audio/bruitages/dash.ogg');
    game.load.audio('audio_degat', 'assets/audio/bruitages/degat.ogg');
    game.load.audio('audio_explosion', 'assets/audio/bruitages/explosion.ogg');
    game.load.audio('audio_morsure', 'assets/audio/bruitages/morsure.ogg');
    game.load.audio('audio_shockwave', 'assets/audio/bruitages/shockwave.ogg');
    game.load.audio('audio_sprint', 'assets/audio/bruitages/sprint.ogg');
  },

  create: function() {

    audio_dash = game.add.audio('audio_dash');
    audio_dash.volume = 0.45;
    audio_degat = game.add.audio('audio_degat');
    audio_degat.volume = 0.45;
    audio_explosion = game.add.audio('audio_explosion');
    audio_explosion.volume = 0.45;
    audio_morsure = game.add.audio('audio_morsure');
    audio_morsure.volume = 0.45;
    audio_shockwave = game.add.audio('audio_shockwave');
    audio_shockwave.volume = 0.45;
    audio_sprint = game.add.audio('audio_sprint');
    audio_sprint.volume = 0.45;

    game.stage.backgroundColor = "#d4cf70";

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
    }, 700);

    // ELLECTRON's LOGO
    logo = game.add.sprite(game.width / 2 - 128, game.height / 2 - 192, 'logo');
    logo.scale.set(4);
    logo.smoothed = false;
    logo.alpha = 0;
    game.add.tween(logo).to( { alpha: 1 }, 1250, Phaser.Easing.Exponential.OutIn, true);

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

function binaryLoadCallback(key, data) {

    return new Uint8Array(data);

}
