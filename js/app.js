// Enemies our player must avoid
var Enemy = function(initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = initialY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

//generate random speeds for the enemies
function enemySpeed() {
    return Math.floor(Math.random() * 251) + 50; 
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //loops enemies back to the left side of the screen
    //gives the enemy a new random speed
    if (this.x > 500) {
        this.x = -100 * dt;
        this.speed = enemySpeed();
    }
    //checks player collision with enemy and resets player
    if (this.x < player.x + 50 && this.x > player.x - 85 && this.y < player.y + 50 && this.y > player.y - 50) {
        player.x = 200;
        player.y = 400;
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //sets initial player position
    var playerInitialX = 200;
    var playerInitialY = 400;
    this.x = playerInitialX;
    this.y = playerInitialY;
    //picks image for character
    this.sprite = 'images/char-horn-girl.png';

}

Player.prototype.update = function(dt) {
    //when player reaches the water, the player is reset
    if (this.y <= 0) {
        this.x = 200;
        this.y = 400;
    }
}
//renders the player image onto the canvass
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//moves the player and checks for walls
Player.prototype.handleInput = function(pushedKey) {
    if (pushedKey === 'up') {
        this.y -= 83;
    } else if (pushedKey === 'down' && this.y < 400) {
        this.y += 83;
    } else if (pushedKey === 'left' && this.x > 0) {
        this.x -= 100;
    } else if (pushedKey === 'right' && this.x < 400) {
        this.x += 100;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(230, enemySpeed()), new Enemy(145, enemySpeed()), new Enemy(60, enemySpeed())];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
