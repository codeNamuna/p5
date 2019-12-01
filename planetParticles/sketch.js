var movers = [];
var dots=20;

function setup() {
    createCanvas(innerWidth,innerHeight);
    stroke(255);
    fill(255);
    for(var i=0;i<dots;i++){
        movers.push(new Mover(width/2+random(-10*i,10*i),height/2+random(-10*i,10*i)));
    }
}

function draw() {
    background(85,172,239);
    var mousepos = createVector(mouseX,mouseY);
    noStroke();
    for(var i=0;i<dots;i++){
        movers[i].update();
        if(movers[i].checkBounds(mousepos)){
            movers[i] = new Mover(mouseX+random(-120,120), mouseY+random(-120,120));
            movers[i].checkBounds(mousepos);
        }
        movers[i].draw();
    }

    stroke(255,255,255,125);

    for(i=0;i<dots;i++){
        for(j=i;j<dots;j++){
            var p1 = movers[i];
            var p2 = movers[j];
            if(p1.pos.dist(p2.pos)<40){
                line(p1.pos.x,p1.pos.y,p2.pos.x,p2.pos.y);
            }
        }
    }
}

function Mover(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    this.update = function(){
        var mousepos = createVector(mouseX, mouseY);
        this.acc = p5.Vector.sub(mousepos,this.pos);
        this.acc.x += random(-5,5);
        this.acc.y += random(-5,5);
        this.acc.normalize();
        this.acc.mult(0.05);
        
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    this.draw = function(){
        ellipse(this.pos.x,this.pos.y,10,10);
    }

    this.checkBounds = function(mousepos){
        var distance = this.pos.dist(mousepos);
        var alp = map(distance,201,0,0,255);
        fill(255,255,255,alp);
        if(distance>200)
            return true;
        else
            return false;
    }
}

