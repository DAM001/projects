//Inspired by:
//https://www.youtube.com/watch?v=-L-WgKMFuhE&t=75s

//project started on 2021.01.24.

class TileMap {
    constructor(width, height) {
        this.Width = width;
        this.Height = height;

        this.TileValue = [];
        this.TileChecked = [];
        this.TileFrom = [];
    }

    //properties
    GetWidth() { return this.Width; }
    SetWidth(width) {
        if (width > 0) this.Width = parseInt(width);
        else console.error("TileMap width: The value (" + width + ") needed to be greater than 0!");
    }

    GetHeight() { return this.Height; }
    SetHeight(height) {
        if (height > 0) this.Height = parseInt(height);
        else console.error("TileMap height: The value (" + height + ") needed to be greater than 0!");
    }


    GetSize() { return parseInt(this.Width * this.Height); }
    SetSize(width, height) {
        this.SetWidth(width);
        this.SetHeight(height);
    }

    GetTileValue(index) {
        if (index > 0 && index <= this.GetSize()) return this.TileValue[index];
        else console.error("TileMap TileValue index: The index (" + index + ") needed to be between 0 and the TileMap width (" + myTileMap.GetSize() + ")");
    }
    SetTileValue(index, value) {
        if (index > 0 && index <= this.GetSize()) this.TileValue[index] = parseInt(value);
        else console.error("TileMap TileValue index: The index (" + index + ") needed to be between 0 and the TileMap width (" + myTileMap.GetSize() + ")");
    }


    //functions
    CreateMap() {
        //set folder size
        document.getElementById("mapFolder").style.width = (this.Width + 1) * 20 + "px";
        document.getElementById("mapFolder").style.height = (this.Height + 1) * 20 + "px";

        //create tiles
        var newDiv;
        for (var i = 0; i < this.GetSize(); i++) {
            this.TileValue[i] = parseInt(0);
            this.TileChecked[i] = 0;
            this.TileFrom[i] = 0;

            newDiv = document.createElement("div");
            newDiv.setAttribute("id", i.toString());
            newDiv.setAttribute("class", "tile");
            newDiv.setAttribute("onclick", "SetTile(" + this.GetWidthFromIndex(i) + ", " + this.GetHeightFromIndex(i) + ")");
            document.getElementById("mapFolder").appendChild(newDiv);
            //document.getElementById(i.toString()).innerHTML = this.TileValue[i];
        }
    }

    SetTileColor(index, color) {
        if (index >= 0 && index <= this.GetSize()) {
            document.getElementById(index.toString()).style.backgroundColor = color;
        } else console.error("TileMap color index: The index (" + index + ") needed to be between 0 and the TileMap width (" + this.GetSize() + ")");
    }


    //logic
    GetTileValue(index) {
        if (index >= 0 && index <= this.GetSize()) return this.TileValue[index];
        else console.error("TileMap value index: The index (" + index + ") needed to be between 0 and the TileMap width (" + this.GetSize() + ")");
    }
    SetTileValue(index, value) {
        if (index >= 0 && index <= this.GetSize() && value != null) {
            this.TileChecked[index] = 1;
            this.TileValue[index] = parseInt(value);
            document.getElementById(index.toString()).innerHTML = value;
        } else console.error("TileMap value index: The index (" + index + ") needed to be between 0 and the TileMap width (" + this.GetSize() + "), or missing value");
    }
    GetTileChecked(index) {
        return this.TileChecked[index];
    }
    SetTileChecked(index, value) {
        this.TileChecked[index] = value;
    }
    SetTileFrom(index, fromIndex) {
        this.TileFrom[index] = fromIndex;
    }
    GetTileFrom(index) {
        return this.TileFrom[index];
    }


    SetWall(x, y) {
        this.SetTileValue(x + y * this.GetHeight(), -5);
        this.SetTileColor(x + y * this.GetHeight(), "#792a80");
    }

    ResetTile(x, y) {
        var index = this.GetIndexFromXY(x, y);
        MyTileMap.SetTileColor(index, "#3d494e");
        MyTileMap.SetTileValue(index, 0);
        document.getElementById(index.toString()).innerHTML = "";
    }



    //help functions
    GetWidthFromIndex(index) {
        return parseInt(index % this.GetWidth());
    }
    GetHeightFromIndex(index) {
        var height = 0;
        while (true) {
            if (index < this.GetWidth()) return parseInt(height);
            index -= this.GetWidth();
            height++;
            if (height > this.GetHeight()) break;
        }
    }
    GetIndexFromXY(x, y) {
        return x + y * this.GetWidth();
    }
}

class Target {
    constructor(x, y, tileMap) {
        this.X = x;
        this.Y = y;
        this.MyTileMap = tileMap;
    }

    GetX() { return this.X; }
    SetX(x) {
        if (x >= 0 && x <= MyTileMap.GetWidth()) this.X = parseInt(x);
        else console.error("Target x position: The value (" + x + ") needed to be between 0 and the TileMap width (" + MyTileMap.GetWidth() + ")");
    }
    GetY() { return this.Y; }
    SetY(y) {
        if (y >= 0 && y <= MyTileMap.GetHeight()) this.Y = parseInt(y);
        else console.error("Target y position: The value (" + y + ") needed to be between 0 and the TileMap width (" + MyTileMap.GetHeight() + ")");
    }

    SetPosiotion(x, y) {
        this.SetX(x);
        this.SetY(y);

        MyTileMap.SetTileColor(this.GetX() + this.GetY() * MyTileMap.GetWidth(), "#eb5b34");
        MyTileMap.SetTileValue(this.GetX() + this.GetY() * MyTileMap.GetWidth(), -20);
    }
}

class PathFinder {
    constructor(x, y, target, tileMap) {
        this.X = x;
        this.Y = y;
        this.MyTarget = target;
        this.MyTileMap = tileMap;

        this.StartX = 0;
        this.StartY = 0;
        this.PathFinded = false;
    }

    GetX() { return this.X; }
    SetX(x) {
        if (x >= 0 && x <= MyTileMap.GetWidth()) this.X = parseInt(x);
        else console.error("PathFinder x position: The value (" + x + ") needed to be between 0 and the TileMap width (" + MyTileMap.GetWidth() + ")");
    }
    GetY() { return this.Y; }
    SetY(y) {
        if (y >= 0 && y <= MyTileMap.GetHeight()) this.Y = parseInt(y);
        else console.error("PathFinder x position: The value (" + y + ") needed to be between 0 and the TileMap width (" + MyTileMap.GetHeight() + ")");
    }
    GetPositionIndex() { return this.GetX() + this.GetY() * MyTileMap.GetHeight(); }

    SetPosiotion(x, y) {
        this.SetX(x);
        this.SetY(y);
    }

    GetStartPositionX() { return this.StartX; }
    GetStartPositionY() { return this.StartY; }
    SetStartPosition(x, y) {
        this.StartX = x;
        this.StartY = y;

        MyTileMap.SetTileColor(this.StartX + this.StartY * MyTileMap.GetWidth(), "#34802a");
        MyTileMap.SetTileValue(this.StartX + this.StartY * MyTileMap.GetWidth(), -10);
    }


    PathFind() {
        this.PathCheck();
    }
    PathCheck(x, y) {
        var tableWidth = MyTileMap.GetWidth();
        var tileNumber = MyTileMap.GetSize();
        var index = x + y * MyTileMap.GetWidth();

        var results = [];
        var findedTarget = 0;

        //console.log("Path checked");
        //top
        var tileScore = parseFloat(0);
        var indexNumber = index - tableWidth;
        if (index >= tableWidth) {
            if (MyTileMap.GetTileChecked(indexNumber) == 0) {
                tileScore = this.GetTileScore(x, y - 1);
                MyTileMap.SetTileValue(indexNumber, tileScore);
                results[0] = tileScore;
                tileScore = 0;
                MyTileMap.SetTileFrom(indexNumber, index);
            }
            if (MyTileMap.GetTileValue(indexNumber) == -20) findedTarget = 1;
        }
        //bottom
        indexNumber = index + tableWidth;
        if (index < tileNumber - tableWidth) {
            if (MyTileMap.GetTileChecked(indexNumber) == 0) {
                tileScore = this.GetTileScore(x, y + 1);
                MyTileMap.SetTileValue(indexNumber, tileScore);
                results[1] = tileScore;
                tileScore = 0;
                MyTileMap.SetTileFrom(indexNumber, index);
            }
            if (MyTileMap.GetTileValue(indexNumber) == -20) findedTarget = 1;
        }
        //left
        indexNumber = index - 1;
        if (index % tableWidth > 0) {
            if (MyTileMap.GetTileChecked(indexNumber) == 0) {
                tileScore = this.GetTileScore(x - 1, y);
                MyTileMap.SetTileValue(indexNumber, tileScore);
                results[2] = tileScore;
                tileScore = 0;
                MyTileMap.SetTileFrom(indexNumber, index);
            }
            if (MyTileMap.GetTileValue(indexNumber) == -20) findedTarget = 1;
        }
        //right
        indexNumber = index + 1;
        if (index % tableWidth < (tableWidth - 1)) {
            if (MyTileMap.GetTileChecked(indexNumber) == 0) {
                tileScore = this.GetTileScore(x + 1, y);
                MyTileMap.SetTileValue(indexNumber, tileScore);
                results[3] = tileScore;
                MyTileMap.SetTileFrom(indexNumber, index);
            }
            if (MyTileMap.GetTileValue(indexNumber) == -20) findedTarget = 1;
        }


        if (findedTarget == 1) this.SetPathFinded(index);


        //find the smallest value tile index (all)
        var smallestTileIndex = 0;
        for (var i = 0; i < MyTileMap.GetSize(); i++) {
            if (MyTileMap.GetTileChecked(i) == 1) {
                if (smallestTileIndex == 0 && MyTileMap.GetTileValue(i) > 0)
                    smallestTileIndex = i;
                else if (MyTileMap.GetTileValue(i) > 0 && MyTileMap.GetTileValue(i) < MyTileMap.GetTileValue(smallestTileIndex))
                    smallestTileIndex = i;
            }
        }

        MyTileMap.SetTileChecked(smallestTileIndex, 2);
        return smallestTileIndex;
    }
    GetTileScore(x, y) {
        var a = this.GetStartPositionX() - x;
        if (a < 0) a *= -1;
        var b = this.GetStartPositionY() - y;
        if (b < 0) b *= -1;
        var startDistance = Math.sqrt(parseFloat((a * a + b * b)));
        a = MyTarget.GetX() - x;
        if (a < 0) a *= -1;
        b = MyTarget.GetY() - y;
        if (b < 0) b *= -1;
        var targetDistance = Math.sqrt(parseFloat((a * a + b * b)));
        return parseFloat(startDistance + targetDistance).toFixed(1) * 10;
    }


    GetWidth(width) {
        var currentWidth = width - MyTarget.GetX();
        if (currentWidth < 0) currentWidth *= -1;
        return parseInt(currentWidth);
    }
    GetHeight(height) {
        var currentHeight = height - MyTarget.GetY();
        if (currentHeight < 0) currentHeight *= -1;
        return parseInt(currentHeight);
    }


    SetPathFinded(lastIndex) {
        while (MyTileMap.GetTileValue(MyTileMap.GetTileFrom(lastIndex)) != -10) {
            MyTileMap.SetTileColor(lastIndex, "#a8a8a8");
            lastIndex = MyTileMap.GetTileFrom(lastIndex);
        }
        MyTileMap.SetTileColor(lastIndex, "#a8a8a8");

        this.PathFinded = true;
    }
    GetPatFhinded() {
        return this.PathFinded;
    }
}













//START

let MyTileMap = new TileMap(10, 10);
let MyTarget = new Target(5, 5, MyTileMap);
let MyPathFinder = new PathFinder(0, 0, MyTarget, MyTileMap);

function PageStart() {
    console.log("Page loaded");
}

function CheckNextPath(smallestIndex) {
    smallestIndex = MyPathFinder.PathCheck(MyTileMap.GetWidthFromIndex(smallestIndex), MyTileMap.GetHeightFromIndex(smallestIndex));
    if (!MyPathFinder.GetPatFhinded()) setTimeout(CheckNextPath, 50, smallestIndex);
}

//other
function CreateMap() {
    document.getElementById("content").style.display = "block";
    document.getElementById("mapSettings").style.display = "none";

    MyTileMap.SetSize(document.getElementById("mapWidth").value, document.getElementById("mapHeight").value);
    MyTileMap.CreateMap();
}


var Started = 0;

function Start() {
    if (Started == 0) {
        CheckNextPath(MyTileMap.GetIndexFromXY(MyPathFinder.GetStartPositionX(), MyPathFinder.GetStartPositionY()));
        Started++;
        document.getElementById("StartButton").innerHTML = "Restart";
    } else {
        location.reload();
    }
}


//0 - clear | 1 - start | 2 - end | 3 - wall
var PlaceBlockType = 0;

function SetTile(x, y) {
    if (PlaceBlockType == 0) MyTileMap.ResetTile(x, y);
    else if (PlaceBlockType == 1) MyPathFinder.SetStartPosition(x, y);
    else if (PlaceBlockType == 2) MyTarget.SetPosiotion(x, y);
    else if (PlaceBlockType == 3) MyTileMap.SetWall(x, y);
}

function ChangePlacedTile() {
    if (PlaceBlockType < 3) PlaceBlockType++;
    else PlaceBlockType = 0;

    if (PlaceBlockType == 0) document.getElementById("TilePlaceButton").innerHTML = "Reset tile";
    else if (PlaceBlockType == 1) document.getElementById("TilePlaceButton").innerHTML = "Start tile";
    else if (PlaceBlockType == 2) document.getElementById("TilePlaceButton").innerHTML = "Target tile";
    else if (PlaceBlockType == 3) document.getElementById("TilePlaceButton").innerHTML = "Wall tile";
}