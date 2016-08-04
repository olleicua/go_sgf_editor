(function() {

  window.Point = {
    build: function() {
      var p = Object.create(this);
      p.neighbors = [];
      p.value = 'empty';
      return p;
    },

    connect: function(other) {
      this.neighbors.push(other);
      other.neighbors.push(this);
    },
  };

  window.Game = {
    newBoard: function(size) {
      var board = [];

      var row = null;
      var point = null;
      for (var y = 0; y < size; y++) {
        row = [];
        board.push(row);
        for (var x = 0; x < size; x++) {
          point = Point.build();
          row.push(point)
          if (y > 0) point.connect(board[y - 1][x]);
          if (x > 0) point.connect(board[y][x - 1]);
        }
      }

      return board;
    }
  };

})()
