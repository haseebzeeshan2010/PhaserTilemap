
let game
let player
let cursors
let enemies
window.onload = function(){
  let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default:"arcade",
        arcade:{
            gravity:{y:0}
        }
    },
    parent: 'phaser-game',
    scene: [SceneMain]
  }

   game = new Phaser.Game(config)
}




