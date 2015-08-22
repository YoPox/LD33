var menuState = {

  create: function() {

    var title = game.add.sprite(game.width / 2 - 256, game.width / 2 - 256, 'title');
    title.scale.set(4);
    title.smoothed = false;
    title.alpha = 0;
    game.add.tween(title).to( { alpha: 1 }, 2000, Phaser.Easing.Exponential.InOut, true);
    game.add.tween(title).to( { y: game.height / 2 - 256 }, 1500, Phaser.Easing.Exponential.InOut, true);

    var moveInt = setInterval(function () {
      game.add.tween(title).to( { y: title.y + 4 }, 1500, Phaser.Easing.Exponential.InOut, true);
      setTimeout(function () {
        game.add.tween(title).to( { y: title.y - 4 }, 1500, Phaser.Easing.Exponential.OutIn, true);
      }, 1500);
    }, 3000);

  },

  start: function() {

    game.state.start("play");

  }

};
