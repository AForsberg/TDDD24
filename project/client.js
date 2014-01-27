//          (__)
//          (oo)
//           \/ 
//           || 
//           || 
//           || 
//           || 
//   /------- / 
//  / |     ||  
// *  ||----||  
//    ~~    ~~  



var displayView = function() {
    //Displays a view
};

window.onload = function() {
    //Runs when page is loaded
    document.getElementById("view").innerHTML += document.getElementById("welcomeView").innerHTML;
    var a = document.querySelectorAll("input")

    for(var i = 0; i < a.length; i++) 
    {
    	a[i].addEventListener("keypress", function(e) {
    		e.target.classList.remove("error");
    	});
    }
};

var signUp = function() {
    return validateSignUp();
}

var validateSignUp = function() {
    var inputs = document.getElementById("signup").getElementsByTagName("input");
    var noError = true;
    for (var i = inputs.length - 1; i >= 0; i--) {
        if (inputs[i].value == "") {
            inputs[i].classList.add("error");
            noError = false;
        }
    };
    if (!noError) {
        if (inputs["psw"].value != inputs["rpsw"].value) {
            inputs["psw"].classList.add("error");
            inputs["rpsw"].classList.add("error");
            inputs["psw"].value = "";
            inputs["rpsw"].value = "";
            noError = false;
        }
    }
    if(noError == true)
    	document.getElementById("signupMsg").innerHTML = "Success!"
    console.log(noError);
    return noError;
}


