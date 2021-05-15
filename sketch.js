const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot,resetbtn;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;


function preload() {
    getBackgroundImg();
    
     resetbtnimg = loadImage("sprites/RESETBUTTON.png")
    
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
   // resetbtn=createSprite(200,60)
    //resetbtn.addImage("btn",resetbtnimg)
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1=new Box(800,300,300,250)
    enemy1 = new Pig(800,40,)
    enemy2 = new Pig(700,40,)
    enemy3 = new Pig(900,40,)
    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
        
    
    Engine.update(engine);
    //strokeWeight(4);
  
    box1.display();
    bird.display();
    enemy1.display();
    enemy2.display()
    enemy3.display()
    

}

function mouseDragged(){ 
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    bird.trajectory =[];
     
}

function keyPressed(){
    if(keyCode === 32){
        Matter.Body.setPosition(bird.body,{x:200,y:50})
       
       gameState = ""
       bird.trajectory =[];
       slingshot.attach(bird.body);
       
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}