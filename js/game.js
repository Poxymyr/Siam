require(['js/config.js'], function(config) {
  var Siam = {
    grid: {},
    gridBorders: {},

    preload: function() {
      this.load.image('cell', './img/cell.png');
      this.load.image('highlight', './img/highlight.png');
      this.load.image('mountain', './img/mountain.png');
      this.load.image('elephant', './img/player_blue.png');
      this.load.image('rhino', './img/player_red.png');
    },

    create: function() {
      this.grid = this.add.group();
      this.gridBorders = this.add.group();

      this.grid.x = config.TILE_SIZE*2;
      this.grid.y = config.TILE_SIZE;
      this.gridBorders.x = config.TILE_SIZE*2;
      this.gridBorders.y = config.TILE_SIZE;

      for(var c = 0; c < 5; c++) {
        for(var r = 0; r < 5; r++) {
          this.grid.create(c*config.TILE_SIZE, r*config.TILE_SIZE, 'cell');
        }

        this.gridBorders.create(c*config.TILE_SIZE, -1*config.TILE_SIZE, 'highlight');
        this.gridBorders.create(c*config.TILE_SIZE, 5*config.TILE_SIZE, 'highlight');
      }

      for(var r = 0; r < 5; r++) {
        this.gridBorders.create(-1*config.TILE_SIZE, r*config.TILE_SIZE, 'highlight');
        this.gridBorders.create(5*config.TILE_SIZE, r*config.TILE_SIZE, 'highlight');
      }

      this.gridBorders.setAll('visible', false);

      var sprite = null;
      for(var i = 0; i < 5; i++) {
        sprite = this.add.sprite(config.TILE_SIZE/2, (i+1.5)*config.TILE_SIZE, 'elephant');
        sprite.anchor = {x: 0.5, y: 0.5};
        sprite.scale = {x: 0.95, y: 0.95};
        sprite.inputEnabled = true;
        sprite.input.enableDrag();
        sprite.input.useHandCursor = true;
        sprite.input.enableSnap(config.TILE_SIZE, config.TILE_SIZE, true, true, config.TILE_SIZE/2, config.TILE_SIZE/2);
        sprite.events.onDragStart.add(this.highlightGridBorders, this, sprite);
        sprite.events.onDragStop.add(this.unhighlightGridBorders, this, sprite);
      }
    },

    update: function() {},

    highlightGridBorders: function(sprite) {
      this.gridBorders.setAll('visible', true);
    },

    unhighlightGridBorders: function(sprite) {
      for(var index in this.gridBorders.children) {
        if(sprite.overlap(this.gridBorders.getChildAt(index))) {
          this.gridBorders.setAll('visible', false);
          return;
        }
      }

      sprite.position = sprite.input.dragStartPoint;
      this.gridBorders.setAll('visible', false);
    }
  };

  var game = new Phaser.Game(config.TILE_SIZE*9, config.TILE_SIZE*7);

  game.state.add('Siam', Siam, true);
});
