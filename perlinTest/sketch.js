var c=0;

function setup() {
    createCanvas(100,100);
}

function draw() {
    background(255);
    c+=0.01;

    for(var y=0; y<height; y++){
        for(var x=0; x<width; x++){
            var val = noise(x*0.01 + c,y*0.01);
            if(val>0.75)
            stroke(0);

            else if(val>0.5)
            stroke(125);

            else
            stroke(255);
            
            point(x,y);
        }
    }
}