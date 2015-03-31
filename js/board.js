/*
var level_1 = [
    ['r','-','-','-','-','-'],
    ['*','*','*','*','-','*'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
    ['-','-','-','-','-','-'],
    ['-','p','-','-','d','-']
];
*/

Canvas.prototype.makeGameBoard = function(level) {
    //Making the level grided based on the length of the matrix
    canvas.makeGrid(level.length-1, level[0].length-1);
    
    //Traversing the matrix to get the layout based on characters
    for (var x = 0; x < level.length; x++) {
        for (var y = 0; y < level[x].length; y++) {
            switch(level[x][y]) {
                //Places the robot
                case 'r':
                        var robot = new Robot();
                        robot.placeBot(y+1, x+1);
                    break;
                    
                //Places the pick-up
                case 'p':
                        var pickup = new Circle(20, 'blue');
                        canvas.placeItem(pickup, y+1, x+1, true);
                    break;
                    
                //Places the drop box
                case 'd':
                        var drop = new Square(30, 'grey');
                        canvas.placeItem(drop, y+1, x+1, true);
                    break;
                    
                //Roadblocks
                case '*':
                        var block = new Square(30, 'black');
                        canvas.placeItem(block, y+1, x+1, true);
                    break;
                default:
                    break;
            }
        }
    }
    return robot;
}