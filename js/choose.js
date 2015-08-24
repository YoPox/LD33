// SPRITES
var arr1;
var arr1_;
var arr2;
var arr2_;
var arr3;
var arr3_;
var monsterName;
var names = ["James", "Mike", "Randall", "Henry", "Celia", "Roz", "Fungus", "George", "Thaddeux", "Fline", "Claws", "Needleman", "Smitty", "Charlie", "Ted", "Lanky", "Jerry"];
var desc1, desc2, desc3;
var ic1, ic2, ic3, ic4;
var clearRect;
var ok, rand;
var p1, p2, p3;

// STUFF
var actName = Math.floor(Math.random() * (names.length));

var pieces1 = ["jaw", "horn", "spit", "bomb"];
var pieces2 = ["skin", "shell", "thorny", "shocker"];
var pieces3 = ["LEGS", "spider", "ANTILOPE", "FROG", "slime"];

var descs1 = ["Quench your thirst for blood\nby bitting your enemies.",
"Impale other monsters\nwith this harp horn.",
"Attack your enemies while keeping\nyour distance by spitting.",
"Shoot a bomb at a group of creatures\nto blow them up into pieces."];
var descs2 = ["Flexible fabulous light\nand shiny skin.",
"Come in the arena with this\nheavy mastodonte shell.",
"Become a goddamn hedgehog\nwith thorns and shit.",
"Get yourself out of shity situations\nusing this shockwave."];
var descs3 = ["You can walk with those.\nHow cool is that ?",
"I hate spider.\nBut they can move back faster...",
"Sprint away you coward.\nI'll catch you anyway.",
"Dash forward to escape or attack.",
"Let a sticky disgusting trail\nbehind you to slow other monsters."];
var piece1 = Math.floor(Math.random() * (pieces1.length));
var piece2 = Math.floor(Math.random() * (pieces2.length));
var piece3 = Math.floor(Math.random() * (pieces3.length));

var piece1_sprite = [['mouth1_1', 'mouth1_2', 'mouth1_3', 'mouth1_4'],
                    ['mouth2_1', 'mouth2_2', 'mouth2_3', 'mouth2_4'],
                    ['mouth3_1', 'mouth3_2', 'mouth3_3', 'mouth3_4'],
                    ['mouth4_1', 'mouth4_2', 'mouth4_3', 'mouth4_4']];
var piece2_sprite = ['body1', 'body2', 'body3', 'body4'];
var piece3_sprite = ['legs1', 'legs2', 'legs3', 'legs4', 'legs5'];

var chooseState = {

  create: function() {

    // MUSIC PLAYBACK
    // var buffer = game.cache.getBinary('selec_xm');
    // ArtRemix.play(buffer);

    // ARRAYS
    arr1 = game.add.sprite(160, 180, 'arrow');
    arr1.anchor.set(0.5, 0.5);
    arr1.scale.set(2);
    arr1.smoothed = false;
    arr1.inputEnabled = true;
    arr1.events.onInputDown.add(function() {changeParts(0,0);}, this);

    arr1_ = game.add.sprite(480, 180, 'arrow');
    arr1_.anchor.set(0.5, 0.5);
    arr1_.scale.set(2);
    arr1_.smoothed = false;
    arr1_.scale.x = -2;
    arr1_.inputEnabled = true;
    arr1_.events.onInputDown.add(function() {changeParts(0,1);}, this);

    arr2 = game.add.sprite(160, 360, 'arrow');
    arr2.anchor.set(0.5, 0.5);
    arr2.scale.set(2);
    arr2.smoothed = false;
    arr2.inputEnabled = true;
    arr2.events.onInputDown.add(function() {changeParts(1,0);}, this);

    arr2_ = game.add.sprite(480, 360, 'arrow');
    arr2_.anchor.set(0.5, 0.5);
    arr2_.scale.set(2);
    arr2_.smoothed = false;
    arr2_.scale.x = -2;
    arr2_.inputEnabled = true;
    arr2_.events.onInputDown.add(function() {changeParts(1,1);}, this);

    arr3 = game.add.sprite(160, 540, 'arrow');
    arr3.anchor.set(0.5, 0.5);
    arr3.scale.set(2);
    arr3.smoothed = false;
    arr3.inputEnabled = true;
    arr3.events.onInputDown.add(function() {changeParts(2,0);}, this);

    arr3_ = game.add.sprite(480, 540, 'arrow');
    arr3_.anchor.set(0.5, 0.5);
    arr3_.scale.set(2);
    arr3_.smoothed = false;
    arr3_.scale.x = -2;
    arr3_.inputEnabled = true;
    arr3_.events.onInputDown.add(function() {changeParts(2,1);}, this);

    // PIECES
    // TODO: remove text and replace with assets

    p1 = game.add.sprite(320, 232, piece1_sprite[piece1][piece2]);
    p1.anchor.set(0, 0.5);
    p1.scale.set(4);
    p1.smoothed = false;
    p1.angle = -90;
    p2 = game.add.sprite(320, 360, piece2_sprite[piece2]);
    p2.anchor.set(0.5, 0.5);
    p2.scale.set(4);
    p2.smoothed = false;
    p2.angle = -90;
    p3 = game.add.sprite(320, 488, piece3_sprite[piece3]);
    p3.anchor.set(1, 0.5);
    p3.scale.set(4);
    p3.smoothed = false;
    p3.angle = -90;


    // CLEAR RECTANGLE
    var bmd = game.add.bitmapData(1280, 720);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 640, 720);
    bmd.ctx.fillStyle = '#90CAF9';
    bmd.ctx.fill();
    clearRect = game.add.sprite(640, 0, bmd);


    // ICONS
    ic1 = game.add.sprite(720, 120, 'ic_rand', 0);
    ic1.anchor.set(0.5, 0.5);
    ic1.scale.set(2);
    ic1.smoothed = false;
    ic1.inputEnabled = true;
    ic1.events.onInputOver.add(function() {ic1.frame = 1;}, this);
    ic1.events.onInputDown.add(function() {ic1.frame = 2; monsterName.text = "Name : " + names[Math.floor(Math.random() * 17)];}, this);
    ic1.events.onInputOut.add(function() {ic1.frame = 0;}, this);

    ic2 = game.add.sprite(720, 300, 'ic_sword');
    ic2.anchor.set(0.5, 0.5);
    ic2.scale.set(2);
    ic2.smoothed = false;

    ic3 = game.add.sprite(720, 420, 'ic_shield');
    ic3.anchor.set(0.5, 0.5);
    ic3.scale.set(2);
    ic3.smoothed = false;

    ic4 = game.add.sprite(720, 540, 'ic_boots');
    ic4.anchor.set(0.5, 0.5);
    ic4.scale.set(2);
    ic4.smoothed = false;

    rand = game.add.sprite(320, 660, 'ic_rand', 0);
    rand.anchor.set(0.5, 0.5);
    rand.scale.set(2);
    rand.smoothed = false;
    rand.inputEnabled = true;
    rand.events.onInputOver.add(function() {rand.frame = 1;}, this);
    rand.events.onInputDown.add(function() {rand.frame = 2; shuffleParts();}, this);
    rand.events.onInputOut.add(function() {rand.frame = 0;}, this);

    ok = game.add.sprite(960, 660, 'ic_ok', 0);
    ok.anchor.set(0.5, 0.5);
    ok.scale.set(2);
    ok.smoothed = false;
    ok.inputEnabled = true;
    ok.events.onInputOver.add(function() {ok.frame = 1;}, this);
    ok.events.onInputDown.add(function() {ok.frame = 2; gameStart();}, this);
    ok.events.onInputOut.add(function() {ok.frame = 0;}, this);

    // NAME
    monsterName = game.add.bitmapText(784, 86, "Munro", "Name : " + names[actName], 64);

    // DESCRIPTIONS
    desc1 = game.add.bitmapText(784, 268, "Munro", descs1[piece1], 30);
    desc2 = game.add.bitmapText(784, 388, "Munro", descs2[piece2], 30);
    desc3 = game.add.bitmapText(784, 508, "Munro", descs3[piece3], 30);

    // APPEAR EFFECT
    game.add.tween(game.world).to( { alpha: 1 }, 1500, Phaser.Easing.Exponential.InOut, true);
    setTimeout(function () {
      block = false;
    }, 1500);

  },

  update: function() {

  },

  render: function() {
    // game.debug.inputInfo(32, 32);
  }

};

function changeParts(a, b) {
  switch (a) {
    case 0:
      if (b == 1) {
        piece1++;
        if (piece1 == pieces1.length) {
          piece1 = 0;
        }
      } else {
        piece1--;
        if (piece1 < 0) {
          piece1 = pieces1.length - 1;
        }
      }
      break;
      case 1:
        if (b == 1) {
          piece2++;
          if (piece2 == pieces2.length) {
            piece2 = 0;
          }
        } else {
          piece2--;
          if (piece2 < 0) {
            piece2 = pieces2.length - 1;
          }
        }
        break;
        case 2:
          if (b == 1) {
            piece3++;
            if (piece3 == pieces3.length) {
              piece3 = 0;
            }
          } else {
            piece3--;
            if (piece3 < 0) {
              piece3 = pieces3.length - 1;
            }
          }
          break;
    default:
  }
  updateText();
}

function shuffleParts() {
  piece1 = Math.floor(Math.random() * (pieces1.length));
  piece2 = Math.floor(Math.random() * (pieces2.length));
  piece3 = Math.floor(Math.random() * (pieces3.length));
  actName = Math.floor(Math.random() * (names.length));
  updateText();
}

function updateText() {
  p1.text = pieces1[piece1];
  p2.text = pieces2[piece2];
  p3.text = pieces3[piece3];
  desc1.text = descs1[piece1];
  desc2.text = descs2[piece2];
  desc3.text = descs3[piece3];
  monsterName.text = "Name : " + names[actName];
  p1.loadTexture(piece1_sprite[piece1][piece2]);
  p2.loadTexture(piece2_sprite[piece2]);
  p3.loadTexture(piece3_sprite[piece3]);
}

function gameStart() {
  if (!block) {
    block = true;
    // FADE OUT
    game.add.tween(game.world).to( { alpha: 0 }, 1500, Phaser.Easing.Exponential.InOut, true);

    // DESTROY SPRITES AND CHANGE STATE
    setTimeout(function () {
        arr1.destroy();
        arr1_.destroy();
        arr2.destroy();
        arr2_.destroy();
        arr3.destroy();
        arr3_.destroy();
        monsterName.destroy();
        desc1.destroy();
        desc2.destroy();
        desc3.destroy();
        ic1.destroy();
        ic2.destroy();
        ic3.destroy();
        ic4.destroy();
        clearRect.destroy();
        ok.destroy();
        rand.destroy();
        p1.destroy();
        p2.destroy();
        p3.destroy();
        game.state.start("play");
    }, 1500);
  }
}
