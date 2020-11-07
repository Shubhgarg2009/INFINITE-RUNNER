const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;


//calling variables
var stone, stoneImage, stoneGroup;
var banana, bananaImage, bananaGroup;
var monkey, monkey_running,monkeyIMG;
var backgroundy, backgroundImage;
var score= 0;
var ground;

function preload(){
//loading image for background  
  backgroundImage= loadImage("jungle.png");

//loading animation for monkey
monkeyIMG= loadImage ("monkey.png");

//loading images for banana and stones
  bananaImage= loadImage("banana.png");
  stoneImage= loadImage("stone.png");
}

function setup() {
//creating canvas  
  createCanvas(800,400);

//creating background sprite
  backgroundy= createSprite (200,200);
  backgroundy.addImage (backgroundImage);
  backgroundy.velocityX= -2;
  backgroundy.scale=4.6;
//creating monkey sprite
  monkey= createSprite (50,390,10,10);
  monkey.addImage(monkeyIMG);
  monkey.scale= 0.1 ;
//creating ground sprite
  ground= createSprite (0,390,800,10);
  ground.visible= false;

//creating groups for banana and stones
  bananaGroup= new Group ();
  stoneGroup= new Group ();
}

function draw() {
//assigning background color
  background("white");

//to know the position of monkey to make more changes
  console.log(monkey.y);

//reseting background
  if (backgroundy.x<150) {
    backgroundy.x= 200
  }   

//making the monkey jump  
  if (keyDown ("SPACE")&& monkey.y>=320) {
    monkey.velocityY= -21;  
  }    
  
//adding gravity to monkey
  monkey.velocityY= monkey.velocityY + 0.6      ;

//preventing the monkey from falling off the ground
  monkey.collide (ground);

//scoring system and changing size of the monkey
  if (bananaGroup.isTouching(monkey)) {
    score= score+5;
    bananaGroup.destroyEach();
  }

  

  if (stoneGroup.isTouching(monkey)) {
    score= 0;
    stoneGroup.destroyEach();
   // monkey.scale= 0.7;
  }

 
//calling user-defined functions
  spawnbananas();
  spawnstones();

//drawing sprites
  drawSprites();

//displaying score
  stroke ("white");
  textSize (15);
  text ("Score: "+score,190,70);  
}

//function for bananas
function spawnbananas () {
if (frameCount%90===0) {
  banana= createSprite (400,120,10,10);  
  banana.addImage ("bananaimage", bananaImage);
  banana.scale= 0.2;
  banana.velocityX= -3;
  
  //adding lifetime to bananas
    banana.lifetime= 150;
  
  //adding banana to banana group
    bananaGroup.add(banana);
}
}

//function for stones
function spawnstones () {
if (frameCount%90===0) {
  stone= createSprite (windowWidth/2,370,10,10);
  stone.addImage ("stoneimage", stoneImage);
  stone.scale= 0.4;
  stone.velocityX= -4;
  
  //adding stone to stone group
    stoneGroup.add(stone);
}
}