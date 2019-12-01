function setup() {
    createCanvas(400,400);
}

function draw() {

    ellipseMode(CENTER);
    rectMode(CENTER);

    background(255,255,255);
    
    fill(255,0,0);
    rect(200,200,60,100);

    fill(0,0,255);
    ellipse(200,125,100,100);

    fill(0,255,0);
    ellipse(170,125,20,50);
    ellipse(200,125,20,50);

    line(170,250,165,275);
    line(230,250,245,275);

}