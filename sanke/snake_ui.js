(function (root) {
  var Game = root.Game = (root.Game || {});

  var View = Game.View = function (htmlEl) {
    this.$el = $(htmlEl);
    this.board = new Game.Board();
  }

  View.prototype.start = function () {
    var view = this;

    key("left", function () { view.board.snake.turn("W") })
    key("right", function () { view.board.snake.turn("E") })
    key("down", function () { view.board.snake.turn("S") })
    key("up", function () { view.board.snake.turn("N") })

     window.setInterval(function () {
       view.render();
     }, 100);
  }

  View.prototype.render = function () {
    var view = this;
    var board = this.board;
    var snake = this.board.snake;

    var oldSegment = snake.move();

    var old_id = "#" + oldSegment.pos[0] + "x" + oldSegment.pos[1];
    $(old_id).removeClass("snake");

    _(snake.segments).each(function (segment) {
      var id = "#" + segment.pos[0] + "x" + segment.pos[1];
      $(id).addClass("snake");
    })

  }

})(this);


var view = new this.Game.View($('body'));

view.start();