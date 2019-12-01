var bubbles = [];
var z=0.99; //collision efficiency between particles
var u=1; //collision efficiency between particle and wall

function setup() {
    createCanvas(windowWidth-10,windowHeight-10);
    for(var i=0;i<100;i++){
        bubbles.push(new bubble(random(0,width), random(0,height)));
    }
}

function draw() {

    ellipseMode(CENTER);
    rectMode(CENTER);

    background(255,255,255);

    var i=0;
    var vel=0;

    for(i=bubbles.length-1; i>=0; i--){
        bubbles[i].move();
        bubbles[i].draw();
        vel+=dist(bubbles[i].velocityx, bubbles[i].velocityy,0,0);
        bubbles[i].checkBounds();
    }

    console.log(vel/100);

    for(i=0; i<bubbles.length-1;i++){
        for(var j=i+1; j<bubbles.length; j++){
            bubbles[i].checkCollision(bubbles[j]);
        }
    }
}

function mousePressed(){
    bubbles.push(new bubble(mouseX, mouseY));
}

function bubble(x,y){
    this.x=x;
    this.y=y;
    this.velocityx=random(-10,10);
    this.velocityy=random(-10,10);
    this.intersecting=false;

    this.move = function(){
        this.y += this.velocityy;
        this.x += this.velocityx 
    }

    this.draw = function(){
        stroke(0);
        ellipse(this.x,this.y,20,20);
    }

    this.checkBounds= function(){
        if(this.y-10 >= height){
            //this.y = 0;
            this.velocityy = -this.velocityy*u;
        }

        if(this.y+10 <= 0){
            //this.y=height;
            this.velocityy = -this.velocityy*u;
        }

        if(this.x-10 >= width){
            //this.x = 0;
            this.velocityx = -this.velocityx*u;
        }

        if(this.x+10 <= 0){
            //this.x=width;
            this.velocityx = -this.velocityx*u;
        }
    }

    this.checkCollision = function(bub2){
        if(dist(this.x,this.y,bub2.x,bub2.y) < 20){

            if(!this.intersecting){
                var t = this.velocityx;
                this.velocityx = bub2.velocityx*z;
                bub2.velocityx = t*z;

                t = this.velocityy;
                this.velocityy = bub2.velocityy*z;
                bub2.velocityy = t*z;
                
                this.intersecting = true;
            }
        }

        else{
            this.intersecting = false;
        }

    }
}