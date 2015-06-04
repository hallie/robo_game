/*jslint browser: true*/
/*global $, console, Circle*/

/**
 * File for handling the creation and the actions of the robot, using what was
 *   defined in jskinter.js
 **/

var board, level;

/**
 * @function setBoard - Sets the board used in the implementation of board.js
 *   equal to whatever canvas is passed through this function.
 **/
function setBoard(canvas) {
    "use strict";
    board = canvas;
}

/**
 * Sets the level that the robot is currently going through.
 **/
function setLevel(lev) {
    "use strict";
    level = lev;
}

/**
 * @class Robot
 * @type {Object}
 * @property {HTMLDivElement} bot - The body of the bot as it appears on screen
 * @property {String} direction - The direction the bot is initially facing.
 * @property {List[HTMLDivElement]} pickUps - The html for the pickUps it holds.
 **/
function Robot() {
    "use strict";
    var body, left_eye, right_eye;
    
    body = new Circle(30, 'green');
    $(body).attr("id", "#robo-bod");
    
    left_eye = new Circle(5, 'white');
    left_eye.style.position = 'absolute';
    left_eye.style.top = '20%';
    left_eye.style.left = '75%';
    body.appendChild(left_eye);
    
    right_eye = new Circle(5, 'white');
    right_eye.style.position = 'absolute';
    right_eye.style.top = '55%';
    right_eye.style.left = '75%';
    body.appendChild(right_eye);
    
    this.bot = body;
    this.direction = 'right';
    this.pickUps = [];
}

/**
 * @function placeBot - Function to put bot on the board
 * @memberof Robot
 * @param {number} height - The y position of the robot on the board.
 * @param {number} width - The x position of the robot on the board.
 * @property {number, number} postion - The x and y coordinates of the bot.
 **/
Robot.prototype.placeBot = function (height, width) {
    "use strict";
    this.position = [height, width];
    board.placeItem(this, height, width, true);
};


/**
 * @function canMove - Checks if the robot can move forward by comparing its
 *    position to both the dimensions of the board and the immovable objects
 *    said to be placed on it. Uses the dircetion the bot is facing in the
 *    switch statement.
 * @memberof Robot
 * @return {boolean}
 **/
Robot.prototype.canMove = function () {
    "use strict";
    var x, y,
        px, py;
    
    x = board.grid_x;
    y = board.grid_y;
    
    px = this.position[0] - 1;
    py = this.position[1] - 1;
	
    switch (this.direction) {
    
    case "left":
        if ((px > 0) && (level[py][px - 1] !== '*')) {
            return true;
        }
        break;
    case "right":
        if ((px < x.length - 1) && (level[py][px + 1] !== '*')) {
            return true;
        }
        break;
    case "up":
        if ((py > 0) && (level[py - 1][px] !== '*')) {
            return true;
        }
        break;
    default:
        if ((py < y.length) && (level[py + 1][px] !== '*')) {
            return true;
        }
    }
    
    return false; //Bot cannot move forward
};

/**
 * @function moveForward - Function for moving the robot 'forward' to the
 *   next point in the grid.
 * @memberof Robot
 **/
Robot.prototype.moveForward = function () {
    "use strict";
    var x, y, sx, sy;
    
    x = board.grid_x;
    y = board.grid_y;
    
    sx = board.square_size[0];
    sy = board.square_size[1];
    
    switch (this.direction) {
    
    case "left":
        if (this.canMove()) {
            $(this.bot).animate({left: '-=' + sx.css_px()}, 500);
            this.position[0] -= 1;
        }
        break;
    case "right":
        if (this.canMove()) {
            $(this.bot).animate({left: '+=' + sx.css_px()}, 500);
            this.position[0] += 1;
        }
        break;
    case "up":
        if (this.canMove()) {
            $(this.bot).animate({top: '-=' + sx.css_px()}, 500);
            this.position[1] -= 1;
        }
        break;
    default:
        if (this.canMove()) {
            $(this.bot).animate({top: '+=' + sx.css_px()}, 500);
            this.position[1] += 1;
        }
    }
};

//List of the directions in clockwise order, starting with right.
var directions = ['right', 'down', 'left', 'up'];

/**
 * @function turnRight - Function to make the robot turn clockwise 90 degrees.
 * @memberof Robot
 **/
Robot.prototype.turnRight = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = Math.abs(d + 1) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

/**
 * @function turnAround - Function to make the robot turn clockwise 180 degrees.
 * @memberof Robot
 **/
Robot.prototype.turnAround = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = (d + 2) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

/**
 * @function turnLeft - Function to make the robot turn clockwise 270 degrees.
 *  Mimics the turning of -90 degrees, but makes use of the turnRight function.
 * @memberof Robot
 **/
Robot.prototype.turnLeft = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = (d + 3) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

/**
 * @function pickUp - Function to "pick up" a pick-up if the robot is over it.
 *   Removes the item from the boar. Appends a tiny version of it to the
 *   back of the bot if it isn't already holding one.
 * @memberof Robot
 **/
Robot.prototype.pickUp = function () {
    "use strict";
    var x, y, pickup;
    
    x = this.position[0] - 1;
    y = this.position[1] - 1;
    
    if (level[y][x] === 'p') {
        level[y][x] = '-';
		//Only appends one dot to the butt of the bot
		//Makes removal simpler
		if (this.pickUps.length === 0) {
        	pickup = new Circle(5, 'blue');
        	pickup.setAttribute('id', 'butt-dot');
        	pickup.style.position = 'absolute';
        	pickup.style.top = '50%';
        	pickup.style.left = '0%';
        	this.bot.appendChild(pickup);
		}
        this.pickUps.push(board.board_divs[y][x]);
        board.div.removeChild(board.board_divs[y][x]);
        board.board_divs[y][x] = '-';
    }
};

/**
 * @function drop - Function that drops a pick-up onto the board if the robot
 *   is currently holding one. Removes the dot from the robot's butt if it
 *   drops all of its pick-ups.
 * @memberof Robot
 **/
Robot.prototype.drop = function () {
    "use strict";
    var x, y, pickup, drop;
    
    x = this.position[0] - 1;
    y = this.position[1] - 1;
    
    if (this.pickUps.length > 0) {
        pickup = this.pickUps.pop();
        if (level[y][x] === 'd') {
            pickup.style.height = '20px';
            pickup.style.width = '20px';
        } else {
            level[y][x] = 'p';
            board.board_divs[y][x] = pickup;
        }
        board.placeItem(pickup, x + 1, y + 1, true);
        
        if (this.pickUps.length === 0) {
            this.bot.removeChild(this.bot.querySelector('#butt-dot'));
        }
    }
    console.log(this.pickUps.length);
};