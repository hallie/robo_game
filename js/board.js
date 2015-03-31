function makeGameBoard(level) {
    "use strict";
    var canvas = new Canvas(null, null, 500, 500);
    setBoard(canvas);
    return canvas.makeGameBoard(level);
}

Canvas.prototype.makeGameBoard = function (level) {
    //Making the level grided based on the length of the matrix
    "use strict";
    this.makeGrid((level.length - 1), (level[0].length - 1));
    
    //Traversing the matrix to get the layout based on characters
    var bot, drop, pickup, block,
        x, y;
    for (x = 1; x < level.length + 1; x += 1) {
        for (y = 1; y < level[x - 1].length + 1; y += 1) {
            switch (level[x - 1][y - 1]) {
            //Places the robot
            case 'r':
                bot = new Robot();
                bot.placeBot(y, x);
                break;
                    
            //Places the pick-up
            case 'p':
                pickup = new Circle(20, 'blue');
                this.placeItem(pickup, y, x, true);
                break;
                    
                //Places the drop box
            case 'd':
                drop = new Square(30, 'grey');
                this.placeItem(drop, y, x, true);
                break;
                
            //Roadblocks
            case '*':
                block = new Square(30, 'black');
                this.placeItem(block, y, x, true);
                break;
            default:
                break;
            }
        }
    }
    console.log(bot);
    return bot;
};