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

	if (!window.localStorage.token) {
		document.getElementById("view").innerHTML = document.getElementById("welcomeView").innerHTML;
    	
    }else{
    	document.getElementById("view").innerHTML = document.getElementById("profileView").innerHTML;
    	changeView(document.getElementById("home"));

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
var showPasswordChanger = function(){
	document.getElementById("passwordChanger").classList.remove("hide");
	document.getElementById("passwordChanger").classList.add("show");
}
var changePassword = function(){
		var oldPass = document.getElementById("oldPassword");
		var newPass = document.getElementById("newPassword");
		var changeMsg = document.getElementById("changeMsg");

		if(oldPass.value != "" && newPass.value != ""){

			
			changeMsg.innerHTML = serverstub.changePassword(window.localStorage.token, oldPass.value, newPass.value).message;
		}
		else{
			oldPass.classList.add("error");
			newPass.classList.add("error");
		}
}
var signOut = function(){
	if(serverstub.signOut(window.localStorage.token).success){
		if(window.localStorage.token){
		window.localStorage.removeItem("token");
	}
	}
	displayView();
}

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
    	var response = serverstub.signIn(email, password);
    	document.getElementById("loginMsg").innerHTML = response.message;
    	if(!response.success){
    		inputs["logemail"].classList.add("error");
    		inputs["logpassword"].classList.add("error");
    	}
    	
    	// window.localStorage.token = serverstub.signIn(email, password).data;
    	if(response.success){
    		localStorage.token = response.data;
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
var changeView = function(a){
	var bars = document.getElementById("choiceBar").getElementsByTagName("div");
	var buttons = document.getElementById("menuBar").getElementsByTagName("div");
	for (var i = bars.length - 1; i >= 0; i--) {
		bars[i].classList.add("hide");
	};
	for (var i = buttons.length - 1; i >= 0; i--) {
		buttons[i].classList.remove("selected");
	};
	var selected = document.getElementById(a.id+"Bar");
	console.log(selected);
	selected.classList.remove("hide");
	selected.classList.add("show");
	a.classList.add("selected");
}

//          \__\
//      o   (oo)
//   ____\___\/ 
//  / |     ||  
// *  ||----||  
//    OO    OO  


