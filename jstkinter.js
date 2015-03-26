/**
 *  This document is meant to be a Javascript version of TKinter
 *  Created on March 23, 2015 by Hallie Lomax
 **/

var pad = 8;

/**
 * Creating the wrapper
 **/
var wrap = document.createElement('div');
wrap.style.position = 'fixed';
wrap.style.height = '100%';
wrap.style.width = '100%';
document.body.appendChild(wrap);

/**
 * Converts a number to a px string.
 **/
Number.prototype.css_px = function(number) {
    return this.toString() + 'px';
}

/**
 * Converts a px string to an integer.
 **/
String.prototype.toInt = function() {
    var string = this.substr(0, this.length-2);
    return parseInt(string);
}

/**
 * Function for creating the canvas on which the user will be drawing.
 * @param {string} [id='canvas']
 * @param {string} [color='whitesmoke']
 * @param {number} [height=500]
 * @param {number} [width=500]
 **/
function Canvas(id, color, height, width) {
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
    div.style.top = '8px';
    div.style.left = '8px';
    
    
    div.style.background = color || 'whitesmoke';
    div.style.border = color || 'black';
    div.style.borderRadius = '2px';
    
    wrap.appendChild(div);
    
    this.div = div;
}

/**
 *  Returns the ID of a Canvas type
 **/
Canvas.prototype.getID = function() {
    return this.div.getAttribute('id');
};

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
    
    this.addVertLine = function(space) {
        vert_line = document.createElement('div');
        
        vert_line.style.height = height + 2;
        vert_line.style.width = '2px';
        vert_line.style.background = 'black';
        vert_line.style.position = 'fixed';
        vert_line.style.left = space.css_px();
        vert_line.setAttribute('class', 'grid');
        
        this.div.appendChild(vert_line);
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
    }
    
    var d_left = (this.div.style.left).toInt();
    for (var i = 0; i <= columns; i++) {
        this.addVertLine((i * col_space) + d_left);
    }
    
    var d_top = (this.div.style.top).toInt();
    for (var i = 0; i <= rows; i++) {
        this.addHorLine((i * row_space) + d_top);
    }
    
    this.isGrid = true;
    this.dimensions = [columns, rows];
    this.square_size = [col_space, row_space];
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
 * @param {string} [what_do='nothing']
 **/
Canvas.prototype.placeItem = function(item, width, height, what_do) {
    what_do = what_do || 'nothing';
    if (this.isGrid) {
        var i_height = (item.style.height).toInt();
        var i_width = (item.style.width).toInt();
        
        if (what_do == 'corner') {}
        else {
            var left = (this.square_size[0] - i_width) / 2;
            left += ((width-1) * this.square_size[0]);
            var top = (this.square_size[1] - i_height) / 2;
            top += ((height-1) * this.square_size[1]);
            
            item.style.left = (left + pad).css_px();
            item.style.top = (top + pad).css_px();
            
            this.div.appendChild(item);
        }
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
//Rectangle
//Line
//Curve
//MakeColor