class Background {
    refreshRate = 15;
    cooldown = 210;
    active = false;

    constructor() {
        updateObjects.push(this);

        for (var i = 0; i < this.maxStarsNum; i++) {
            this.stars[i] = new Star();
            updateObjects.push(this.stars[i]);
        }
    }

    update() {
        this.cooldown--;

        if (this.cooldown > 0) return;
        this.cooldown = this.refreshRate;
        this.spawn();
    }

    maxStarsNum = 50;
    currentStarIndex = 0;
    stars = {};
    spawn() {
        this.stars[this.currentStarIndex].setPosition();
        if (this.currentStarIndex < this.maxStarsNum - 1) this.currentStarIndex++;
        else this.currentStarIndex = 0;
    }
}