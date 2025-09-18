let miCanvas
function setup() {
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    miCanvas = createCanvas(windowWidth - scrollbarWidth, windowHeight);
    miCanvas.parent('padre-script'); 
    
}

function draw() {
    background("black");
}