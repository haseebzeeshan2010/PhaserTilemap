class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload() {
  this.load.image("tiles","assets/assets.png")
  this.load.tilemapTiledJSON("map","assets/map.json")
      this.load.image("background","assets/water.png")
  this.load.spritesheet("player","assets/player.png",{frameWidth:32,frameHeight:64 })
  this.load.image("slime","assets/slime.png")
  }

  create() {
   const map= this.make.tilemap({key:"map"})
   const tileset = map.addTilesetImage("assets","tiles")
   //Background
   this.add.image(600,300,"background")
   //layers
   const groundLayer = map.createStaticLayer("Ground",tileset,0,0)
   const grassLayer = map.createStaticLayer("Grass",tileset,0,0)
   const worldLayer = map.createStaticLayer("World",tileset,0,0)
   const aboveLayer = map.createStaticLayer("Above",tileset,0,0)
   
   //Collisions layers
      worldLayer.setCollisionByProperty({ collides:true})
      groundLayer.setCollisionByProperty({ collides:true})
      aboveLayer.setCollisionByProperty({ collides:true})
      aboveLayer.setDepth(10)
   //player
      const spawnPoint = map.findObject(
        "Player",
          obj => obj.name === "Spawning Point"
      )
      
   player = this.physics.add.sprite(spawnPoint.x,spawnPoint.y,"player")
      this.physics.add.collider(player,worldLayer)
      this.physics.add.collider(player,groundLayer)
      this.physics.add.collider(player,aboveLayer)
   
   //Enemies
      this.enemies = map.createFromObjects("Enemies","Enemy",{})
      this.enemiesGroup = new Enemies(this.physics.world,this,[],this.enemies)
      this.physics.add.collider(this.enemiesGroup,worldLayer)
      this.physics.add.collider(this.enemiesGroup,groundLayer)
      this.physics.add.collider(this.enemiesGroup,aboveLayer)
      this.physics.add.collider(this.enemiesGroup,player,this.hitEnemy,null,this)
   //Animations
      const anims = this.anims
      anims.create({
          key:"left",
          frames:anims.generateFrameNames("player",{start:20,end:29}),
          frameRate:10,
          repeat:-1
      })
       anims.create({
          key:"right",
          frames:anims.generateFrameNames("player",{start:30,end:39}),
          frameRate:10,
          repeat:-1
      })
       anims.create({
          key:"front",
          frames:anims.generateFrameNames("player",{start:0,end:7}),
          frameRate:10,
          repeat:-1
      })
       anims.create({
          key:"back",
          frames:anims.generateFrameNames("player",{start:10,end:17}),
          frameRate:10,
          repeat:-1
      })
      
      //camera
      const camera = this.cameras.main
      camera.startFollow(player)
      //camera.setBounds(0,0,map.widthInPixels,map.heightInPixels)
  }
    
  update(){
      const preVelocity = player.body.velocity.clone()
      player.body.setVelocity(0)
      
      cursors = this.input.keyboard.createCursorKeys()
      
      if(cursors.left.isDown){
          player.body.setVelocityX(-100)
      }else if (cursors.right.isDown){
          player.body.setVelocityX(100)
      }else if(cursors.up.isDown){
          player.body.setVelocityY(-100)
      }else if(cursors.down.isDown){
          player.body.setVelocityY(100)
      }
      
      
      if(cursors.left.isDown){
          player.anims.play("left",true)
      }else if (cursors.right.isDown){
          player.anims.play("right",true)
      }else if(cursors.up.isDown){
          player.anims.play("back",true)
      }else if(cursors.down.isDown){
          player.anims.play("front",true)
      }else{
          player.anims.stop()
          
              //Front Animation
          if(preVelocity.x<0) player.setTexture("player","left")
          else if(preVelocity.x>0) player.setTexture("player","right")
          else if(preVelocity.y<0) player.setTexture("player","back")
          else if(preVelocity.y>0) player.setTexture("player","front")
      }
      
      
  }
    hitEnemy(player,enemiesGroup){
        this.scene.restart()
    }
    
}



