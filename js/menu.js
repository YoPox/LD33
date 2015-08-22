// SPRITES
var title;
var phaser;
var playText;
var shareText;
var selectionRect;

// STUFF
var moveInt;

var menuState = {

  create: function() {

    // LOGO
    title = game.add.sprite(game.width / 2 - 256, game.height - 256, 'title');
    title.scale.set(4);
    title.smoothed = false;
    title.alpha = 0;
    // ANIMATION
    game.add.tween(title).to( { alpha: 1 }, 2000, Phaser.Easing.Exponential.InOut, true);
    game.add.tween(title).to( { y: game.height / 2 - 256 }, 1500, Phaser.Easing.Exponential.InOut, true);
    // REGULAR MOVE
    moveInt = setInterval(function () {
      game.add.tween(title).to( { y: title.y + 4 }, 1500, Phaser.Easing.Exponential.InOut, true);
      setTimeout(function () {
        game.add.tween(title).to( { y: title.y - 4 }, 1500, Phaser.Easing.Exponential.InOut, true);
      }, 1500);
    }, 3000);

    // SELECTION RECTANGLE

    // PLAY TEXT
    playText = game.add.bitmapText(game.width / 2 - 64,  3 * game.height / 4 - 88, "Munro", "Play", 64);
    playText.anchor.set(0.5, 0.5);
    playText.smoothed = false;
    playText.alpha = 0;
    setTimeout(function () {
      game.add.tween(playText).to( { alpha: 1 }, 1000, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(playText).to( { x: game.width / 2 }, 750, Phaser.Easing.Exponential.InOut, true);
    }, 900);

    // SHARE TEXT
    shareText = game.add.bitmapText(game.width / 2 + 64,  3 * game.height / 4 + 16, "Munro", "Share", 64);
    shareText.anchor.set(0.5, 0.5);
    shareText.smoothed = false;
    shareText.alpha = 0;
    setTimeout(function () {
      game.add.tween(shareText).to( { alpha: 1 }, 1000, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(shareText).to( { x: game.width / 2 }, 750, Phaser.Easing.Exponential.InOut, true);
    }, 950);

    // PHASER's LOGO
    phaser = game.add.sprite(game.width / 2 - 52, game.height + 30, 'phaser');
    phaser.alpha = 0;
    setTimeout(function () {
      game.add.tween(phaser).to( { alpha: 1 }, 1000, Phaser.Easing.Exponential.InOut, true);
      game.add.tween(phaser).to( { y: game.height - 30 }, 750, Phaser.Easing.Exponential.InOut, true);
    }, 1200);

  },

  start: function() {

    clearInterval(moveInt);

    game.state.start("play");

  }

};
