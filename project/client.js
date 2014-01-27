var displayView = function() {
    //Displays a view
};

window.onload = function() {
    //Runs when page is loaded
    var temp = document.getElementById("welcomeView").innerHTML;
    console.log(temp);
    document.getElementById("view").innerHTML += temp;
};
