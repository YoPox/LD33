var game = new Phaser.Game(1280, 720, Phaser.CANVAS, "game");

game.state.add("boot", bootState);
game.state.add("load", loadState);
game.state.add("menu", menuState);
game.state.add("choose", chooseState);
game.state.add("play", playState);
// game.state.add("win", winState);

// INIT MUSIC
var ArtRemix;
ArtRemix = new ChiptuneJsPlayer(new ChiptuneJsConfig(1));

game.state.start("boot");
