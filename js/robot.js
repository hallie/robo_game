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

/**
 * Function for moving the robot 'forward' to the next point in the grid.
 **/
Robot.prototype.moveForward = function(canvas) {
    var bot = this.bot;
    var start_x = bot.style.left.toInt();
    var start_y = bot.style.top.toInt();
    var dir, goal;
    
    l_r = function() {
        $(bot).animate({left: '+=' + dir.css_px()}, 500);
    }
    u_d = function() {
        $(bot).animate({top: '+=' + dir.css_px()}, 500);
    }
    
    if (this.direction == 'left') {
        goal = start_x - canvas.square_size[0];
        if (goal > 0) {
            dir = (canvas.square_size[0] * -1);
            l_r(dir);
        }
        else {
            console.log("Cannot move forward!");
        }
    }
    else if (this.direction == 'right') {
        goal = start_x + canvas.square_size[0];
        console.log(goal, canvas.div.style.width.toInt());
        if (goal < canvas.div.style.width.toInt()) {
            dir = canvas.square_size[0];
            l_r(dir);
        }
        else {
            console.log("Cannot move forward!");
        }
    }
    else if (this.direction == 'up') {
        goal = start_y - canvas.square_size[1];
        if (goal > 0) {
            dir = (canvas.square_size[0] * -1);
            u_d(dir);
        }
        else {
            console.log("Cannot move forward!");
        }
    }
    else {
        goal = start_y + canvas.square_size[1];
        if (goal < canvas.div.style.width.toInt()) {
            dir = canvas.square_size[1];
            u_d(dir);
        }
        else {
            console.log("Cannot move forward!");
        }
    }
}

Robot.prototype.moveOnce = function() {
    var robot = this;
    var i = 0, steps = 1;
    var move = setInterval(function() {
        if (i < steps) {
            robot.moveForward(canvas);
            i++;
        }
        else {
            clearInterval(move);
            i = 0;
        }
    }, 1000);
}

var directions = ['right', 'down', 'left', 'up'];

Robot.prototype.turnRight = function() {
    var d = directions.indexOf(this.direction);
    d = (d+1)%4;
    this.direction = directions[d];
    this.bot.rotateClockwise(90);
    console.log(d, directions[d]);
}

Robot.prototype.turnLeft = function() {
    var d = directions.indexOf(this.direction);
    d = (d+1)%4;
    this.direction = directions[d];
    this.bot.rotateClockwise(90);
    console.log(this.bot, d, directions[d]);
}

Robot.prototype.turnAround = function() {
    var d = directions.indexOf(this.direction);
    d = (d+1)%4;
    this.direction = directions[d];
    this.bot.rotateClockwise(90);
    console.log(d, directions[d]);
}
