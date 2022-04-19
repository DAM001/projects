class EnemyBase {
    enemy;
    spaceship;
    health;

    maxSpeed;
    maxHealth;
    randomMovement = false;

    active = false;
    currentLifeTime = 0;

    //0 - forward, 1 -up, 2 - down
    moveDirection = 0;

    constructor(maxHealth, maxSpeed, texture, randomMovement) {
        this.maxHealth = maxHealth;
        this.maxSpeed = maxSpeed;
        this.randomMovement = randomMovement;

        this.enemy = new PIXI.Sprite;
        this.enemy.texture = texture;
        scene.SetParent(this.enemy, false);

        this.enemy.anchor.set(.5);
        this.enemy.x = -1000;
        this.enemy.y = -1000;
        this.enemy.width = 50;
        this.enemy.height = 50;

        this.spaceship = new Spaceship(this.enemy, false);
        this.health = new Health(this.spaceship);
        updateObjects.push(this.spaceship);
    }

    edgeCollisionSize = 50;
    update() {
        if (!this.active) return;

        if (this.enemy.y > this.edgeCollisionSize && this.enemy.y < scene.GetHeight - this.edgeCollisionSize) this.enemy.y += this.moveDirection;
        this.currentLifeTime++;

        this.spaceship.moveLeft(this.maxSpeed);
        if (this.randomMovement) this.spaceship.randomMovement(this.maxSpeed / 2);
        this.spaceship.movement();

        //collision
        var colliderSize = 40;
        if ((this.enemy.y + colliderSize) > player.player.y && (this.enemy.y - colliderSize) < player.player.y &&
            (this.enemy.x + colliderSize) > player.player.x && (this.enemy.x - colliderSize) < player.player.x) {
            this.health.damage(this.maxHealth);
            player.die();
        }
    }

    spawn() {
        this.active = true;
        this.currentLifeTime = 0;
        this.health.setHealth(this.maxHealth);

        this.enemy.x = scene.GetWidth + 100;
        this.enemy.y = Math.floor(Math.random() * (scene.GetHeight - this.edgeCollisionSize * 2) + this.edgeCollisionSize);
    }
}