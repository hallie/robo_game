/*jslint browser: true*/
/*global $, console, makeGameBoard*/

var level_1 = [
    ['r', '-', '-', '-', '-', '-'],
    ['*', '*', '*', '*', '-', '*'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', '-', 'p', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-'],
    ['-', 'p', '-', '-', 'd', '-']
];

var robot;

$(document).ready(function () {
    "use strict";
    robot = makeGameBoard(level_1);
});

$(document).ready(function () {
    "use strict";
    $(document).keydown(function (key) {
        switch (parseInt(key.which, 10)) {
			// Left arrow key pressed
        case 37:
            robot.turnLeft();
            break;
            // Up Arrow Pressed
        case 38:
            robot.moveForward();
            break;
            // Right Arrow Pressed
        case 39:
            robot.turnRight();
            break;
            // Down Arrow Pressed
        case 40:
            robot.turnAround();
            break;
		}
	});
});

/**
$(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
			// Left arrow key pressed
			case 37:
				$(robot.bot).animate({left: "-=10px"}, 'slow');
				break;
			// Up Arrow Pressed
			case 38:
				$(robot.bot).animate({top: "-=10px"}, 'fast');
				break;
			// Right Arrow Pressed
			case 39:
			    $(robot.bot).animate({left: "+=10px"}, 'fast');
				break;
			// Down Arrow Pressed
			case 40:
			    $(robot.bot).animate({top: "+=10px"}, 'fast');
				break;
		}
	});
**/