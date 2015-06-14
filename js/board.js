/*global $, Canvas, Robot, Circle, Square*/
/*global setBoard, setLevel*/

/**
 * @function makeGameBoard - Makes the canvas for the game, and then calls
 *   a function to build the board on the canvas.
 * @param {Array} level - The matrix for the board.
 * @return {Robot} bot - The robot for the game.
 **/
function makeGameBoard(level) {
    'use strict';
    var canvas = new Canvas(null, null, 500, 500);
    setBoard(canvas);
    setLevel(level);
    return canvas.makeGameBoard(level);
}

/**
 * @function makeGameBoard - Constructs the gameboard for the level.
 * @memberof Canvas
 * @param {Array} level - The matrix for the board.
 * @return {Robot} bot - The robot for the game.
 **/
Canvas.prototype.makeGameBoard = function (level) {
    //Making the level grided based on the length of the matrix
    'use strict';
    this.makeGrid((level.length - 1), (level[0].length - 1));
    
    this.board_divs = [];
    
    //Traversing the matrix to get the layout based on characters
    var bot, drop, pickup, block,
        x, y, board_x;
    for (x = 1; x < level.length + 1; x += 1) {
        board_x = [];
        for (y = 1; y < level[x - 1].length + 1; y += 1) {
            switch (level[x - 1][y - 1]) {
            //Places the robot
            case 'r':
                bot = new Robot();
                bot.placeBot(y, x);
                board_x.push('r');
                break;
                    
            //Places the pick-up
            case 'p':
                pickup = new Circle(20, 'blue');
                this.placeItem(pickup, y, x, true);
                board_x.push(pickup);
                break;
                    
            //Places the drop box
            case 'd':
                drop = new Square(30, 'grey');
                this.placeItem(drop, y, x, true);
                board_x.push('d');
                break;
                
            //Roadblocks
            case '*':
                block = new Square(30, 'black');
                this.placeItem(block, y, x, true);
                board_x.push('*');
                break;
					
			//End game block
			case 'e':
				block = new Square(30, 'red');
				this.placeItem(block, y, x, true);
				board_x.push('e');
				break;
					
			//Makes a dash (empty) by default
            default:
                board_x.push('-');
                break;
            }
        }
        this.board_divs.push(board_x);
    }
	
	bot.boardCanvas = this;
    return bot;
};

/**
 * @function destroyGameBoard - Function to remove the current board from the
 *   the wrapper div.
 * @memberof Canvas
 **/
Canvas.prototype.destroyGameBoard = function () {
	'use strict';
	$(this.id).remove();
};