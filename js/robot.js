/*jslint browser: true*/
/*global $, console, Circle*/

/**
 * File for handling the creation and the actions of the robot, using what I
 *   defined in jskinter.js
 **/

var board, level;

/**
 * Sets the board used in the implementation of board.js equal to whatever
 *   canvas is passed through this function.
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

//Robot
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

Robot.prototype.placeBot = function (height, width) {
    "use strict";
    this.position = [height, width];
    board.placeItem(this, height, width, true);
};


/**
 * Checks if the robot can move forward
 **/
Robot.prototype.canMove = function () {
    "use strict";
    var x, y,
        px, py;
    
    x = board.grid_x;
    y = board.grid_y;
    
    console.log(this.position);
    
    px = this.position[0] - 1;
    py = this.position[1] - 1;
    
	console.log(this.direction);
	
    switch (this.direction) {
    
    case "left":
        if ((px > 0) && (level[py][px - 1] !== '*')) {
            return true;
        }
        break;
    case "right":
        console.log(px, py);
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
        console.log(px, py);
        if ((py < y.length) && (level[py + 1][px] !== '*')) {
            return true;
        }
    }
    
    return false;
};

/**
 * Function for moving the robot 'forward' to the next point in the grid.
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

var directions = ['right', 'down', 'left', 'up'];

Robot.prototype.turnRight = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = Math.abs(d + 1) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

Robot.prototype.turnLeft = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = (d + 3) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

Robot.prototype.turnAround = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = (d + 2) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

Robot.prototype.pickUp = function () {
    "use strict";
    var x, y, pickup;
    
    x = this.position[0] - 1;
    y = this.position[1] - 1;
    
    if (level[y][x] === 'p') {
        level[y][x] = '-';
        pickup = new Circle(5, 'blue');
        pickup.setAttribute('id', 'butt-dot');
        pickup.style.position = 'absolute';
        pickup.style.top = '50%';
        pickup.style.left = '0%';
        this.bot.appendChild(pickup);
        this.pickUps.push(board.board_divs[y][x]);
        board.div.removeChild(board.board_divs[y][x]);
        board.board_divs[y][x] = '-';
    }
};

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