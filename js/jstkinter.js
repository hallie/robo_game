/**
 *  This document is meant to be a Javascript version of TKinter
 *  Created on March 23, 2015 by Hallie Lomax
 **/

/**
 * Converts a number to a px string.
 **/
Number.prototype.css_px = function() {
    return this.toString() + 'px';
}

/**
 * Converts a px string to an integer.
 **/
String.prototype.toInt = function() {
    var string = this.substr(0, this.length-2);
    return parseFloat(string);
}

/**
 * Function for creating the canvas on which the user will be drawing.
 * @param {string} [id='canvas']
 * @param {string} [color='whitesmoke']
 * @param {number} [height=500]
 * @param {number} [width=500]
 * @param {bool} [grid=false]
 **/
function Canvas(id, color, height, width, grid) {
    CANVAS_ID = id || 'canvas';
    var catchCanvasError = function(param) {
        if (typeof param == 'number') {
            return param.css_px();
        }
        return '500px';
    }
    var div = document.createElement("div");
    div.setAttribute('id', CANVAS_ID);
    
    var height = catchCanvasError(height);
    var width = catchCanvasError(width);
    
    div.style.height = height;
    div.style.width = width;
    div.style.top = 0;
    div.style.left = 0;
    div.style.position = 'absolute';
    
    
    div.style.background = color || 'whitesmoke';
    div.style.border = color || 'black';
    div.style.borderRadius = '2px';
    
    wrap.appendChild(div);
    
    this.div = div;
    this.grid = [];
}

/**
 * Adds a title bar to the canvas
 * @param {string} title
 **/
Canvas.prototype.makeHeader = function(title) {
    var bar = document.createElement('div');
    bar.style.position = 'fixed';
    bar.style.width = this.div.width;
    bar.style.height = '50px';
    bar.style.background = 'black';
    bar.style.color = 'white';
    bar.innerHTML = title;
    
    this.div.top = '50px';
    wrap.appendChild(bar);
}

/**
 * Makes the cavas into a grid
 * @param {number} [columns=5]
 * @param {number} [rows=5]
 **/
Canvas.prototype.makeGrid = function(columns, rows) {
    columns = columns || 5;
    rows = rows || columns;
    var height = (this.div.style.height).toInt();
    var width = (this.div.style.width).toInt();
    
    var col_space = width / columns;
    var row_space = height / rows;
    
    this.isGrid = true;
    this.dimensions = [columns, rows];
    this.square_size = [col_space, row_space];
    
    this.addVertLine = function(space) {
        vert_line = document.createElement('div');
        
        vert_line.style.height = height + 2;
        vert_line.style.width = '2px';
        vert_line.style.background = 'black';
        vert_line.style.position = 'absolute';
        vert_line.style.left = space.css_px();
        vert_line.setAttribute('class', 'grid');
        
        this.div.appendChild(vert_line);
        this.grid.push(vert_line);
    }
    
    this.addHorLine = function(space) {
        hor_line = document.createElement('div');
        
        hor_line.style.width = width + 2;
        hor_line.style.height = '2px';
        hor_line.style.background = 'black';
        hor_line.style.position = 'fixed';
        hor_line.style.top = space.css_px();
        hor_line.setAttribute('class', 'grid');
        
        this.div.appendChild(hor_line);
        this.grid.push(hor_line);
    }
    
    var d_left = (this.div.style.left).toInt();
    for (var i = 0; i <= columns; i++) {
        this.addVertLine((i * col_space) + d_left);
    }
    
    var d_top = (this.div.style.top).toInt();
    for (var i = 0; i <= rows; i++) {
        this.addHorLine((i * row_space) + d_top);
    }
}

/**
 * Function for removing the grid from the canvas
 **/
Canvas.prototype.removeGrid = function() {
    while (this.grid.length > 0) {
        this.div.removeChild(this.grid.pop());
    }
}


//Button
//Checkbutton
//Entry
//Frame
//Label
//Listbox
//Menubutton
//Message
//Radiobutton
//Scale
//Scrollbar
//Text
//Toplevel
//Spinbox
//PanedWindow
//LabelFrame
//tkMessageBox

/**
 * Adds an element to the canvas at a given postion.
 * @param {HTMLDivElement} item
 * @param {number} height
 * @param {number} width
 * @param {string} [corner=false]
 **/
Canvas.prototype.placeItem = function(item, width, height, corner) {
    if (item.constructor == Robot) {
        item = item.bot;
    }
    corner = corner || false;
    if (this.isGrid) {
        var i_height = (item.style.height).toInt();
        var i_width = (item.style.width).toInt();
        
        if (corner) {
            var top = 0 - (i_height / 2);
            top += ((height-1) * this.square_size[1]);
            var left = 0 - (i_width / 2);
            left += ((width-1) * this.square_size[0]);
        }
        else {
            var left = (this.square_size[0] - i_width) / 2;
            left += ((width-1) * this.square_size[0]);
            var top = (this.square_size[1] - i_height) / 2;
            top += ((height-1) * this.square_size[1]);
        }
        
        item.style.left = left.css_px();
        item.style.top = top.css_px();
            
        this.div.appendChild(item);
    }
    else {
        item.style.top = height;
        item.style.left = width;
        this.div.appendChild(item);
    }
}

//Circle
function Circle(radius, color) {
    radius = radius || 50;
    var circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.background = color || 'red';
    circle.style.borderRadius = '50%';
    circle.style.height = (radius*2).css_px();
    circle.style.width = (radius*2).css_px();
    
    return circle;
}

//Oval
function Oval(x_radius, y_radius, color) {
    x_radius = x_radius || 50;
    y_radius = y_radius || x_radius;
    var oval = document.createElement('div');
    oval.style.position = 'fixed';
    oval.style.background = color || 'red';
    oval.style.borderRadius = '50%';
    oval.style.height = (y_radius*2).css_px();
    oval.style.width = (x_radius*2).css_px();
    
    return oval;
}

//Square
function Square(height, color) {
    height = height || 50;
    var square = document.createElement('div');
    square.style.position = 'fixed';
    square.style.background = color || 'black';
    square.style.height = height.css_px();
    square.style.width = height.css_px();
    
    return square;
}

//Rectangle
function Rectangle(height, width, color) {
    var rectangle = document.createElement('div');
    rectangle.style.position = 'fixed';
    rectangle.style.background = color || 'black';
    rectangle.style.height = (height || 50).css_px();
    rectangle.style.width = (width || 50).css_px();
    
    return rectangle;
}

//Line
//Curve
//MakeColor

//Rotate
HTMLDivElement.prototype.rotateClockwise = function(degrees) {
    var div = this;
    
    div.style.webkitTransform = 'rotate(' + degrees + 'deg)'; 
    div.style.mozTransform    = 'rotate(' + degrees + 'deg)'; 
    div.style.msTransform     = 'rotate(' + degrees + 'deg)'; 
    div.style.oTransform      = 'rotate(' + degrees + 'deg)'; 
    div.style.transform       = 'rotate(' + degrees + 'deg)';
    
    div.parentNode.appendChild(div);
}