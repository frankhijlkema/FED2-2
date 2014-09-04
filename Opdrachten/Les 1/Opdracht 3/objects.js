// Object constructor
function Persoon(name) {
    this.name = name;

    this.speak = function() {
        console.log('Hello i am ' + this.name + '.');
    };
}

Persoon.prototype.walk = function() {
    console.log('Hello i am ' + this.name + ' and i\'m walking to the train station.');
};

Persoon.prototype.eat = function() {
    console.log('Hello i am ' + this.name + ' and i\'m eating a wrap.');
};

var bob = new Persoon('Bob');


// Object literal
var Person = {
    name: 'Bob',

    speak: function() {
        console.log('Hello i am ' + this.name + '.');
    },

    walk: function() {
        console.log('Hello i am ' + this.name + ' and i\'m walking to the train station.');
    },

    eat: function() {
        console.log('Hello i am ' + this.name + ' and i\'m eating a wrap.');
    }
};