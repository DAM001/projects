class Ui {
    constructor() {
        this.musicPlayer = new Audio();
        this.musicPlayer.volume = .3;
    }

    score = 0;
    get getAddScore() {
        if (player.active) this.score++;
        return this.score;
    }


    gameOver() {
        document.getElementById("gameOver").style.display = "block";

        var infoTextContent;
        var randomNumber = Math.floor(Math.random() * 4);
        if (randomNumber == 0) infoTextContent = "Shoots: " + statistics.shoots;
        else if (randomNumber == 1) infoTextContent = "Player hits: " + statistics.hits;
        else if (randomNumber == 2) infoTextContent = "Enemies spawned: " + statistics.enemiesSpawned;
        else if (randomNumber == 3) infoTextContent = "Near kills: " + statistics.nearKills;
        document.getElementById("infoText").innerHTML = "Score: " + this.score + " | " + infoTextContent;


        spawner0.setActive(false);
        spawner1.setActive(false);

        this.musicPlayer.src = "Assets/Sounds/Music/GameOver.mp3";
        this.playGameOverMusic();

        statistics.writeOutStatsToConsole();
    }

    restart() {
        document.getElementById("gameOver").style.display = "none";
        player.restart();
        spawner0.setActive(true);
        spawner1.setActive(true);

        this.score = 0;
        document.getElementById("score").innerHTML = "Score: 0";

        this.musicPlayer.src = "Assets/Sounds/Music/GameMusic.mp3";
        this.playGameMusic();

        //data
        statistics.resetData();
    }

    //gameMusic
    musicPlayer;
    playMusic = true;
    playMenuMusic() {
        this.musicPlayer.src = "Assets/Sounds/Music/MenuMusic.mp3";
        this.musicPlayer.play();
    }
    playGameMusic() {
        this.musicPlayer.src = "Assets/Sounds/Music/GameMusic.mp3";
        this.musicPlayer.play();
    }
    playGameOverMusic() {
        this.musicPlayer.src = "Assets/Sounds/Music/GameOver.mp3";
        this.musicPlayer.play();
    }
    muteMusic() {
        this.playMusic = !this.playMusic;
        if (this.playMusic) this.musicPlayer.volume = .4;
        else this.musicPlayer.volume = 0;

        if (this.playMusic) document.getElementById("muteMusic").style.backgroundColor = "#b4eba9";
        else document.getElementById("muteMusic").style.backgroundColor = "#f2a7a7";
    }

    playSounds = true;
    muteSounds() {
        this.playSounds = !this.playSounds;

        if (this.playSounds) document.getElementById("muteSounds").style.backgroundColor = "#b4eba9";
        else document.getElementById("muteSounds").style.backgroundColor = "#f2a7a7";
    }
    get getPlaySounds() { return this.playSounds; }
}