keys = {};
class Player {
    player;
    spaceship;
    weapon;

    speed = 7;
    active = false;
    lifeTime = 0;



    constructor() {
        this.player = new PIXI.Sprite.from("Assets/Used/Player0.png");
        scene.SetParent(this.player);

        this.player.anchor.set(.5, .5);
        this.player.x = -100;
        this.player.y = scene.GetHeight / 2;
        this.player.width = 50;
        this.player.height = 60;

        this.spaceship = new Spaceship(this.player, true);
        this.weapon = new Weapon(scene);

        setTimeout(function() { this.active = true; }, 4500);
    }
    setPosition(x, y) {
        this.player.x = x;
        this.player.y = y;
    }
    get GetPositionX() { return this.player.x; }
    get GetPositionY() { return this.player.y; }


    //A bit overcomplicated movement system, but it has a really cool feel
    //Keycodes: 87, 65, 83, 68, 32 W A S D Space
    movement(keys) {
        if (keys["87"]) this.spaceship.moveUp(this.speed);
        if (keys["83"]) this.spaceship.moveDown(this.speed);
        if (keys["65"]) this.spaceship.moveLeft(this.speed);
        if (keys["68"]) this.spaceship.moveRight(this.speed);

        //if (keys["32"]) this.weaponFire();
    }

    weaponFire() {
        this.weapon.fire(this.GetPositionX, this.GetPositionY);

        //data
        statistics.addShoot();
    }


    update(keys) {
        if (!this.active) return;
        this.lifeTime++;

        this.movement(keys);
        this.spaceship.movement();
        this.spaceship.movementBackgroundAnimation();
        window.addEventListener("keydown", this.keysDown);
        window.addEventListener("keyup", this.keysUp);

        if (this.lifeTime > 60) this.weaponFire();
    }
    keysDown(e) { this.keys[e.keyCode] = true; }
    keysUp(e) { this.keys[e.keyCode] = false; }


    restart() {
        this.active = true;
        this.lifeTime = 0;
        this.player.x = 100;
        this.player.y = scene.GetHeight / 2;
        this.currentVelocity = [.0, 10];
    }
    die() {
        this.active = false;
        this.player.x = -1000;
        this.player.y = -1000;

        ui.gameOver();
    }



    setSkin(skinType) {
        if (skinType == 0) this.player.texture = new PIXI.Texture.from("Assets/Used/Player0.png");
        if (skinType == 1) this.player.texture = new PIXI.Texture.from("Assets/Used/Player1.png");
        if (skinType == 2) this.player.texture = new PIXI.Texture.from("Assets/Used/Player2.png");
    }
}