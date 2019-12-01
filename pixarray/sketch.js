var density=50;
var rows = Math.ceil(innerHeight/density)+1;
var columns = Math.ceil(innerWidth/density)+1;
var pixs = [];
var lines = [];
var terrain=[];
var terraindensity=100;
var t=0;
function setup() {
    createCanvas(innerWidth,innerHeight);
    fill(255);
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            pixs.push(new Pix(j*density,i*density));
        }
    }

    for(i=0;i<rows;i++){
        for(j=0; j<columns;j++){
            if(j!=columns-1)
            lines.push(new Line(pixs[i*(columns) + j], pixs[i*(columns) + j + 1]));
            if(i!=rows-1)
            lines.push(new Line(pixs[i*(columns) + j], pixs[(i+1)*(columns) + j]));
            if(j!=0 && i!=rows-1)
            lines.push(new Line(pixs[i*(columns) + j], pixs[(i+1)*(columns) + j-1]));
            if(i!=rows-1 && j!=columns-1)
            lines.push(new Line(pixs[i*(columns) + j], pixs[(i+1)*(columns) + j + 1]));
        }
    }

    for(i=0;i<terraindensity;i++){
        terrain.push(new Terrain(random(0,width),random(0,height),random(0.1,0.15)));
    }
}

function draw() {
    background(0,172,238);
    ellipseMode(CENTER);
    stroke(255);

    var mouse = createVector(mouseX, mouseY);
    for(var i=0;i<terraindensity;i++){
            terrain[i].move(t);
    }

    t+=0.02;

    for(i=0;i<rows*columns;i++)
    {
        pixs[i].move(mouse,0.1);
        for(var j=0;j<terraindensity;j++){
            pixs[i].move(terrain[j].pos,terrain[j].z);
        }

        pixs[i].draw();
    }

    for(i=0;i<lines.length;i++){
        lines[i].draw();
    }
}

function Pix(x,y){
    this.pos=createVector(x,y);
    this.temppos=createVector(x,y);
    this.tempposprev=createVector(x,y);
    this.alp = 255;

    this.draw = function(){
        fill(255,255,255,this.alp);
        ellipse(this.temppos.x, this.temppos.y, 3,3);
        this.tempposprev=createVector(this.temppos.x, this.temppos.y);
        this.temppos=createVector(this.pos.x, this.pos.y);
    }

    this.move = function(move, z){
        var vec=createVector(this.pos.x, this.pos.y);
        vec.sub(move);
        vec.normalize();
        var diff = p5.Vector.dist(this.pos, move);
        if(diff<=1000*z)
        {   
            vec.mult((1000*z-diff)*z); 
            this.temppos.add(vec);
        }
    }
}

function Line(p1, p2){
    this.p1=p1;
    this.p2=p2;

    this.draw = function(){
        stroke(255);
        line(this.p1.tempposprev.x,this.p1.tempposprev.y,this.p2.tempposprev.x,this.p2.tempposprev.y);
    }
}

function Terrain(x,y,z){
    this.pos=createVector(x,y);
    this.z=z;

    this.move = function(t){
        this.pos.add(createVector(noise(t+this.pos.x),noise(t+this.pos.y)));
    }
}