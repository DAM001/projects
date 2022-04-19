class Bullet {
    bullet;

    lifeTime = 200;
    speed = 20;

    active = false;
    currentLifeTime = 0;
    fireEffect;
    fireSound;
    impactSound;

    constructor() {
        this.bullet = new PIXI.Sprite;
        this.bullet.anchor.set(.5);
        scene.SetParent(this.bullet);

        this.speed += Math.floor(Math.random() * 2);
        this.reset();

        //effect
        this.fireEffect = new PIXI.Sprite;
        this.fireEffect.anchor.set(.5);
        scene.SetParent(this.fireEffect);
        this.fireEffect.x = -1000;
        this.fireEffect.y = -1000;

        var randomTexture = Math.floor(Math.random() * 3);
        if (randomTexture == 0) this.fireEffect.texture = PIXI.Texture.from("Assets/Used/Bullet/Impact0.png");
        if (randomTexture == 1) this.fireEffect.texture = PIXI.Texture.from("Assets/Used/Bullet/Impact1.png");
        if (randomTexture == 2) this.fireEffect.texture = PIXI.Texture.from("Assets/Used/Bullet/Impact2.png");

        //audio
        this.fireSound = new Audio("Assets/Sounds/Fire.ogg");
        this.impactSound = new Audio("Assets/Sounds/Impact.ogg");
    }

    update() {
        if (!this.active) return;

        if (this.currentLifeTime >= this.lifeTime) {
            this.active = false;
            this.reset();
            return;
        }
        this.currentLifeTime++;

        if (!this.impactEffect) {
            this.bullet.x += this.speed;
            this.bullet.y += this.rotation;
        }

        //collision
        for (var i = 0; i < updateObjects.length; i++) {
            if (updateObjects[i].health) {
                if ((this.bullet.y + 25) > updateObjects[i].enemy.y && (this.bullet.y - 25) < updateObjects[i].enemy.y &&
                    (this.bullet.x + 25) > updateObjects[i].enemy.x && (this.bullet.x - 25) < updateObjects[i].enemy.x &&
                    !this.impactEffect) {
                    updateObjects[i].health.damage(34);

                    this.impact();


                    //data
                    statistics.addHit();
                }
            }
        }

        this.fireEffectUpdate();
        this.impactUpdate();
    }

    setActive(startPosX, startPosY) {
        this.bullet.texture = PIXI.Texture.from("Assets/Used/Bullet.png");
        this.active = true;
        this.impactEffect = false;
        this.currentLifeTime = 0;

        this.bullet.x = startPosX;
        this.bullet.y = startPosY;

        this.bullet.width = 50;
        this.bullet.height = 10;

        this.showFireEffect(startPosX, startPosY);
    }

    effectSize = 0;
    showFireEffect(startPosX, startPosY) {
        this.effectSize = 20;
        this.fireEffect.x = startPosX;
        this.fireEffect.y = startPosY;

        //audio
        if (ui.getPlaySounds) this.fireSound.play();
    }
    fireEffectUpdate() {
        if (this.effectSize > 0) this.effectSize--;
        this.fireEffect.width = this.effectSize;
        this.fireEffect.height = this.effectSize;
    }


    impactEffect = false;
    impactEffectSize = 30;
    impact() {
        var randomTexture = Math.floor(Math.random() * 3);
        if (randomTexture == 0) this.bullet.texture = PIXI.Texture.from("Assets/Used/Bullet/Impact0.png");
        if (randomTexture == 1) this.bullet.texture = PIXI.Texture.from("Assets/Used/Bullet/Impact1.png");
        if (randomTexture == 2) this.bullet.texture = PIXI.Texture.from("Assets/Used/Bullet/Impact2.png");

        this.impactEffect = true;
        this.bullet.rotation = (Math.floor(Math.random() * 10) - 5) / 2;
        this.currentLifeTime = this.lifeTime - 25;
        this.impactEffectSize = 50;

        //audio
        if (ui.getPlaySounds) this.impactSound.play();
    }
    impactUpdate() {
        if (this.impactEffect) {
            if (this.impactEffect > 0) this.impactEffectSize -= 2;
            this.bullet.width = this.impactEffectSize;
            this.bullet.height = this.impactEffectSize;
        }
    }



    rotation = 0;
    reset() {
        this.bullet.x = -1000;
        this.bullet.y = -1000;

        this.rotation = (Math.floor(Math.random() * 10) - 5) / 5;
        this.bullet.rotation = this.rotation / 20;
    }
}