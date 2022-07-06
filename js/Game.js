class Game {
  constructor() {
    this.LB=createElement("h2")
    this.l1=createElement("h2")
    this.l2=createElement("h2")
  }

  getState() {
    database.ref("gameState").on("value", function(data) {
      gameState = data.val();
    });
  }

  obj(grp,num,img,scale){
    for(var i=0; i<num; i++){
      // var box = createSprite(200, 300)
      var sprite = createSprite(random(width/2-150,width/2+150),random(-height*4.5,height-300))
      sprite.addImage(img)
      sprite.scale=scale
      grp.add(sprite)
    }
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();
    car1= createSprite(width/2-50,height-100)
    car1.addImage(car1_img)
    car1.scale=0.07
    car2= createSprite(width/2+50,height-100)
    car2.addImage(car2_img)
    car2.scale=0.07
cars=[car1,car2]
    obstg=new Group()
    coing=new Group()
     fuelg=new Group()
    
     this.obj(obstg,12,obstacleimg,0.035)
     this.obj(coing,17,coinimg,0.09)
     this.obj(fuelg,2,fuelimg,0.028)
     
  }



  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  update(state){
    database.ref("/").update({
      gameState:state
    })
  }
  play() {
    Player.getPlayersInfo()
    this.handleElements()
    this.LB.html("LEADERBOARD")
    this.LB.position(200,150)
    this.l1.position(200,200)
    this.l2.position(200,270)
    if(allPlayers!=undefined){
      image(track,0,-height*5,width,height*6)
      var p=Object.values(allPlayers)
      this.l1.html(p[0].rank+"          "+p[0].name+"           "+p[0].score)
      this.l2.html(p[1].rank+"          "+p[1].name+"           "+p[1].score)
      var idx=0
      for(var i in allPlayers){
        idx=idx+1
        //car's position = player's position
        cars[idx-1].position.x=allPlayers[i].positionX
        cars[idx-1].position.y=allPlayers[i].positionY+500
        if(idx===player.index){
          fill("yellow")
          ellipse( cars[idx-1].position.x, cars[idx-1].position.y, 60)
          camera.position.y= cars[idx-1].position.y
        }
      }
      if(keyIsDown(UP_ARROW)){
        player.positionY=player.positionY-10
        player.updateDistance()
      }
      if(keyIsDown(LEFT_ARROW)&&player.positionX>400){
        player.positionX=player.positionX-3
        player.updateDistance()
      }
      if(keyIsDown(RIGHT_ARROW)&&player.positionX<950){
        player.positionX=player.positionX+3
        player.updateDistance()
      }
      drawSprites()
    }
  }
}
