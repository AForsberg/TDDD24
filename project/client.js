var displayView = function() {
    //Displays a view
};

window.onload = function() {
    //Runs when page is loaded
    document.getElementById("view").innerHTML += document.getElementById("welcomeView").innerHTML;
};

var signUp = function() {
    return validateSignUp();
}

var validateSignUp = function() {
    var inputs = document.getElementById("signup").getElementsByTagName("input");
    var noError = true;
    for (var i = inputs.length - 1; i >= 0; i--) {
        if (inputs[i].value == "") {
            inputs[i].style.borderColor = "red";
            noError = false;
        }
    };
    if (!noError) {
        if (inputs["psw"].value != inputs["rpsw"].value) {
            inputs["psw"].style.borderColor = "red";
            inputs["rpsw"].style.borderColor = "red";
            inputs["psw"].value = "";
            inputs["rpsw"].value = "";
            noError = false;
        }
    }
    console.log(noError);
    return noError;
}

var clearit = function() {
	console.log("hej");
}
