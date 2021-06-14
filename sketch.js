var starImg,bgImg,bgImg2;
var star, starBody;
var fairy,fairyImg
var sound;
var gameState = "play"
var edges;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png")
	sound = loadSound("sound/JoyMusic.mp3")
}

function setup() {
	createCanvas(800, 600);

	//write code to play fairyVoice sound
	sound.play();

	//create fairy sprite and add animation for fairy
	fairy = createSprite(width/4,500,20,20)
	fairy.addAnimation("flying",fairyImg)
	fairy.scale = 0.1

	edges = createEdgeSprites();

	star = createSprite(550,30);
	star.addImage(starImg);
	star.scale = 0.2;


	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
  background(bgImg);

  if(gameState === "play"){

  fairy.debug = false
  fairy.setCollider("aabb",0,0,1000,1000)

  fairy.velocityX = 0

  if(fairy.isTouching(edges[0])){
	  fairy.x = width-50
  }

  if(fairy.isTouching(edges[1])){
	  fairy.x = 50
  }

  star.x= starBody.position.x 
  star.y= starBody.position.y 

  drawSprites();
  keyPressed();

  if(star.isTouching(fairy)){
	gameState = "win"
  }

  if(star.y > height){
	  gameState = "over"
  }
}

  if(gameState === "win"){
	background ("blue")
	textSize(50)
	fill("cyan")
	textAlign(CENTER)
	text("You caught the star! Well played!",width/2,height/2)

	if(keyDown("space")){
		gameState = "play"
	}
  }

  if(gameState === "over"){
	  background("blue")
	  textSize(40)
	  fill("cyan")
	  textAlign(CENTER)
	  text("You lose!",width/2,height/2 - 50)

	  fill("yellow")
	  text("Try to catch the star next time!",width/2,height/2 + 50)
  }

}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}

	//write code to move fairy left and right
	if(keyDown("left") || keyDown("a")){
		fairy.velocityX = -20		
	}

	if(keyDown("right") || keyDown("d")){
		fairy.velocityX = 20
	}	
}
