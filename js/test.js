var level_1 = [
    ['r','-','-','-','-','-'],
    ['*','*','*','*','-','*'],
    ['-','-','-','-','-','-'],
    ['-','-','p','-','-','-'],
    ['-','-','-','-','-','-'],
    ['-','p','-','-','d','-']
];

var robot = makeGameBoard(level_1);
console.log(robot);

$(document).ready(function() {
    console.log($("#wrap").height(), $("#wrap").width());
    $("#canvas").attr("top", "100px").attr("left", "100px");
    console.log($("#canvas").attr("top"), $("#canvas").attr("left"));
    console.log(board.grid);
    
    while(robot.canMove()) {
        robot.moveForward();
    }
});

$(document).ready(function() {
    robot.turnRight();
});