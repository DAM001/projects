class Spaceship {
    spaceship;
    constructor(spaceship, edgeCollision) {
        this.spaceship = spaceship;
        this.edgeCollision = edgeCollision;

        this.prepareExplotion();
    }

    update() {
        this.explotionUpdate();
    }

    currentVelocity = [.0, 0];
    velocity = 1;
    drag = .4;

    edgeCollision = false;
    edgeCollisionSize = 50;

    movement() {
        //reset speed
        if (this.currentVelocity[0] < this.drag && this.currentVelocity[0] > -this.drag) this.currentVelocity[0] = 0;
        else if (this.currentVelocity[0] > 0) this.currentVelocity[0] -= this.drag;
        else if (this.currentVelocity[0] < 0) this.currentVelocity[0] += this.drag;
        this.spaceship.y += this.currentVelocity[0];

        if (this.currentVelocity[1] < this.drag && this.currentVelocity[1] > -this.drag) this.currentVelocity[1] = 0;
        else if (this.currentVelocity[1] > 0) this.currentVelocity[1] -= this.drag;
        else if (this.currentVelocity[1] < 0) this.currentVelocity[1] += this.drag;
        this.spaceship.x += this.currentVelocity[1];


        //correct position
        if (this.spaceship.y < this.edgeCollisionSize) {
            this.spaceship.y = this.edgeCollisionSize;
            this.currentVelocity[0] = 0;
        }
        if (this.spaceship.y > (scene.GetHeight - this.edgeCollisionSize)) {
            this.spaceship.y = scene.GetHeight - this.edgeCollisionSize;
            this.currentVelocity[0] = 0;
        }
        if (!this.edgeCollision) return;
        if (this.spaceship.x < this.edgeCollisionSize) {
            this.spaceship.x = this.edgeCollisionSize;
            this.currentVelocity[1] = 0;
        }
        if (this.spaceship.x > (scene.GetWidth - this.edgeCollisionSize)) {
            this.spaceship.x = scene.GetWidth - this.edgeCollisionSize;
            this.currentVelocity[1] = 0;
        }
    }

    moveUp(speed) { if (this.currentVelocity[0] > -speed) this.currentVelocity[0] -= this.velocity; }
    moveDown(speed) { if (this.currentVelocity[0] < speed) this.currentVelocity[0] += this.velocity; }
    moveLeft(speed) { if (this.currentVelocity[1] > -speed) this.currentVelocity[1] -= this.velocity; }
    moveRight(speed) { if (this.currentVelocity[1] < speed) this.currentVelocity[1] += this.velocity; }

    movementBackgroundAnimation() {
        for (var i = 0; i < updateObjects.length; i++) {
            if (updateObjects[i].isStar) updateObjects[i].starMovementAnim(this.currentVelocity);
        }
    }

    //random movement
    newDirection = 30;
    newDirectionCounter = 0;
    newDirectionType = 0;
    randomMovement(speed) {
        if (this.newDirectionType == 0) this.moveDown(speed * this.moveDirection);
        else this.moveUp(speed * this.moveDirection);

        this.newDirectionCounter++;
        if (this.newDirectionCounter < this.newDirection) return;
        this.newDirection = Math.floor(Math.random() * 30) + 30;
        this.newDirectionCounter = 0;

        this.newDirectionType = Math.floor(Math.random() * 2);
        this.moveDirection = Math.random() * 1;
    }

    die() {
        //data
        var distance = 100;
        if ((player.player.y + distance) > this.spaceship.y && (player.player.y - distance) < this.spaceship.y &&
            (player.player.x + distance) > this.spaceship.x && (player.player.x - distance) < this.spaceship.x) {
            statistics.addNearKill();
        }

        this.explotion();
        this.active = false;
        this.spaceship.x = -1000;
        this.spaceship.y = -1000;

        //ui
        document.getElementById("score").innerHTML = "Score: " + ui.getAddScore;
    }

    //explotionEffect
    explotionEffect;
    explotionEffectSize;
    explotionSound;
    prepareExplotion() {
        this.explotionEffect = new PIXI.Sprite.from("Assets/Used/Explotion.png");
        this.explotionEffect.anchor.set(.5);
        scene.SetParent(this.explotionEffect);
        this.explotionEffect.x = -1000;
        this.explotionEffect.y = -1000;

        this.explotionSound = new Audio("Assets/Sounds/Explotion.ogg");
    }
    explotion() {
        this.explotionEffect.x = this.spaceship.x;
        this.explotionEffect.y = this.spaceship.y;
        this.explotionEffectSize = 0;
        this.explotionEffect.width = this.explotionEffectSize;
        this.explotionEffect.height = this.explotionEffectSize;

        if (ui.getPlaySounds) this.explotionSound.play();
    }
    explotionUpdate() {
        if (this.active) return;

        var maxSize = 500;
        var effectSpeed = 20;
        if (this.explotionEffectSize < maxSize) this.explotionEffectSize += effectSpeed;
        this.explotionEffect.width = this.explotionEffectSize;
        this.explotionEffect.height = this.explotionEffectSize;
        this.explotionEffect.alpha = (maxSize - this.explotionEffectSize) / maxSize;
    }
}


class Health {
    spaceship;
    health = 100;


    constructor(spaceship) {
        this.spaceship = spaceship;
    }

    get getHealth() { return this.health; }
    setHealth(health) { this.health = health; }
    damage(amount) {
        this.health -= amount;
        if (this.health <= 0) this.spaceship.die();
    }
}