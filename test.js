var canvas = new Canvas(null, null, 500, 500);

canvas.makeGrid(7);

var circle = new Circle(20);
canvas.placeItem(circle, 2, 3);

var oval = new Oval(30, 20, 'grey');
canvas.placeItem(oval, 3, 5);

canvas.placeItem(oval, 4, 4);