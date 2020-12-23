var dog, database, foodS, foodStock, lastFed,food1;
var food = 20;
var addFood, feedFood, fedTime, lastFed, foodObj;
function preload(){
  img1 = loadImage("Dog.png");
  img2 = loadImage("happydog.png");
  img3 = loadImage("Milk.png");
  bedroomImg = loadImage("BedRoom.png");
  washroomImg = loadImage("WashRoom.png");
  gardenImg = loadImage("Garden.png");
  livingRoomImg = loadImage("Living Room.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(300,370);
  dog.addImage(img1);
  dog.scale = 0.3;

  milk = createSprite(190,410);
  milk.addImage(img3);
  milk.scale = 0.15;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", function(data){
    foodS = data.val();
  });
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    fedTime=data.val();
  })
  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val(); 
  }); 

  food1 = new Food();

  feed = createButton("Feed the Dog");
  feed.position(500,200);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,200);
  addFood.mousePressed(addFoods);
  var input = createInput("Your Dog's Name");
  input.position(500,150);
  Dogname = input.value();
  var button = createButton("Submit");
  button.position(560,175);
  button.mousePressed(function(){
    input.hide();
    button.hide();
  });   
  
}


function draw() {  
  background(46, 139, 87);
  currentTime = hour(); 
  fill(255);
  textSize(20);
  text("Press the up arrow key to feed the dog milk!", 50, 55);
  text("Milk Left: " + foodS, 190, 80);
  if(fedTime>=12){
        fill("white");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 350,30);
  }
  else if(fedTime==0){
    fill("white");
    textSize(15); 
    text("Last Fed : 12 AM",350,30);
  }
  else{
    fill("white");
    textSize(15); 
    text("Last Fed : "+ fedTime + " AM", 350,30);
  }
  if(currentTime ==(fedTime+1))
  {
    update("Playing");
    food1.garden();

  }
  else if(currentTime == (fedTime + 2))
  {
    update("Sleeping");
    food1.bedroom();

  }
  else if(currentTime == (fedTime+3))
  {
    update("Bathing");
    food1.washroom();
  }
  else if(currentTime == (fedTime+4))
  {
    update("Watching");
    food1.livingRoom();

  }
  else
  {
    update("Hungry");
    food1.display();

  }
  if(gameState!="Hungry")
  {
    feed.hide();
    addFood.hide();
    dog.remove();
    food1.hide();
  }
  else
  {
    feed.show();
    addFood.show();
    dog.addImage(img1)
  }
  food1.display();
  drawSprites();
  //add styles here

}

//Function to write values in DB function 
function writeStock(x){
   if(x<=0){
      x=0 
    }
    else{
       x=x-1
    } 
  database.ref('/').update({Food:x})
 }

 function feedDog(){
   dog.addImage(img2);
   foodS--;
   database.ref('/').update({
     Food : foodS
   })
   fedTime = hour(); 
 }
 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 }
 function update(state)
 {
   database.ref('/').update({
     gameState:state
   });
 }
