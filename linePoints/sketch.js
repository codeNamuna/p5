var bubbles=[];

function setup() {
    createCanvas(windowWidth-10,windowHeight-10);
}

function draw() {
    ellipseMode(CENTER);
    rectMode(CENTER);

    background(255);

    for(var i=bubbles.length-1;i>=0;i--){
        bubbles[i].draw();
        bubbles[i].move();
        
        if(i!=0){
            liner(bubbles[i-1],bubbles[i]);
        }
    }
}

function mousePressed(){
    bubbles.push(new bubble(mouseX,mouseY,random(5,10)));
}

function liner(bub1,bub2){
    stroke(0);
    line(bub1.x,bub1.y,bub2.x,bub2.y);
}

function bubble(x,y,rad){
    this.x=x;
    this.y=y;
    this.rad=rad;
    this.draw = function(){
        fill(0,0,0);
        noStroke();
        ellipse(this.x,this.y,2*this.rad,2*this.rad);
    }
    
    this.move= function(){
        this.x=this.x+random(-1,1);
        this.y=this.y+random(-1,1);
    }
}