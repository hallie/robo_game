/**
 * File for handling the creation and the actions of the robot, using what I
 *   defined in jskinter.js
 **/

var board;

/**
 * Sets the board used in the implementation of board.js equal to whatever
 *   canvas is passed through this function.
 **/
function setBoard(canvas) {
    "use strict";
    board = canvas;
}

//Robot
function Robot() {
    "use strict";
    var body, left_eye, right_eye;
    
    body = new Circle(30, 'green');
    
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
    var x, y;
    x = board.grid_x;
    y = board.grid_y;
    
    switch (this.direction) {
    
    case "left":
        if (this.position[0] > 0) {
            return true;
        }
        break;
    case "right":
        if (this.position[0] < x.length) {
            return true;
        }
        break;
    case "up":
        if (this.position[1] > 0) {
            return true;
        }
        break;
    default:
        if (this.position[1] < y.length) {
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
        if (this.position[0] < x.length - 1) {
            $(this.bot).animate({left: '-=' + sx.css_px()}, 500);
            this.position[0] -= 1;
        }
        break;
    case "right":
        if (this.position[0] > 0) {
            $(this.bot).animate({left: '+=' + sx.css_px()}, 500);
            this.position[0] += 1;
        }
        break;
    case "up":
        if (this.position[1] < y.length - 1) {
            $(this.bot).animate({left: '-=' + sx.css_px()}, 500);
            this.position[1] -= 1;
        }
        break;
    default:
        if (this.position[1] > 0) {
            $(this.bot).animate({left: '+=' + sx.css_px()}, 500);
            this.position[1] += 1;
        }
    }
};

var directions = ['right', 'down', 'left', 'up'];

Robot.prototype.turnRight = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = (d + 1) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

Robot.prototype.turnLeft = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = (d + 1) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};

Robot.prototype.turnAround = function () {
    "use strict";
    var d, deg;
    
    d = directions.indexOf(this.direction);
    d = (d + 1) % 4;
    deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
};