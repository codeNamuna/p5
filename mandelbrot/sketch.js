function setup() {
createCanvas(windowHeight,windowHeight);
    background(255);
    for(var i=0;i<height;i++){
        for(var j=0;j<width;j++){
            var l = map(i,0,height,-1.5,1.5);
            var k = map(j,0,width,-2.0,1.0);
            var iter = 0;

            var tk=k;
            var tl=l;
            var z=sqrt(tk*tk + tl*tl);

            while(abs(z)<4){
                z=sqrt(tk*tk + tl*tl);
                var temp = tk;
                tk = tk*tk - tl*tl + k;
                tl = 2*temp*tl + l;
                iter++;
                if(iter>=100){
                    break;
                }
            }
            noStroke();
            fill(map(iter,0,100,255,0));
            ellipse(j,i,1,1); 
        }
    }

    console.log("done");
}

function draw() {
    
}