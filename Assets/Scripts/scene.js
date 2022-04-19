class Scene {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.app = new PIXI.Application({
            width: this.width,
            height: this.height,
            backgroundColor: 0x050505
        });

        document.getElementById("content").appendChild(this.app.view);
    }

    SetParent(childObject) {
        this.app.stage.addChild(childObject);
    }

    get GetWidth() { return this.width; }
    get GetHeight() { return this.height; }
}