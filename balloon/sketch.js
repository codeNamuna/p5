var balloons=[];
var count = 10;
var time=0;

function setup() {
    createCanvas(innerWidth,innerHeight);
    ellipseMode(CENTER);
    for(var i=0; i<count; i++)
        balloons.push(new Balloon(0,0,random(20,50)));
}

function draw() {
    background(255);
    var wind = createVector(0.3,0);
    for(var i=0;i<count;i++){
        balloons[i].addForce(wind);
        var gravity = createVector(0,0.3);
        gravity.mult(balloons[i].mass);
        balloons[i].addForce(gravity);
        balloons[i].update();
        balloons[i].checkBounds();
        balloons[i].draw();
    }

    time+=0.01;
}

function Balloon(x,y,mass){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = mass;

    this.update = function(){
        this.vel.add(this.acc);
        //this.vel.limit(10);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.addForce = function(force){
        var forcex = createVector(force.x, force.y);
        forcex.div(mass);
        this.acc.add(forcex);
    }

    this.draw = function(){
        stroke(0);
        fill(125);
        ellipse(this.pos.x,this.pos.y,mass,mass);
    }

    this.checkBounds = function(){
        if(this.pos.x<0 || this.pos.x>width){
            this.vel.x = -0.99*this.vel.x;
        }

        if(this.pos.y<0 || this.pos.y>height){
            this.vel.y = -this.vel.y;
        }
    }
}