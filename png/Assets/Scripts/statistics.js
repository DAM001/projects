class Statistics {
    shoots = 0;
    hits = 0;
    enemiesSpawned = 0;
    nearKills = 0;

    addShoot() { this.shoots++; }
    addHit() { this.hits++; }
    addNearKill() { this.nearKills++; }
    addEnemySpawn() { this.enemiesSpawned++; }

    resetData() {
        this.shoots = 0;
        this.hits = 0;
        this.nearKills = 0;
        this.enemiesSpawned = 0;
    }

    writeOutStatsToConsole() {
        console.log("\nRound statistics:" + "\n- Score: " + ui.score + "\n- Shoots: " + this.shoots + "\n- Player hits: " + this.hits + "\n- Near kills: " + this.nearKills + "\n- Enemies spawned: " + this.enemiesSpawned + "\n\n");
    }
}