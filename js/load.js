var loadState = {

  preload: function() {

    game.load.image("logo", "../assets/logo.png");

  },

  create: function() {

    game.stage.backgroundColor = "#FFFFFF";

    var logo = game.add.sprite(game.width / 2 - 128, game.height / 2 - 128, 'logo');
    logo.scale.set(4);
    logo.smoothed = false;
    logo.alpha = 0;
    game.add.tween(logo).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);
    setTimeout(function () {
      game.add.tween(game.world).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.OutIn, true);
    }, 2000);
    setTimeout(function () {
      logo.destroy();
      game.state.start("menu");
    }, 3500);

  }

};
