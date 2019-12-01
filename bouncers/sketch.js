var bubbles = [];

function setup() {
    createCanvas(windowWidth-10,windowHeight-10);
}

function draw() {

    ellipseMode(CENTER);
    rectMode(CENTER);

    background(255,255,255);

    for(var i=bubbles.length-1; i>=0; i--){
        bubbles[i].move();
        bubbles[i].draw();
        bubbles[i].checkBounds();
    }
}

function mousePressed(){
    bubbles.push(new bubble(mouseX, mouseY));
}

function bubble(x,y){
    this.x=x;
    this.y=y;
    this.velocity=1;
    this.acceleration=1;

    this.move = function(){
        this.y += this.velocity;
        this.velocity += this.acceleration;
    }

    this.draw = function(){
        noStroke();
        fill(0);
        ellipse(this.x,this.y,20,20);
    }

    this.checkBounds= function(){
        if(this.y >= height){
            this.y-=5;
            this.velocity = -this.velocity * 0.8;
        }

        if(this.y <= 0){
            this.y+=5;
            this.velocity = -this.velocity * 0.8;
        }
    }
}