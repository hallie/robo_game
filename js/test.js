var level_1 = [
    ['r','-','-','-','-','-'],
    ['*','*','*','*','-','*'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
    ['-','p','-','-','d','-']
];


var canvas = new Canvas(null, null, 500, 500);
setBoard(canvas);

var robot = canvas.makeGameBoard(level_1);

$(document).ready(function() {
    console.log($("#wrap").height(), $("#wrap").width());
    console.log($("#canvas").height(), $("#canvas").width());
    console.log(canvas.grid);
    
    while(robot.canMove()) {
        robot.moveForward();
    }
});

$(document).ready(function() {
    robot.turnRight();
});