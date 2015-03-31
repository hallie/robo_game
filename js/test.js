var level_1 = [
    ['r', '-', '-', '-', '-', '-'],
    ['*', '*', '*', '*', '-', '*'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', 'p', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', 'p', '-', '-', 'd', '-']
];

var robot = makeGameBoard(level_1);
console.log(robot);

$(document).ready(function() {
    console.log($("#wrap").height(), $("#wrap").width());
    console.log($("#canvas").attr("top"), $("#canvas").attr("left"));
    console.log($(window).height());
    
    while(robot.canMove()) {
        robot.moveForward();
    }
});

$(document).ready(function() {
    robot.turnRight();
});