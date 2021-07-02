var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here
var feed,lastFed,fedTime

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
   feed=createButton("FEED ROGER");
   feed.position(600,100);
   feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,100);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  
fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed=data.val();
})
 
  
  fill(255);
  textSize(15)
if(lastFed>=12){
  text('LAST FEED: '+lastFed%12+" pm",350,30);
}
 else if(lastFed===0){text('LAST FEED:12 am ',350,30);}
 else{text('LAST FEED: '+lastFed+" am",350,30);}
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  
  var food_stock_val = foodObj.getFoodStock(); if(food_stock_val <= 0){ foodObj.updateFoodStock(food_stock_val *0); }else{ foodObj.updateFoodStock(food_stock_val -1); } database.ref('/').update({ Food:foodObj.getFoodStock(), FeedTime:hour() }) }


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
