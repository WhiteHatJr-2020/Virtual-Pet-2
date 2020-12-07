var dog,dogImg,dogImg1;
var database;
var foodS,foodStock, fedTime,lastFed, foodObj;

function preload()
{
   dogImg=loadImage("images/dogImg.png");
   dogImg1=loadImage("images/dogImg1.png");
}


function setup() 
{
  database=firebase.database();
  createCanvas(1000,400);

  foodObj=new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  //console.log(foodStock)

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feeddog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addfood);

  
}

function draw() 
{
  background("cream");
 
  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(dogImg1);
  // }


  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  });

  drawSprites();
  fill("black");
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed : " +lastFed%12+"PM",350,30);
  }
  else if(lastFed==0)
  {
    text("Last Feed : 12 AM",350,30);
  }
  else
  {
    text("Last Feed : " +lastFed +"AM",350,30);
  }
}

function addfood()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feeddog()
{
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    }
  )
}

function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  //console.log(foodS)
}


