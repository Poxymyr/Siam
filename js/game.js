var Siam = {
  grid: {},

  preload: function() {
    this.load.image('cell', './img/cell.png');
    this.load.image('mountain', './img/mountain.png');
    this.load.image('elephant', './img/player_blue.png');
    this.load.image('rhino', './img/player_red.png');
  },

  create: function() {
    this.grid = this.add.group();

    for(var c = 0; c < 5; c++) {
      for(var r = 0; r < 5; r++) {
        this.grid[c] = {};
        this.grid[c][r] = this.add.sprite((c+2)*128, r*128, 'cell');
      }
    }

    var sprite = null;
    for(var i = 0; i < 5; i++) {
      sprite = this.add.sprite(7.5 * 128, i*128, 'elephant');
      sprite.inputEnabled = true;
      sprite.input.enableDrag();
      sprite.input.enableSnap(128, 128, false, true);
      sprite.events.onDragStop.add(this.pawnRelease, sprite);
    }
  },

  update: function() {},

  pawnRelease: function() {
    console.log(Siam);
  }
};

var game = new Phaser.Game(128*9, 128*5);

game.state.add('Siam', Siam, true);
