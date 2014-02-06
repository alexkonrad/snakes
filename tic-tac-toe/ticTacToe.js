(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function() {
    this.player = Game.marks[0];
    this.board = _.times(9, function () { return null });
  }

  Game.marks = ["x", "o"];

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [0,4,8];
    var diagonalPositions2 = [2,4,6];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.isEmptyPos = function (pos) {
    return (this.board[pos] === null);
  };

  Game.prototype.horizontalWinner = function () {
    var game = this;
    var val;
    _(Game.marks).each(function (mark) {
       _.times(3, function (i) {
        if ((game.board[(3*i) + 0] === game.board[(3*i) + 1]) &&
            (game.board[(3*i) + 1] === game.board[(3*i) + 2]) &&
            (game.board[(3*i) + 2] === mark)) { val = mark; }
      });
    });
    return val;
  };

  Game.prototype.verticalWinner = function () {
    var game = this;
    var val;
    _(Game.marks).each(function (mark) {
       _.times(3, function (i) {
        if ((game.board[i + 0] === game.board[i + 3]) &&
            (game.board[i + 3] === game.board[i + 6]) &&
            (game.board[i + 6] === mark)) { val = mark; }
      });
    });
    return val;
  };

  Game.prototype.move = function (pos) {
    if (!this.isEmptyPos(pos)) {
      return false;
    }

    this.placeMark(pos);
    this.switchPlayer();
    return true;
  };

  Game.prototype.placeMark = function (pos) {
    this.board[pos] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  Game.prototype.valid = function (pos) {
    return _.isNull(this.board[pos]);
  };

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };

  Game.prototype.turn = function (square, pos) {
    var game = this;

    $(square).addClass(game.player);
    game.move(pos);

    if (game.winner()) {
      alert("You won!");
      _($('.cells')).each(function(cell) {
        $(cell).removeClass("x");
        $(cell).removeClass("o");
      });
      game.board = _.times(9, function () { return null } )
    }
  }

  var game = new Game();

  $(document).ready(function() {
    $('.cells').on('click', function () {
      var pos = parseInt($(this).attr('id'));
      console.log(pos);
      if (game.valid(pos)) {
        game.turn(this,pos);
      }
    });
  });

})(this);