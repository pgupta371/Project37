class Food {
    constructor(){
        this.foodStock;
        this.fedTimes;
        this.image = loadImage("Milk.png");
    }
    display(){
        var x =80;
        var y=100;
        imageMode(CENTER);
        image(this.image,700,220,70,70);
        if(this.foodStock!==0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10 == 0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
    getFedTime(fedTime){
        this.fedTime = fedTime;
    }
    getFoodStock(){
        return this.foodStock
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }
    hide()
    {
        this.food.hide();
    }
    bedroom()
    {
        background(bedroomImg,550,500);
    }
    garden()
    {
        background(gardenImg,550,500);
    }
    washroom()
    {
        background(washroomImg,550,500);
    }
    livingRoom()
    {
        background(livingRoomImg,550,500);
    }
}