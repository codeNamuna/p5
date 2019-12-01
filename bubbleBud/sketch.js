var inc = Math.floor(640/40);
var rows = Math.floor(480/inc);
var cols = Math.floor(640/inc);
var bubs =[];
var lines=[];

function setup() {
    ellipseMode(CENTER);
    var rescan = createCanvas(640,480);
    rescan.position((windowWidth - width)/2,(windowHeight - height)/2);
    for(var i=0; i<rows; i++){
        for(var j=0;j<cols;j++){
            bubs.push(new PosBubble(j*inc, i*inc));
        }
    }
}

function draw() {
    background(85,172,239);
    lines=[];
    context.drawImage(video, 0, 0, 640, 480);
    var imgData = context.getImageData(0,0,640,480);
    var t=0;
    for (var i = 0; i < imgData.data.length; i += 4*inc) {
        var gray = imgData.data[i]*0.3+imgData.data[i + 1]*0.59+imgData.data[i + 2]*0.11;
        gray = (gray > 85)?50:255;
        imgData.data[i] = gray;
        imgData.data[i + 1] = gray;
        imgData.data[i + 2] = gray;
        imgData.data[i + 3] = 255;

        if(i%(4*640)==0){
            i+=640*4*(inc-1);
        }

        if(t<bubs.length)
            bubs[t].alp = gray;
        
        t++;
    }
    
    //context.putImageData(imgData, 0, 0);

    for(i=0;i<bubs.length;i++){
        if(bubs[i].alp == 255){
            if(i<bubs.length-1 && (i+1)%cols!=0 && floor((i+1)/cols)<rows-1)
            {
                lines.push(new Line(bubs[i],bubs[i+1]));
                lines.push(new Line(bubs[i],bubs[i+cols]));
                lines.push(new Line(bubs[i],bubs[i+1+cols]));
            }
        }
        bubs[i].move();
        bubs[i].draw();
    }

    for(i=0;i<lines.length;i++){
        lines[i].draw();
    }
}

function PosBubble(x,y){
    this.pos = createVector(x,y);
    this.permpos = createVector(x,y);
    this.alp = 50;

    this.draw = function(){
        stroke(255,255,255,this.alp);
        fill(255,255,255,this.alp);
        ellipse(this.pos.x, this.pos.y, 2, 2);
    }

    this.move = function(){
        this.pos.x = this.permpos.x + random(-1,1);
        this.pos.y = this.permpos.y + random(-1,1);
    }
}

function Line(p1,p2){
    this.p1=p1;
    this.p2=p2;

    this.draw = function(){
        stroke(255,255,255,125);
        fill(255,255,255,125);
        line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
    }
}