let miCanvas; 
let figuras = []; 
const PALETTE = ["#DF80D1", "#B772FF", "#FFFFFF"]; 
let mensaje1 = "Diseño sin limites"; 
let mensaje2 = "Creatividad en movimiento"; 

function setup() {
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  miCanvas = createCanvas(windowWidth - scrollbarWidth, windowHeight);
  miCanvas.parent('padre-script'); 
  textAlign(CENTER, CENTER);
  ellipseMode(RADIUS); 
  rectMode(CENTER);    
  colorMode(RGB);      
}

function draw() {
  background(255);

  
  if (mouseIsPressed || (pmouseX !== mouseX && pmouseY !== mouseY)) {
    for (let i = 0; i < 2; i++) {
      agregarFigura(mouseX + random(-2, 2), mouseY + random(-2, 2), "circle");
    }
  }

  
  if (frameCount % 15 === 0) {
    agregarFigura(random(width), random(height), "circle");
  }

  
  if (frameCount % 30 === 0) {
    agregarFigura(random(width), random(height), "triangle");
  }

  
  if (frameCount % 20 === 0) {
    agregarFigura(random(width), -20, "square");
  }

  
  for (let i = figuras.length - 1; i >= 0; i--) {
    figuras[i].update();
    figuras[i].show();
    if (figuras[i].finished()) {
      figuras.splice(i, 1);
    }
  }

  
  push();
  fill(50);
  stroke(200, 100); 
  strokeWeight(2);
  textSize(48);
  textStyle(BOLD); 
  textFont("Special Gothic Expanded One");
  text(mensaje1, width / 2, height / 2 - 30); 
  textSize(24);
  textStyle(NORMAL);
  text(mensaje2, width / 2, height / 2 + 20);
  pop();
}


function agregarFigura(x, y, tipo) {
  if (tipo === "circle") {
    figuras.push(new CircleShape(x, y, random(PALETTE)));
  } else if (tipo === "square") {
    figuras.push(new SquareShape(x, y, random(PALETTE)));
  } else if (tipo === "triangle") {
    figuras.push(new TriangleShape(x, y, random(PALETTE)));
  }
}

function mousePressed() {
  agregarFigura(mouseX, mouseY, "circle");
  agregarFigura(mouseX, mouseY, "triangle");
}

class CircleShape {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = color(c);
    this.r = 2; 
    this.alpha = 255;
  }
  update() {
    this.r += 1; 
    this.alpha -= 4;
  }
  finished() {
    return this.alpha <= 0;
  }
  show() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.x, this.y, this.r); 
  }
}

class SquareShape {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = color(c);
    this.size = random(10, 25);
    this.alpha = 255;
    this.speed = random(1, 3);
  }
  update() {
    this.y += this.speed;
    this.alpha -= 2;
    this.size += 0.1;
  }
  finished() {
    return this.alpha <= 0 || this.y > height + this.size;
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(frameCount * 0.02); 
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    square(0, 0, this.size, 5); 
    pop();
  }
}

class TriangleShape {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = color(c);
    this.size = random(15, 30);
    this.alpha = 255;
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 2;
  }
  finished() {
    return this.alpha <= 0;
  }
  show() {
    stroke(0, this.alpha); 
    strokeWeight(1);
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);

    beginShape();
    vertex(this.x, this.y - this.size / 2);
    vertex(this.x - this.size / 2, this.y + this.size / 2);
    vertex(this.x + this.size / 2, this.y + this.size / 2);
    endShape(CLOSE);
  }
}
