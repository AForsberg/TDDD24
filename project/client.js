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

	if (window.localStorage.loggedinusers) {
    	document.getElementById("view").innerHTML = document.getElementById("profileView").innerHTML;
    }else{
    	document.getElementById("view").innerHTML = document.getElementById("welcomeView").innerHTML;

    	var a = document.getElementsByTagName("input")

	    for(var i = 0; i < a.length; i++) 
	    {
	    	a[i].addEventListener("keypress", function(e) {
	    		e.target.classList.remove("error");
	    		document.getElementById("loginMsg").innerHTML = "";
	    		if(e.target == document.getElementById("logemail") || e.target == document.getElementById("logepassword")){
	    			document.getElementById("logemail").classList.remove("error");
	    			document.getElementById("logpassword").classList.remove("error");
	    		}
	    	});
	    }
	    }

};

window.onload = function() {
    //Runs when page is loaded
    displayView();

};


var validateLogin = function(){

	
	var email = document.getElementById("logemail").value;
	var password = document.getElementById("logpassword").value;

	var inputs = document.getElementById("login").getElementsByTagName("input");
    var noError = true;
    for (var i = inputs.length - 1; i >= 0; i--) {
        if (inputs[i].value == "") {
            inputs[i].classList.add("error");
            noError = false;
        }
    };
    if(noError == true){
    	document.getElementById("loginMsg").innerHTML = serverstub.signIn(email, password).message;
    	if(!serverstub.signIn(email, password).success){
    		inputs["logemail"].classList.add("error");
    		inputs["logpassword"].classList.add("error");
    	}
    	window.localStorage = serverstub.signIn(email, password).data;
    	if(window.localStorage.loggedinusers){
    		displayView();
    	}
    }
    else
    	console.log("Failed!");
    return noError;
}

var validateSignUp = function(formData) {

	var formInputs = new Object();
	formInputs.email = document.getElementById("email").value;
	formInputs.password = document.getElementById("password").value;
	formInputs.firstname = document.getElementById("firstname").value;
	formInputs.familyname = document.getElementById("familyname").value;
	formInputs.gender = document.getElementById("gender").value;
	formInputs.city = document.getElementById("city").value;
	formInputs.country = document.getElementById("country").value;

    var inputs = document.getElementById("signup").getElementsByTagName("input");
    var noError = true;
    for (var i = inputs.length - 1; i >= 0; i--) {
        if (inputs[i].value == "") {
            inputs[i].classList.add("error");
            noError = false;
        }
    };
    if (!noError) {
        if (inputs["password"].value != inputs["rpsw"].value) {
            inputs["password"].classList.add("error");
            inputs["rpsw"].classList.add("error");
            inputs["password"].value = "";
            inputs["rpsw"].value = "";
            noError = false;
        }
    }
    if(noError == true){
    	document.getElementById("signupMsg").innerHTML = serverstub.signUp(formInputs).message;
    }
    else
    	console.log("Failed!");
    return noError;
}


