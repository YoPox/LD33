var titleEmitter;
var loadState = {

  preload: function() {

    game.load.image("logo", "../assets/logo.png");
    game.load.image("boot", "../assets/working/boot.png");
    game.load.image("title", "../assets/working/title.png");
    game.load.image("part", "../assets/bluePart.png");
    game.load.image("part2", "../assets/redPart.png");

  },

  create: function() {

    var title = game.add.sprite(0, 0, "boot");

    titleEmitter = game.add.emitter(game.width / 2 + 1, game.height / 2 - 65, 1000);
    titleEmitter.makeParticles(['part', 'part2']);
    titleEmitter.gravity = 0;
    titleEmitter.minParticleSpeed.setTo(-300, -300);
    titleEmitter.maxParticleSpeed.setTo(300, 300);

    var logo = game.add.sprite(game.width / 2 - 128, game.height / 2 - 192, 'logo');
    logo.scale.set(4);
    logo.smoothed = false;
    logo.alpha = 0;
    game.add.tween(logo).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);

    setTimeout(function () {
      titleEmitter.start(false, 750, 10);
    }, 750);

    game.stage.backgroundColor = "#2B3D73";

    setTimeout(function () {
      titleEmitter.on = false;
      game.add.tween(logo).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(title).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.OutIn, true);
    }, 2000);

    setTimeout(function () {
      logo.destroy();
      title.destroy();
      game.state.start("menu");
    }, 3500);

  },

  update: function() {

    titleEmitter.forEachAlive(function(p){
  		p.alpha = p.lifespan / titleEmitter.lifespan;
  	});

  }

};
