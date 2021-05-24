const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var engine, world;
var particle;
var divisionHeight = 300; 
var score = 0;
var count = 0;
var gameState = "play";

var plinkos = [];
var divisions = [];

function setup(){
  createCanvas(730, 640);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  for (var d = 6; d <= width; d = d+80){
    divisions.push(new Division(d, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 40; j <= width-5; j = j+50){
    plinkos.push(new Plinko(j,80,10));
  }

  for (var j = 15; j <= width-10; j = j+50){    
    plinkos.push(new Plinko(j,150,10));
  }

  for (var j = 40; j <= width-5; j = j+50){  
    plinkos.push(new Plinko(j,220,10));
  }

  for (var j = 15; j <= width-10; j = j+50){    
    plinkos.push(new Plinko(j,290,10));
  }    
}

function draw() {
  background("black");
  Engine.update(engine);

  textSize(30);
  stroke("white");
  fill("white");
  text("Score : "+score,20,50);

  text(500,20,400);
  text(500,100,400);
  text(500,180,400);
  text(100,260,400);
  text(100,340,400);
  text(100,420,400);
  text(200,500,400);
  text(200,580,400);
  text(200,660,400);

  ground.display();

  for (var j = 0; j < plinkos.length; j++){   
    plinkos[j].display();     
  }

  for (var d = 0; d < divisions.length; d++){
    divisions[d].display();
  }

  if (particle != null){
    particle.display();

    if (particle.body.position.y > 570){
      if (particle.body.position.x < 250 && particle.body.position.x > 0){
        score = score + 500;
        particle = null;
      }

      else if (particle.body.position.x < 500 && particle.body.position.x > 251){
        score = score + 100;
        particle = null;
      }

      else if (particle.body.position.x < 700 && particle.body.position.x > 501){
        score = score + 200;
        particle = null;
      }
    }
  }

  else if (count >= 10){
    gameState = "end";
    text("Game Over",250,200);
  }
}

function mousePressed(){
  if (gameState !== "end"){
    particle = new Particle(mouseX, 10, 10, 10);
    count = count+1;    
  }
}