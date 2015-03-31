var board;

function setBoard(canvas) {
    board = canvas;
}

//Robot
function Robot() {
    var body = new Circle(30, 'green');
    
    var left_eye = new Circle(5, 'white');
    left_eye.style.position = 'absolute';
    left_eye.style.top = '20%';
    left_eye.style.left = '75%';
    body.appendChild(left_eye);
    
    var right_eye = new Circle(5, 'white');
    right_eye.style.position = 'absolute';
    right_eye.style.top = '55%';
    right_eye.style.left = '75%';
    body.appendChild(right_eye);
    
    this.bot = body;
    this.direction = 'right';
}

Robot.prototype.placeBot = function(height, width) {
    this.position = [height, width];
    board.placeItem(this, height, width, true);
}


/**
 * Checks if the robot can move forward
 **/
Robot.prototype.canMove = function() {
    console.log(this.direction);
    var x = board.grid_x;
    var y = board.grid_y;
    
    switch(this.direction) {
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
}

/**
 * Function for moving the robot 'forward' to the next point in the grid.
 **/
Robot.prototype.moveForward = function() {
    var x = board.grid_x;
    var y = board.grid_y;
    
    var sx = board.square_size[0];
    var sy = board.square_size[1];
    
    switch(this.direction) {
        case "left":
            if (this.position[0] < x.length-1) {
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
            if (this.position[1] < y.length-1) {
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
}

var directions = ['right', 'down', 'left', 'up'];

Robot.prototype.turnRight = function() {
    var d = directions.indexOf(this.direction);
    d = (d+1)%4;
    var deg = d * 90;
    console.log(directions[d], d);
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
    console.log(d, directions[d]);
}

Robot.prototype.turnLeft = function() {
    var d = directions.indexOf(this.direction);
    d = (d+1)%4;
    var deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
    console.log(this.bot, d, directions[d]);
}

Robot.prototype.turnAround = function() {
    var d = directions.indexOf(this.direction);
    d = (d+1)%4;
    var deg = d * 90;
    this.direction = directions[d];
    this.bot.rotateClockwise(deg);
    console.log(d, directions[d]);
}