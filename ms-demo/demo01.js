//set up the class GameObject
class GameObject {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}

//this class will extend the GameObject's inherent class
class Movable extends GameObject {
  constructor(x, y, type) {
    super(x, y, type);
  }

  //this movable object can be moved on the screen
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}

//this is a specific class that extends the Movavle class
class Hero extends Movable {
  constructor(x, y) {
    super(x, y, "Hero");
  }
}

// this class, on the other hand, only inherits the GameObject
class Tree extends GameObject {
  constructor(x, y) {
    super(x, y, "Tree");
  }
}

// a hero can move...
const hero = new Hero();
hero.moveTo(5, 5);

// but a tree cannot
const tree = new Tree();

// another method of game making is Composition

//create a constant gameObject
const gameObject = {
  x: 0,
  y: 0,
  type: "",
};

//... and a constant movable
const movable = {
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  },
};

//then the constant movableObject is composed of the gameObject and movable
const movableObject = { ...gameObject, ...movable };

//then create a function to create a new Hero who inherits the movableObject properties
function createHero(x, y) {
  return {
    ...movableObject,
    x,
    y,
    type: "Hero",
  };
}

//...and a static object that inherits only the gameObject
function createStatic(x, y, type) {
  return {
    ...gameObject,
    x,
    y,
    type,
  };
}

// create the hero and move it
const hero = createHero(10, 10);
hero.moveTo(5, 5);

//and create a static tree which only stands around
const tree = createStatic(0, 0, "Tree");

//Pub/Sub stands for 'publish-subscribe'

//set up an EventEmitter class that contains listeners
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  // when a message is received, let the listener to handle its payload
  on(message, listener) {
    if (!this.listeners[message]) {
      this.listeners[message] = [];
    }
    this.listeners[message].push(listener);
  }
  //when a message is sent, send it to a listener with some payload
  emit(message, payload = null) {
    if (this.listeners[message]) {
      this.listeners[message].forEach((l) => l(message, payload));
    }
  }
}
