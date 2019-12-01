var branches = [];
var leaves = [];
var count = 0;

function setup() {
    createCanvas(400,400);
    stroke(255);
    var a = createVector(width/2, height);
    var b = createVector(width/2, height-100);
    var top = new Branch(a,b);
    branches.push(top);
}

function draw() {
    background(0);
    for(var i=0; i<branches.length;i++){
        branches[i].draw();
    }

    for(var j=0; j<leaves.length; j++){
        leaves[j].draw();
    }
}

function mousePressed(){

    if(count<6)
    {
        for(var i=branches.length-1; i>=0; i--){

            if(!branches[i].drawn){
                branches.push(branches[i].branchLeft());
                branches.push(branches[i].branchRight());
            }
            
            branches[i].drawn = true;
        }
    }

    if(count==6){
        for(var i=branches.length-1; branches[i].drawn==false ; i--){
            leaves.push(new Leaf(branches[i].end.x, branches[i].end.y));
        } 
    }

    count++;
}

function Branch(begin, end){
    this.begin = begin;
    this.end = end;
    this.drawn = false;
    
    this.draw = function(){
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.branchLeft = function(){
        var v = p5.Vector.sub(this.end, this.begin);
        v.rotate(-PI/6);
        v.mult(0.67);
        var end = p5.Vector.add(this.end, v);
        var b = new Branch(this.end, end);
        return b;
    }

    this.branchRight = function(){
        var v = p5.Vector.sub(this.end, this.begin);
        v.rotate(PI/6);
        v.mult(0.67);
        var end = p5.Vector.add(this.end, v);
        var b = new Branch(this.end, end);
        return b;
    }

}

function Leaf(x,y){
    this.x = x;
    this.y = y;
    this.velocity = 0.5;

    this.draw = function(){
        noStroke();
        fill(255,0,255,125);
        ellipse(this.x,this.y,10,10);
    }
}