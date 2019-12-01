var scl = 20;
var rows=0;
var cols=0;
var c=0;

function setup() {
    createCanvas(windowWidth,windowHeight,WEBGL);
    rows=height/scl;
    cols=width/scl;
}

function draw() {
    background(0);
    stroke(255);    
    fill(255);
    c+=0.1;
    
    //rotateX(-PI/3);
    translate(-width/2, -height/2);
    
    for(var y=0; y<rows-1; y++){
        beginShape();
        for(var x=0; x<cols; x++){
            vertex(x*scl, y*scl,noise(x,y-c)*60);
            vertex(x*scl, (y+1)*scl,noise(x,y+1-c)*60);
        }
        endShape();
    }
}