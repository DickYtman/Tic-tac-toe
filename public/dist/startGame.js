function profile() {
    var selectedSymbol = document.querySelectorAll(".imgPlayer, .idImg");
    selectedSymbol.forEach(function (imgPlayer) {
        imgPlayer.addEventListener("click", function (e) {
            var target = e.target;
        });
    });
}
profile();
