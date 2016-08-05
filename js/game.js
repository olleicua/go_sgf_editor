(function() {

  window.Point = {
    build: function(board) {
      var point = Object.create(this);
      point.board = board;
      point.neighbors = [];
      point.value = 'empty';
      return point;
    },

    connect: function(other) {
      this.neighbors.push(other);
      other.neighbors.push(this);
    },

    addDOMLink: function($point) {
      var that = this;

      this.$point = $point;

      $point.addEventListener('click', function() {
        that.board.playMove(that);
      });
    },

    setValue: function(value) {
      this.value = value;
      this.$point.classList.remove('black', 'white', 'empty');
      this.$point.classList.add(value);
    }
  };

  window.Game = [];

  Game.build = function(size) {
    var board = Object.create(this);

    var row = null;
    var point = null;
    for (var y = 0; y < size; y++) {
      row = [];
      board.push(row);
      for (var x = 0; x < size; x++) {
        point = Point.build(board);
        row.push(point)
        if (y > 0) point.connect(board[y - 1][x]);
        if (x > 0) point.connect(board[y][x - 1]);
      }
    }

    board.turn = 'black';

    return board;
  };

  Game.playMove = function(point) {
    if (point.value !== 'empty') return;

    point.setValue(this.turn);
    this.turn = this.turn === 'black' ? 'white' : 'black';
  };

})()
