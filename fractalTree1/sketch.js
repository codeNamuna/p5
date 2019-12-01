var angle = 0;
var sld;
function setup() {
    createCanvas(400,400);
    stroke(255);
    sld = createSlider(0, TWO_PI, PI/4, 0.04);
}

function draw() {
    background(0);
    translate(200,height);
    angle = sld.value();
    branch(100);
}

function branch(len){
    line(0,0,0,-len);
    translate(0,-len);

    if(len > 4){
        push();
        rotate(angle);
        branch(len*0.67);
        pop();
        push();
        rotate(-angle);
        branch(len*0.67);
        pop();
    }

}