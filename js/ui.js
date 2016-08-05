(function() {

  var MAX_SIZE = 25;
  var size = 19;
  var board = null;

  var $board = document.querySelector('.board');

  var init = function() {
    squareBoard();
    initOptions();
  };

  var squareBoard = function() {
    $board.style.height = $board.offsetWidth + 'px';
  };

  var initOptions = function() {
    var $optionsModal = document.querySelector('.options-modal');
    var $increment = $optionsModal.querySelector('.increment-size');
    var $decrement = $optionsModal.querySelector('.decrement-size');
    var $size = $optionsModal.querySelector('.size');
    var $newGame = $optionsModal.querySelector('.new-game-btn');

    $increment.addEventListener('click', function() {
      size++;
      if (size > MAX_SIZE) size = MAX_SIZE;
      $size.innerHTML = '' + size + 'x' + size;
    });

    $decrement.addEventListener('click', function() {
      size--;
      if (size < 1) size = 1;
      $size.innerHTML = '' + size + 'x' + size;
    });

    $newGame.addEventListener('click', function() {
      drawBoard();
      $optionsModal.style.display = 'none';
    });
  };

  var drawBoard = function() {
    var $row = null;
    var $point = null;

    var cellWidth = ($board.offsetWidth - 20) / size
    var starPositions = stars(size);

    board = Game.build(size);

    for (var y = 0; y < size; y++) {
      $row = document.createElement('div');
      $row.classList.add('row');
      $row.style.height = cellWidth + 'px';
      for (var x = 0; x < size; x++) {
        $point = document.createElement('div');
        $point.classList.add('point', 'empty');
        if (starPositions.indexOf(x) !== -1 && starPositions.indexOf(y) !== -1) {
          $point.classList.add('star');
        }
        $point.style.width = cellWidth + 'px';
        $point.style.height = cellWidth + 'px';
        board[y][x].addDOMLink($point);
        $row.appendChild($point);
      }
      $board.appendChild($row);
    }
  };

  stars = function(size) {
    if (size < 9) {
      if (size % 2 === 1) {
        return [(size - 1) / 2];
      } else {
        return [];
      }
    } else if (size < 13) {
      return [3, size - 4];
    } else {
      if (size % 2 === 1) {
        return [3, size - 4, (size - 1) / 2];
      } else {
        return [3, size - 4];
      }
    }
  };

  init();

})();
