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

var foundEmail = null;

var displayView = function() {
    if (!window.localStorage.token) {
        document.getElementById("view").innerHTML = document.getElementById("welcomeView").innerHTML;
        var a = document.getElementsByTagName("input")
        for (var i = 0; i < a.length; i++) {
            a[i].addEventListener("keypress", function(e) {
                e.target.classList.remove("error");
                document.getElementById("loginMsg").innerHTML = "";
                if (e.target == document.getElementById("logemail") || e.target == document.getElementById("logepassword")) {
                    document.getElementById("logemail").classList.remove("error");
                    document.getElementById("logpassword").classList.remove("error");
                }
            });
        }
    } else {
        document.getElementById("view").innerHTML = document.getElementById("profileView").innerHTML;
        changeView(document.getElementById("home"));
        loadPersonalInfo();
        loadMyWall();
    }
};

//Runs when page is loaded.
window.onload = function() {
    displayView();
};

var showPasswordChanger = function() {
    document.getElementById("passwordChanger").classList.remove("hide");
}

//ok
var changePassword = function() {
    var oldPass = document.getElementById("oldPassword");
    var newPass = document.getElementById("newPassword");
    var changeMsg = document.getElementById("changeMsg");

    if (oldPass.value != "" && newPass.value != "") {
        changeMsg.innerHTML = serverstub.changePassword(window.localStorage.token, oldPass.value, newPass.value).message;
    } else {
        oldPass.classList.add("error");
        newPass.classList.add("error");
    }
}

//ok
var signOut = function() {
    if (serverstub.signOut(window.localStorage.token).success) {
        if (window.localStorage.token) {
            window.localStorage.removeItem("token");
        }
    }
    displayView();
}

//ok
var validateLogin = function() {
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

    if (noError == true) {
        var response = serverstub.signIn(email, password);
        document.getElementById("loginMsg").innerHTML = response.message;
        if (!response.success) {
            inputs["logemail"].classList.add("error");
            inputs["logpassword"].classList.add("error");
        }

        if (response.success) {
            localStorage.token = response.data;
            displayView();
        }
    }
    return noError;
}

//ok
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
    if (noError == true) {
        document.getElementById("signupMsg").innerHTML = serverstub.signUp(formInputs).message;
    }
    return noError;
}

//ok
var changeView = function(a) {
    var mBtn = document.getElementsByClassName("menuButton");
    var bars = document.getElementsByClassName("content");

    for (var i = bars.length - 1; i >= 0; i--) {
        bars[i].classList.add("hide");
        mBtn[i].classList.remove("selected");
    };

    var selected = document.getElementById(a.id + "Content");
    selected.classList.remove("hide");
    a.classList.add("selected");
}

var loadPersonalInfo = function() {
    var info = serverstub.getUserDataByToken(window.localStorage.token);
    var inf = document.getElementById("personalInfo").getElementsByTagName("label");
    inf["fname"].innerHTML = info.data.firstname;
    inf["lname"].innerHTML = info.data.familyname;
    inf["email"].innerHTML = info.data.email;
    inf["gender"].innerHTML = info.data.gender;
    inf["city"].innerHTML = info.data.city;
    inf["country"].innerHTML = info.data.country;
}

var loadBrowseProfile = function() {
    document.getElementById("browseProfile").classList.remove("hide");
    var info = serverstub.getUserDataByEmail(window.localStorage.token, foundEmail);
    var inf = document.getElementById("browseProfile").getElementsByTagName("label");
    inf["fnameBrowse"].innerHTML = info.data.firstname;
    inf["lnameBrowse"].innerHTML = info.data.familyname;
    inf["emailBrowse"].innerHTML = info.data.email;
    inf["genderBrowse"].innerHTML = info.data.gender;
    inf["cityBrowse"].innerHTML = info.data.city;
    inf["countryBrowse"].innerHTML = info.data.country;
}

var postMsg = function() {
    var msg = document.getElementById("postMsg").value;
    if (msg == "")
        return;
    serverstub.postMessage(window.localStorage.token, msg, null);
    loadMyWall();
}

var postBrowseMsg = function() {
    var msg = document.getElementById("postMsgBrowse").value;
    if (msg == "")
        return;
    serverstub.postMessage(window.localStorage.token, msg, foundEmail);
    loadSearchWall();
}

//------
var loadMyWall = function() {
    var msg = serverstub.getUserMessagesByToken(window.localStorage.token);
    var wall = document.getElementById("myWall");
    loadWall(msg, wall);
}

var loadSearchWall = function() {
    var mail = document.getElementById("searchField").value;
    var msg = serverstub.getUserMessagesByEmail(window.localStorage.token, mail);
    var wall = document.getElementById("browseWall");

    if (msg.success) {
        document.getElementById("msgBrowse").innerHTML = "";
        foundEmail = mail;
        loadBrowseProfile();
        document.getElementById("messageBoxBrowse").classList.remove("hide");
        loadWall(msg, wall);
    } else {
        document.getElementById("msgBrowse").innerHTML = msg.message;
        document.getElementById("browseProfile").classList.add("hide");
        document.getElementById("messageBoxBrowse").classList.add("hide");
        clearWall(wall);
    }
}

var loadWall = function(msg, wall) {
    clearWall(wall);
    addToWall(msg, wall);
}

var clearWall = function(wall) {
    wall.innerHTML = "";
}

var addToWall = function(msg, wall) {
    for (var i = 0; i <= msg.data.length - 1; i++) {
        wall.innerHTML += "<div class=\"wallContent\">" + "<label id=\"writer\">" + "From:" + msg.data[i].writer + "</label>" + msg.data[i].content + "</div>";
    };
}

//          \__\
//      o   (oo)
//   ____\___\/ 
//  / |     ||  
// *  ||----||  
//    OO    OO
