let miCanvas
function setup() {
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    miCanvas = createCanvas(windowWidth - scrollbarWidth, windowHeight);
    miCanvas.parent('padre-script'); 
    
}

let circles = [];
let squares = [];
let palette = ["#DF80D1", "#B772FF", "#FFFFFF"];



function draw() {
  background("#ffffff");

  // Circulitos del mouse
  circles.push(new Circle(mouseX, mouseY, random(palette)));
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].show();
    if (circles[i].finished()) {
      circles.splice(i, 1);
    }
  }

  // Cuadraditos que caen
  if (frameCount % 20 === 0) {
    squares.push(new Square(random(width), -20, random(palette)));
  }

  for (let i = squares.length - 1; i >= 0; i--) {
    squares[i].update();
    squares[i].show();
    if (squares[i].finished()) {
      squares.splice(i, 1);
    }
  }
}

// --- Clases ---
class Circle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = color(c);
    this.r = 5;
    this.alpha = 255;
  }

  update() {
    this.r += 1.5;
    this.alpha -= 4;
  }

  finished() {
    return this.alpha <= 0;
  }

  show() {
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}

class Square {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = color(c);
    this.size = random(10, 25);
    this.alpha = 255;
    this.speed = random(1, 3);
  }

  update() {
    this.y += this.speed;
    this.alpha -= 2;
    this.size += 0.1; // crece un poquito
  }

  finished() {
    return this.alpha <= 0 || this.y > height + this.size;
  }

  show() {
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }
}

