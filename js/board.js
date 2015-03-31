function makeGameBoard(level) {
    var canvas = new Canvas(null, null, 500, 500);
    setBoard(canvas);
    return canvas.makeGameBoard(level);
}

Canvas.prototype.makeGameBoard = function(level) {
    //Making the level grided based on the length of the matrix
    this.makeGrid(level.length-1, level[0].length-1);
    var bot;
    
    //Traversing the matrix to get the layout based on characters
    for (var x = 0; x < level.length; x++) {
        for (var y = 0; y < level[x].length; y++) {
            switch(level[x][y]) {
                //Places the robot
                case 'r':
                        bot = new Robot();
                        bot.placeBot(y+1, x+1);
                        console.log(bot);
                    break;
                    
                //Places the pick-up
                case 'p':
                        var pickup = new Circle(20, 'blue');
                        this.placeItem(pickup, y+1, x+1, true);
                    break;
                    
                //Places the drop box
                case 'd':
                        var drop = new Square(30, 'grey');
                        this.placeItem(drop, y+1, x+1, true);
                    break;
                    
                //Roadblocks
                case '*':
                        var block = new Square(30, 'black');
                        this.placeItem(block, y+1, x+1, true);
                    break;
                default:
                    break;
            }
        }
    }
    console.log(bot);
    return bot;
}