//table
var table = [];
var tableSize = [];
var tileNumber;
var bombNumber;

//program
var firstTry;
var score;

window.onload = function(e) {
    tableSize[0] = 10;
    tableSize[1] = 10;
    bombNumber = 10;
    firsTry = false;

    audioEnabled = false;

    //animation
    BreathAnimation(false);
}

sliderBombNumber.oninput = function() {
    document.getElementById("bombNumber").innerHTML = "Number of bombs: " + document.getElementById("sliderBombNumber").value;
    bombNumber = document.getElementById("sliderBombNumber").value;
    Alert(bombNumber > tableSize[0] * tableSize[1] - 9);

    TileAudio();
}

sliderTableWidth.oninput = function() {
    document.getElementById("tableWidth").innerHTML = "Table width: " + document.getElementById("sliderTableWidth").value;
    tableSize[0] = parseInt(document.getElementById("sliderTableWidth").value);
    Alert(bombNumber > tableSize[0] * tableSize[1] - 9);

    TileAudio();
}

sliderTableHeight.oninput = function() {
    document.getElementById("tableHeight").innerHTML = "Table height: " + document.getElementById("sliderTableHeight").value;
    tableSize[1] = parseInt(document.getElementById("sliderTableHeight").value);
    Alert(bombNumber > tableSize[0] * tableSize[1] - 9);

    TileAudio();
}

function Alert(show) {
    if (show) document.getElementById("bombNumber").style.color = "#b00020";
    else document.getElementById("bombNumber").style.color = "#ffffff";
}

function Start(button) {
    table[0] = parseInt(tableSize[0]);
    table[1] = parseInt(tableSize[1]);

    if (bombNumber <= tableSize[0] * tableSize[1] - 9) {
        firstTry = true;

        tileNumber = tableSize[0] * tableSize[1];
        document.getElementById("folder").style.width = (tableSize[0] * 35) + "px";
        document.getElementById("folder").style.height = (tableSize[1] * 35) + "px";

        for (var i = 0; i < tileNumber; i++) table[i] = 0;
        CreateTile(0); //createTable

        document.getElementById("settingsFolder").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";
        document.getElementById("score").innerHTML = "(" + bombNumber + "/0) Score: 0";
        document.getElementById("winFolder").style.display = "none";
        document.getElementById("gameButtons").style.display = "block";

        MarkAudio();
    }
}

function Menu() {
    document.getElementById("settingsFolder").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("gameButtons").style.display = "none";
    MarkAudio();

    //remove table
    var myNode = document.getElementById("folder");
    while (myNode.firstChild) myNode.removeChild(myNode.firstChild);
}

function Restart() {
    document.getElementById("gameOver").style.display = "none";
    MarkAudio();

    //remove table
    var myNode = document.getElementById("folder");
    while (myNode.firstChild) myNode.removeChild(myNode.firstChild);

    Start(false);
}

//Logic
function StartLogic(starterPosition) {
    //set table default values
    for (var i = 0; i < tileNumber; i++) table[i] = 0;

    //select the tiles around the player
    var positionIndex = 1;
    var disablePositions = [];
    disablePositions[0] = starterPosition;

    //top
    if (starterPosition > (tableSize[0] - 1)) {
        disablePositions[positionIndex] = starterPosition - tableSize[0];
        positionIndex++;
    }
    //bottom
    if (starterPosition < tileNumber - tableSize[0]) {
        disablePositions[positionIndex] = starterPosition + tableSize[0];
        positionIndex++;
    }
    //left
    if (starterPosition % tableSize[0] > 0) {
        disablePositions[positionIndex] = starterPosition - 1;
        positionIndex++;
    }
    //right
    if (starterPosition % tableSize[0] < (tableSize[0] - 1)) {
        disablePositions[positionIndex] = starterPosition + 1;
        positionIndex++;
    }
    //topLeft
    if (starterPosition > tableSize[0] && (i - (tableSize[0] + 1)) % tableSize[0] < tableSize[0]) {
        disablePositions[positionIndex] = starterPosition - (tableSize[0] + 1);
        positionIndex++;
    }
    //topRight
    if (starterPosition > tableSize[0] && (i - (tableSize[0] - 1)) % tableSize[0] > 0) {
        disablePositions[positionIndex] = starterPosition - (tableSize[0] - 1);
        positionIndex++;
    }
    //bottomLeft
    if (starterPosition < (tileNumber - tableSize[0]) && (i + (tableSize[0] - 1)) % tableSize[0] < tableSize[0]) {
        disablePositions[positionIndex] = starterPosition + (tableSize[0] - 1);
        positionIndex++;
    }
    //bottomRight
    if (starterPosition < tileNumber - tableSize[0] && (i + (tableSize[0] + 1)) % tableSize[0] > 0) {
        disablePositions[positionIndex] = starterPosition + (tableSize[0] + 1);
        positionIndex++;
    }

    //set bombs
    for (var i = 0; i < bombNumber; i++) {
        var run = 1;
        while (run == 1) {
            var randomNumber = Math.floor(Math.random() * tileNumber);
            var posiblePosition = 0;

            if (table[randomNumber] == 0) {
                for (var j = 0; j < disablePositions.length; j++) {
                    if (randomNumber != disablePositions[j]) posiblePosition++;
                    else break;
                    if (posiblePosition == disablePositions.length) {
                        table[randomNumber] = 10;
                        posiblePosition = 0;
                        run = 0;
                        break;
                    }
                }
            }
        }
    }

    //set number values on tiles
    for (var i = 0; i < tileNumber; i++) {
        if (table[i] != 10) {
            //top
            if (i > (tableSize[0] - 1)) {
                if (table[i - tableSize[0]] == 10) table[i] += 1;
            }
            //bottom
            if (i < tileNumber - tableSize[0]) {
                if (table[i + tableSize[0]] == 10) table[i] += 1;
            }
            //left
            if (i % tableSize[0] > 0) {
                if (table[i - 1] == 10) table[i] += 1;
            }
            //right
            if (i % tableSize[0] < (tableSize[0] - 1)) {
                if (table[i + 1] == 10) table[i] += 1;
            }
            //topLeft
            if (i > tableSize[0] && (i - (tableSize[0] + 1)) % tableSize[0] < (tableSize[0] - 1)) {
                if (table[i - (tableSize[0] + 1)] == 10) table[i] += 1;
            }
            //topRight
            if (i > tableSize[0] && (i - (tableSize[0] - 1)) % tableSize[0] > 0) {
                if (table[i - (tableSize[0] - 1)] == 10) table[i] += 1;
            }
            //bottomLeft
            if (i < tileNumber - tableSize[0] && (i + (tableSize[0] - 1)) % tableSize[0] < (tableSize[0] - 1)) {
                if (table[i + (tableSize[0] - 1)] == 10) table[i] += 1;
            }
            //bottomRight
            if (i < tileNumber - tableSize[0] && (i + (tableSize[0] + 1)) % tableSize[0] > 0) {
                if (table[i + (tableSize[0] + 1)] == 10) table[i] += 1;
            }
        }
    }

    Clicked(starterPosition, 0);
}

//Visuals
function CreateTile(currentTileNumber) {
    var newDiv;

    newDiv = document.createElement("div");
    newDiv.setAttribute("id", currentTileNumber.toString());
    newDiv.setAttribute("class", "tile");
    newDiv.setAttribute("onmousedown", "Clicked(this.id, event)");
    document.getElementById("folder").appendChild(newDiv);

    currentTileNumber++;
    if (currentTileNumber != tileNumber) {
        //CreateTile(currentTileNumber);
        setTimeout(CreateTile, Math.floor(Math.random() * 0), currentTileNumber);
    }
}

var foundMines = 0;

function Clicked(divId, event) {
    if (event.button == 0 || event.button == 2 || event == 0) {
        if (firstTry && event.button == 0) {
            firstTry = false;
            StartLogic(parseInt(divId));
            score = 1;
            foundMines = 0;
        } else if (table[divId] <= 10 && table[divId] >= -110) {
            //markAsBomb
            if (parseInt(event.button) == 2) {
                if (table[divId] >= 0) {
                    table[divId] -= 100;
                    foundMines++;
                    document.getElementById(divId.toString()).style.backgroundColor = "#3700b3";
                } else if (table[divId] <= 110) {
                    table[divId] += 100;
                    foundMines--;
                    document.getElementById(divId.toString()).style.backgroundColor = "#333333";
                }
                document.getElementById("score").innerHTML = "(" + bombNumber + "/" + foundMines + ") Score: " + (score * bombNumber);

                MarkAudio();
            } else if (table[divId] >= 0 && table[divId] <= 10) {
                //bomb
                if (table[divId] == 10) {
                    document.getElementById(divId.toString()).style.backgroundColor = "#b00020";
                    document.getElementById(divId.toString()).innerHTML = "X";
                    document.getElementById(divId.toString()).style.animation = "tileExplotion .5s linear";

                    document.getElementById("gameOver").style.display = "block";
                    document.getElementById("gameOver").style.boxShadow = "inset 0 0 30vw #270a0a";
                    RevealSingleTile(0);

                    WrongAudio();

                    //explotionAnimation
                    var explotion;
                    explotion = document.createElement("div");
                    explotion.setAttribute("id", "explotion");
                    document.getElementById("folder").appendChild(explotion);
                }
                //clearField
                else {
                    if (document.getElementById(divId.toString())) {
                        document.getElementById(divId.toString()).style.transition = ".5s";
                        document.getElementById(divId.toString()).style.transform = "scale(.9)";
                        document.getElementById(divId.toString()).style.boxShadow = "0px 0px 1px #111111";
                        document.getElementById(divId.toString()).style.backgroundColor = "#004d40";
                        if (table[divId] != 0) document.getElementById(divId.toString()).innerHTML = table[divId];
                    }

                    //checkNeighbour
                    if (table[divId] == 0) setTimeout(CheckNeighbour, Math.floor(Math.random() * 100) + 50, divId);

                    score += 1; //score
                    document.getElementById("score").innerHTML = "(" + bombNumber + "/" + foundMines + ") Score: " + (score * bombNumber);
                    table[divId] += 100;

                    TileAudio();
                }
            }
        }

        //gameCompleted (foundMines == bombNumber)
        if (score == (tileNumber - bombNumber)) {
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("gameOver").style.backgroundColor = "rgba(0, .52, .46, .2)";
            document.getElementById("gameOver").style.boxShadow = "inset 0 0 30vw #143805";
            document.getElementById("winFolder").style.display = "block";
            document.getElementById("winScore").innerHTML = "Score: " + (score * bombNumber) + " (" + bombNumber + " | " + tableSize[0] + "x" + tableSize[1] + ")";

            setTimeout(WinAudio, 650);
        }
    }
}

function CheckNeighbour(i) {
    var i = parseInt(i);
    //top
    if (i > (tableSize[0] - 1)) {
        if (table[i - tableSize[0]] < 10) Clicked(i - tableSize[0], 0);
    }
    //bottom
    if (i < tileNumber - tableSize[0]) {
        if (table[i + tableSize[0]] < 10) Clicked(i + tableSize[0], 0);
    }
    //left
    if (i % tableSize[0] > 0) {
        if (table[i - 1] < 10) Clicked(i - 1, 0);
    }
    //right
    if (i % tableSize[0] < (tableSize[0] - 1)) {
        if (table[i + 1] < 10) Clicked(i + 1, 0);
    }
    //topLeft
    if (i > tableSize[0] && (i - (tableSize[0] + 1)) % tableSize[0] < (tableSize[0] - 1)) {
        if (table[i - (tableSize[0] + 1)] < 10) Clicked(i - (tableSize[0] + 1), 0);
    }
    //topRight
    if (i > tableSize[0] && (i - (tableSize[0] - 1)) % tableSize[0] > 0) {
        if (table[i - (tableSize[0] - 1)] < 10) Clicked(i - (tableSize[0] - 1), 0);
    }
    //bottomLeft
    if (i < tileNumber - tableSize[0] && (i + (tableSize[0] - 1)) % tableSize[0] < (tableSize[0] - 1)) {
        if (table[i + (tableSize[0] - 1)] < 10) Clicked(i + (tableSize[0] - 1), 0);
    }
    //bottomRight
    if (i < tileNumber - tableSize[0] && (i + (tableSize[0] + 1)) % tableSize[0] > 0) {
        if (table[i + (tableSize[0] + 1)] < 10) Clicked(i + (tableSize[0] + 1), 0);
    }
}

//game over
var reaminingTiles = 0;

function RevealSingleTile(i) {
    if (document.getElementById(i.toString())) {
        if (table[i] < 0) {
            table[i] += 100;
            if (table[i] < 10) document.getElementById(i.toString()).innerHTML = table[i];
            else if (table[i] == 10) document.getElementById(i.toString()).innerHTML = "X";
        } else if (table[i] < 10) {
            document.getElementById(i.toString()).style.backgroundColor = "#bb86fc";
            if (table[i] != 0) document.getElementById(i.toString()).innerHTML = table[i];
        } else if (table[i] == 10) {
            document.getElementById(i.toString()).style.backgroundColor = "#b00020";
            document.getElementById(i.toString()).innerHTML = "X";
        }
        if (i < tileNumber - 1) {
            document.getElementById(i.toString()).style.transition = ".5s";
            table[i] = 0;
            i++;
            setTimeout(RevealSingleTile, 2, i);
        }
    }
}



//animations
function BreathAnimation(breatheIn) {
    if (breatheIn) document.getElementById("gameScreen").style.boxShadow = "inset 0 0 20vw #000000";
    else document.getElementById("gameScreen").style.boxShadow = "inset 0 0 15vw #000000";
    setTimeout(BreathAnimation, 4000, !breatheIn);
}



//audio
var audioEnabled = false;

function Audio() {
    if (audioEnabled) {
        audioEnabled = false;
        document.getElementById("audio").innerHTML = "Unmute";
    } else {
        audioEnabled = true;
        document.getElementById("audio").innerHTML = "Mute";
    }
}


function TileAudio() {
    if (audioEnabled) {
        var audio = new Audio();
        audio.src = 'Audio/Tile.ogg';
        audio.volume = .05;
        audio.play();
    }
}

function MarkAudio() {
    if (audioEnabled) {
        var audio = new Audio();
        audio.src = 'Audio/Mark.ogg';
        audio.volume = .2;
        audio.play();
    }
}

function WrongAudio() {
    if (audioEnabled) {
        var audio = new Audio();
        audio.src = 'Audio/Wrong.ogg';
        audio.volume = .2;
        audio.play();
    }
}

function WinAudio() {
    if (audioEnabled) {
        var audio = new Audio();
        audio.src = 'Audio/Win.ogg';
        audio.volume = .2;
        audio.play();
    }
}

function HoverAudio() {
    if (audioEnabled) {
        var audio = new Audio();
        audio.src = 'Audio/Hover.ogg';
        audio.volume = .2;
        audio.play();
    }
}