class Spawner {
    spawnRate = 100;
    cooldown = 120;

    active = false;

    constructor(enemyType, spawnRate) {
        this.spawnRate = spawnRate;

        updateObjects.push(this);

        for (var i = 0; i < this.maxEnemyNum; i++) {
            if (enemyType == 0) this.enemies[i] = new EnemyBase(100, 5, new PIXI.Texture.from("Assets/Used/Enemy0.png"), true);
            if (enemyType == 1) this.enemies[i] = new EnemyBase(30, 10, new PIXI.Texture.from("Assets/Used/Enemy1.png"), false);
            updateObjects.push(this.enemies[i]);
        }
    }

    update() {
        if (!this.active) return;
        this.cooldown--;

        if (this.cooldown > 0) return;
        this.spawn();
    }

    maxEnemyNum = 10;
    currentEnemyIndex = 0;
    enemies = {};
    spawn() {
        this.cooldown = this.spawnRate;
        //if (this.spawnRate > 30) this.spawnRate -= 1;

        this.enemies[this.currentEnemyIndex].spawn();
        if (this.currentEnemyIndex < this.maxEnemyNum - 1) this.currentEnemyIndex++;
        else this.currentEnemyIndex = 0;

        //data
        statistics.addEnemySpawn();
    }

    setActive(isActive) {
        this.active = isActive;

        if (isActive) return; //remove all enemy from the map
        for (var i = 0; i < this.maxEnemyNum; i++) {
            this.enemies[i].enemy.x = -1000;
        }
        this.spawnRate = 120;
        this.cooldown = 120;
    }
}