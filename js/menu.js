// SPRITES
var title;
var phaser;
var playText;
var shareText;
var selectionRect;

// STUFF
var moveInt;
var actSelection = 1;
var isMoving = false;
var up, down, enter;
var block = false;
var mute = false;

var menuState = {

  create: function() {

    // MUSIC PLAYBACK
    var buffer = game.cache.getBinary('title_xm');
    ArtRemix.play(buffer);

    // LOGO
    title = game.add.sprite(game.width / 2, game.height, 'title');
    title.scale.set(4);
    title.anchor.set(0.5, 0.5);
    title.smoothed = false;
    title.alpha = 0;
    // ANIMATION
    game.add.tween(title).to( { alpha: 1 }, 2000, Phaser.Easing.Exponential.InOut, true);
    game.add.tween(title).to( { y: game.height / 4 + 16 }, 1500, Phaser.Easing.Exponential.InOut, true);
    // REGULAR MOVE
    moveInt = setInterval(function () {
      game.add.tween(title).to( { y: title.y + 4 }, 1500, Phaser.Easing.Exponential.InOut, true);
      setTimeout(function () {
        game.add.tween(title).to( { y: title.y - 4 }, 1500, Phaser.Easing.Exponential.InOut, true);
      }, 1500);
    }, 3000);

    // SELECTION RECTANGLE
    var bmd = game.add.bitmapData(1280, 80);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 1280, 80);
    bmd.ctx.fillStyle = '#000000';
    bmd.ctx.fill();
    selectionRect = game.add.sprite(game.width / 2, 3 * game.height / 4 - 80, bmd);
    selectionRect.anchor.set(0.5, 0.5);
    selectionRect.alpha = 0;

    // PLAY TEXT
    playText = game.add.bitmapText(game.width / 2 - 64,  3 * game.height / 4 - 88, "Munro", "Play", 64);
    playText.anchor.set(0.5, 0.5);
    playText.smoothed = false;
    playText.alpha = 0;
    setTimeout(function () {
      game.add.tween(playText).to( { alpha: 1 }, 1000, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(selectionRect).to( { alpha: 0.2 }, 1000, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(playText).to( { x: game.width / 2 }, 750, Phaser.Easing.Exponential.InOut, true);
    }, 900);
    playText.inputEnabled = true;
    playText.events.onInputOver.add(function() {moveRect(1);}, this);
    playText.events.onInputDown.add(function() {start();}, this);

    // SHARE TEXT
    shareText = game.add.bitmapText(game.width / 2 + 64,  3 * game.height / 4 + 16, "Munro", "Share", 64);
    shareText.anchor.set(0.5, 0.5);
    shareText.smoothed = false;
    shareText.alpha = 0;
    setTimeout(function () {
      game.add.tween(shareText).to( { alpha: 1 }, 1000, Phaser.Easing.Exponential.OutIn, true);
      game.add.tween(shareText).to( { x: game.width / 2 }, 750, Phaser.Easing.Exponential.InOut, true);
    }, 950);
    shareText.inputEnabled = true;
    shareText.events.onInputOver.add(function() {moveRect(2);}, this);
    shareText.events.onInputDown.add(function() {twitt();}, this);

    // PHASER's LOGO
    phaser = game.add.sprite(game.width / 2 - 52, game.height + 30, 'phaser');
    phaser.alpha = 0;
    setTimeout(function () {
      game.add.tween(phaser).to( { alpha: 1 }, 1000, Phaser.Easing.Exponential.InOut, true);
      game.add.tween(phaser).to( { y: game.height - 70 }, 750, Phaser.Easing.Exponential.InOut, true);
    }, 1200);
    phaser.inputEnabled = true;
    phaser.input.useHandCursor = true;
    phaser.events.onInputDown.add(openPhaser, this);

    // KEYBOARD
    up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    up.onDown.add(function() {move(1);}, this);
    down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    down.onDown.add(function() {move(2);}, this);
    enter = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    enter.onDown.add(function() {select();}, this);

  }

};

function openPhaser() {
  window.open("http://phaser.io/");
}

function moveRect(to) {
  if (!isMoving) {
    if (to != actSelection) {
      switch (to) {
        case 1:
          game.add.tween(selectionRect).to( { y: 3 * game.height / 4 - 80 }, 400, Phaser.Easing.Exponential.InOut, true);
          isMoving = true;
          setTimeout(function () {
            isMoving = false;
          }, 400);
          actSelection = 1;
          break;
        case 2:
          game.add.tween(selectionRect).to( { y: 3 * game.height / 4 + 24 }, 400, Phaser.Easing.Exponential.InOut, true);
          isMoving = true;
          setTimeout(function () {
            isMoving = false;
          }, 400);
          actSelection = 2;
          break;

      }
    }
  }
}

function start() {
  if (!block) {
    block = true;
    // FADE OUT
    game.add.tween(game.world).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.InOut, true);

    // DESTROY SPRITES AND CHANGE STATE
    setTimeout(function () {
        clearInterval(moveInt);
        title.destroy();
        phaser.destroy();
        playText.destroy();
        shareText.destroy();
        selectionRect.destroy();
        game.state.start("choose");
    }, 1500);
  }
}

function move(y) {
  if (!isMoving) {
    if (y != actSelection) {
      switch (y) {
        case 1:
          game.add.tween(selectionRect).to( { y: 3 * game.height / 4 - 80 }, 400, Phaser.Easing.Exponential.InOut, true);
          isMoving = true;
          setTimeout(function () {
            isMoving = false;
          }, 400);
          actSelection = 1;
          break;
        case 2:
          game.add.tween(selectionRect).to( { y: 3 * game.height / 4 + 24 }, 400, Phaser.Easing.Exponential.InOut, true);
          isMoving = true;
          setTimeout(function () {
            isMoving = false;
          }, 400);
          actSelection = 2;
          break;
      }
    } else {
      switch (y) {
        case 2:
          game.add.tween(selectionRect).to( { y: 3 * game.height / 4 - 80 }, 400, Phaser.Easing.Exponential.InOut, true);
          isMoving = true;
          setTimeout(function () {
            isMoving = false;
          }, 400);
          actSelection = 1;
          break;
        case 1:
          game.add.tween(selectionRect).to( { y: 3 * game.height / 4 + 24 }, 400, Phaser.Easing.Exponential.InOut, true);
          isMoving = true;
          setTimeout(function () {
            isMoving = false;
          }, 400);
          actSelection = 2;
          break;
      }
    }
  }
}

function select() {
  switch (actSelection) {
    case 1:
      start();
      break;
    case 2:
      twitt();
      break;
  }
}

function twitt() {
  var msg = encodeURIComponent('I played "Be The MASTER" by @ArtRemix38, @Ixous94, @olgret38 and @YoPoxDEV ! #LD33');
  var url = encodeURIComponent('http://www.eLLectron.com/games/LD33');
  var link = 'http://twitter.com/intent/tweet?text=' + msg + '&url=' + url;
  window.open(link, '_blank', 'location=yes,height=256,width=512,scrollbars=yes,status=yes');
}
