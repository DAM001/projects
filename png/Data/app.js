function showMenu(show, type) {
    if (show) {
        document.getElementById("gameMenu").style.display = "block";
        document.getElementById("gameFolder").style.display = "none";
        document.getElementById("splashScreen").style.display = "none";

        ui.playMenuMusic();
    } else {
        document.getElementById("gameMenu").style.display = "none";
        document.getElementById("gameFolder").style.display = "block";

        player.setSkin(type);
    }
}


function start() {
    setTimeout(info, 100);
    setTimeout(showMenu, 4000, true);
}

function info() {
    //  ████████    ██████████  ██████████  
    //  ██    ██    ██      ██  ██      ██  
    //  ██    ████  ██  ██  ██  ██  ██  ██  
    //  ██      ██  ██      ██  ██  ██  ██  
    //  ██████████  ██      ██  ██  ██  ██  

    console.log("%c\n                                      \n  ████████    ██████████  ██████████  \n  ██    ██    ██      ██  ██      ██  \n  ██    ████  ██  ██  ██  ██  ██  ██  \n  ██      ██  ██      ██  ██  ██  ██  \n  ██████████  ██      ██  ██  ██  ██  \n                                      \n", 'background: #000; color: #fff;');
    console.log("Made with love for Play'n Go frontend team! :D");
}