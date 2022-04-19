window.onload = function() { setTimeout(wait, 1000); };
var _AnimationDuration = 25;
var i = 0;

function wait() {
    if (i <= 21) {
        do { //top
            var element = document.getElementById(i.toString());
            if (element != null) {
                element.style.backgroundColor = "var(--piece-color)";
                element.style.animation = "piece .2s linear, .3s pieceIdle 2s linear, 1s pieceNone 2.3s infinite";
                element.id = "";
            }
        } while (element != null)
        i++;

        if (i <= 21) setTimeout(wait, _AnimationDuration);
    }
}