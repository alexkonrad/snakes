(function (root) {
  var Game = root.Game = (root.Game || {});

  var Snake = Game.Snake = function () {
    this.dir = "";
    this.segments = _.times(15, function() { return new Coord([49,49]) });

  }

  var Coord = Game.Coord = function (pos) {
    this.pos = pos;
  }

  var Board = Game.Board = function () {
    this.snake = new Snake();
  }

  Snake.prototype.move = function () {
    var newHead = new Coord(this.segments[0].plus(this.dir));
    this.segments.unshift(newHead);

    return this.segments.pop();
  }

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  }

  Coord.prototype.plus = function (dir) {
    var new_pos = this.pos.slice();
    if (dir == "N") {
      new_pos[0] -= 1;
    } else if (dir == "S") {
      new_pos[0] += 1;
    } else if (dir == "E") {
      new_pos[1] += 1;
    } else if (dir == "W") {
      new_pos[1] -= 1;
    }

    return new_pos;
  }

  Board.prototype.render = function() {

  }

})(this);