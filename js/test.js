var canvas = new Canvas(null, null, 500, 500);

canvas.makeGrid(7);
//canvas.makeHeader("RoboGame");

var circle = new Circle(20);
canvas.placeItem(circle, 2, 3);

var req = new Rectangle(30, 20, 'grey');
//canvas.placeItem(req, 3, 5);

canvas.placeItem(req, 4, 4, true);

var robot = new Robot();
canvas.placeItem(robot, 3, 3);

var butt = 50;

$(document).ready(function() {
    console.log($("#wrap").height(), $("#wrap").width());
    console.log($("#canvas").height(), $("#canvas").width());
    console.log(canvas.grid);
});
//console.log(butt.css_px());
//$(robot.bot).animate({left: '+=' + butt.css_px()}, 500);
robot.moveOnce();
robot.moveOnce();
robot.turnLeft();
robot.turnLeft();

$(robot.bot).click(function(){
    this.rotateClockwise(90);
});
