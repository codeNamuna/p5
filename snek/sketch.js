var snek = [];
var fud = [];
var rows=0;
var cols=0;
var length = 1;
var xvelocity = 1;
var yvelocity =0;

function setup() {
    createCanvas(innerWidth,innerHeight);
    frameRate(10);
    background(0);
    rows=floor(height/25);
    cols=floor(width/25);
    snek.push(new Snekhead((cols/2)*25,(rows/2)*25));
}

function draw() {
    background(0);
    ellipseMode(CENTER);
    rectMode(CENTER);

    var currhead = snek[snek.length-1];
    snek.push(new Snekhead(currhead.x,currhead.y));
    currhead = snek[snek.length-1];
    currhead.move();

    snek.splice(0,snek.length-length);

    for(var i=0;i<snek.length-1;i++){
        if(currhead.checkCollision(snek[i]))
        {
            snek.splice(0,length-1);
            length=1;
            break;
        }
    }

    if(frameCount%20==0)
    fud.push(new Food(round(random(1,cols-1))*25,round(random(1,rows-1))*25,frameCount));

    for(i=0; i<snek.length; i++){
        snek[i].draw();
    }

    for(i=fud.length-1;i>=0;i--){
        if(currhead.checkCollision(fud[i]))
        {
            fud.splice(i,1);
            length++;  
        }
        else
        {
            if(fud[i].checkTime()){
                fud.splice(i,1);
            }

            else{
                fud[i].draw();
            }
        }
    }

}

function keyPressed(){
    if(keyCode == UP_ARROW && yvelocity!=1){
        yvelocity=-1;
        xvelocity=0;
    }
    else if(keyCode == DOWN_ARROW && yvelocity!=-1){
        yvelocity=1;
        xvelocity=0;
    }
    else if(keyCode == LEFT_ARROW && xvelocity!=1){
        xvelocity=-1;
        yvelocity=0;
    }
    else if(keyCode == RIGHT_ARROW && xvelocity!=-1){
        xvelocity=1;    
        yvelocity=0;
    }
}

function Snekhead(x,y){
    this.x=x;
    this.y=y;
    
    this.draw = function(){
        fill(255);
        stroke(0);
        rect(this.x,this.y,25,25);
    }

    this.move = function(){
        this.x += xvelocity*25;
        this.y += yvelocity*25;

        if(this.x>width)
            this.x = 0;
        if(this.x<0)
            this.x = cols*25;
        if(this.y>height)
            this.y = 0;
        if(this.y<0)
            this.y = rows*25; 
    }

    this.checkCollision = function(food){
        if((abs(food.x - this.x)<1)&&(abs(food.y - this.y)<1))
            return true;
        return false;
    }
}

function Food(x,y,fc){
    this.x=x;
    this.y=y;
    this.fc=fc;
    
    this.draw = function(){
       fill(255,0,0);
       stroke(0);
       rectMode(CENTER);
       rect(this.x,this.y,25,25); 
    }

    this.checkTime = function(){
        if((frameCount-this.fc)>30)
            return true;
        return false;
    }
}
