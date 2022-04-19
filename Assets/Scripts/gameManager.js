const app = new PIXI.Application();
let scene;
let ui;
let background;

let player;
let spawner0;
let spawner1;


let statistics;
window.onload = startFunction;

function startFunction() {
    app.ticker.add(updateFunction);
    scene = new Scene(800, 600);
    ui = new Ui();
    background = new Background();
    spawner0 = new Spawner(0, 120);
    spawner1 = new Spawner(1, 180);
    player = new Player();

    statistics = new Statistics();
    start();
}

let updateObjects = [];

function updateFunction() {
    player.update(keys);

    for (var i = 0; i < updateObjects.length; i++) {
        updateObjects[i].update();
    }
}


//Task: https://drive.google.com/file/d/1FO92R-Vf8FrorC_CNYUsmRoG1IpO0-vT/view?usp=sharing
//Project: http://www.dam.nhely.hu/Content/Project/
//Github: https://github.com/DAM001/PlaynGO