var keys = require('./keyboard.js'); // Access Keyboard Class
var EventEmitter = require('events').EventEmitter; // Access the Event Emitter Class
var util = require('util'); // Access Node's API

// Snake Class Template with 6 creation parameters
var Snake = function (id, x, y, color_hex, width, height) {
    this.id = id;
    this.color = color_hex;
    this.head = {x: x, y: y};
    this.pieces = [this.head];
    this.width = width || 16;
    this.height = height || 16;
    this.readyToGrow = false;
    this.input = {};
};

// Definition of Snake events
Snake.events = {
    POWER_UP: 'Snake:powerup',
    COLLISION: 'Snake:collision'
};

// inherits snake methods into EventEmitter constructor
util.inherits(Snake, EventEmitter);

// Creation of setKey Method for the Snake Class
Snake.prototype.setKey = function (key) {
       this.input[keys.UP] = false;
       this.input[keys.DOWN] = false;
       this.input[keys.LEFT] = false;
       this.input[keys.RIGHT] = false;
       this.input[key] = true;
};

Snake.prototype.update = function (delta) {

    if (this.readyToGrow) {
        this.pieces.push({x: -10, y: -10});
        this.readyToGrow = false;
       }
    for (var len = this.pieces.length, i = len - 1; i > 0; i--) {
         this.pieces[i].x = this.pieces[i - 1].x;
         this.pieces[i].y = this.pieces[i - 1].y;
    }
    if (this.input[keys.LEFT]) {
        this.head.x += -1;
    }   else if (this.input[keys.RIGHT]) {
        this.head.x += 1;
    }   else if (this.input[keys.UP]) {
        this.head.y += -1;
    }   else if (this.input[keys.DOWN]) {
        this.head.y += 1;
￼    }
};

// Creation of Collison Method
Snake.prototype.checkCollision = function(){
    var collide = this.pieces.some(function(piece, i){
         return i > 0 && piece.x === this.head.x && piece.y === this.piece.y
    }, this);
    if (collide) {
       this.emit(Snake.events.COLLISION, {id: this.id, point: this.
       head, timestamp: performance.now()});
       }
};

// Creation of Snake Growth Method
Snake.prototype.grow = function() {
    this.readyToGrow = true;
    this.emit(Snake.events.POWER_UP, {id: this.id, size: this.pieces.
    length, timestamp: performance.now()});
};

// Make this Class Available to app.js
module.exports = Snake;
