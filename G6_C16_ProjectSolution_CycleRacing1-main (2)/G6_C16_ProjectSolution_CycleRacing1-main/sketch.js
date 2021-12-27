var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2,op1,op2,op3

var END = 0;
var PLAY = 1 ;
var gameState = PLAY;

var distance = 0;
var riderGroup,gm;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");

  // load animation of any 2 opponents
  opp1=loadAnimation("opponent1.png","opponent2.png");
  opp2=loadAnimation("opponent7.png","opponent8.png");

  gm = loadImage("gameOver.png");

}

function setup(){
  
createCanvas(600,600);
  
// Moving background
path=createSprite(300,300);
path.scale=2
path.addImage(pathImg);
path.velocityX = -7;

//creating boy running with running anf falling animation
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("stop",mainRacerImg2);
mainCyclist.debug = true;
mainCyclist.setCollider("circle",0,0,600)
  
mainCyclist.scale=0.1;
  
// adjust scale of player

riderGroup = new Group();

gameover = createSprite(400,300);
gameover.addImage(gm);
gameover.visible = false;
    
}

function draw() {
  background(0);
  
  drawSprites();
   
  textSize(20);
  fill(255)
  text("Distance:"+distance,350,30)

  if(gameState === PLAY) {
     // moving player up and down with mouse
   mainCyclist.y = World.mouseY;

   distance = distance + Math.round(getFrameRate()/60);

     // Creating edge sprites and collide mainCyclist with edges
  
     edges= createEdgeSprites();

     //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  riders()  
  
  if(riderGroup.isTouching(mainCyclist)){
    gameState =END;
  }


  }
  
  else if(gameState === END) {
      gameover.visible = true;
      path.velocityX = 0;
      mainCyclist.velocityY = 0;
      mainCyclist.changeAnimation("stop",mainRacerImg2);

  }
  
   mainCyclist .collide(edges);
     
 }
  
  


function riders(){
  if (frameCount%100===0){
    // create rider sprite, assign random y position and give negative x velocity
    var rider=createSprite(600,random(100,500))
    rider.velocityX=-6

    // using if else assign 2 different animation to riders / opponents

    var r = Math.round(random(1,2))
    if(r==1){
      rider.addAnimation("running",opp1) 
    }
    else{
      rider.addAnimation("running",opp2) 
    }
    rider.debug=true;
    rider.setCollider("circle",0,0,600)
    rider.scale=0.1
    
    //assign lifetime
    rider.lifetime=300
    riderGroup.add(rider);
  }
}