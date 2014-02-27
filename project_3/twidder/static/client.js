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
var xmlhttp = new XMLHttpRequest();
var ws = new WebSocket("ws://127.0.0.1:5000/socket");
ws.onopen = function(e){
    ws.send('hej')
    console.log("connection opened");
}
ws.onmessage = function(msg){
    //loadMyWall();
    //loadSearchWall();
    console.log("onmessage kör");
}
ws.onclose = function(e) {
    console.log(e);
    console.log("connection closed");
}
ws.onerror = function(e){
    console.log(e);
}

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
        //loadPersonalInfo();
        loadMyWall();


    }
};

var getSocket = function(){
    ws = new WebSocket("ws://127.0.0.1:5000/socket");
    ws.onopen = function(e){
        console.log("connection opened");
    }
    ws.onmessage = function(msg){
        console.log("hej");
    }
}

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
        changeMsg.innerHTML = "";
        xmlhttp.open("POST","http://127.0.0.1:5000/changepassword",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                var response = JSON.parse(xmlhttp.responseText);
                console.log(response);
                changeMsg.innerHTML = response.message;                  
                oldPass.value = "";
                newPass.value = "";
            }
        }
        xmlhttp.send("token="+window.localStorage.token+"&oldpassword="+oldPass.value+"&newpassword="+newPass.value);
        
    } else {
        oldPass.classList.add("error");
        newPass.classList.add("error");
    }
}

//ok
var signOut = function() {

    xmlhttp.open("POST","http://127.0.0.1:5000/signout",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);
            if (response.success) {
                window.localStorage.removeItem("token");
                displayView();
            }
        }
    }
    xmlhttp.send("token="+window.localStorage.token);
    
    
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
        xmlhttp.open("POST","http://127.0.0.1:5000/signin",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var response = JSON.parse(xmlhttp.responseText);
                document.getElementById("loginMsg").innerHTML = response.message;
                if (!response.success) {
                    inputs["logemail"].classList.add("error");
                    inputs["logpassword"].classList.add("error");
                }

                if (response.success) {
                    window.localStorage.token = response.data;
                    displayView();
                }
            }
        };    
        xmlhttp.send("email="+email+"&password="+password);
        //document.getElementById("loginMsg").innerHTML 
        
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
        xmlhttp.open("POST","http://127.0.0.1:5000/signup",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var response = JSON.parse(xmlhttp.responseText);
                console.log(response);
                document.getElementById("signupMsg").innerHTML = response.message;
            }
        };    
        xmlhttp.send("email="+formInputs.email+"&password="+formInputs.password+"&firstname="+formInputs.firstname+"&familyname="+formInputs.familyname+"&gender="+formInputs.gender+"&city="+formInputs.city+"&country="+formInputs.country);
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
    xmlhttp.open("GET","http://127.0.0.1:5000/getuserdata?token="+window.localStorage.token, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var inf = document.getElementById("personalInfo").getElementsByTagName("label");
            var info = JSON.parse(xmlhttp.responseText);
            console.log(info);
            inf["fname"].innerHTML = info.user[2];
            inf["lname"].innerHTML = info.user[3];
            inf["email"].innerHTML = info.user[0];
            inf["gender"].innerHTML = info.user[4];
            inf["city"].innerHTML = info.user[5];
            inf["country"].innerHTML = info.user[6];
        }

    };
    xmlhttp.send();   
}

var loadBrowseProfile = function() {
    document.getElementById("browseProfile").classList.remove("hide");
    xmlhttp.open("GET","http://127.0.0.1:5000/getuserdataemail?token="+window.localStorage.token+"&email="+foundEmail, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var info = JSON.parse(xmlhttp.responseText);
            var inf = document.getElementById("browseProfile").getElementsByTagName("label");
            inf["fnameBrowse"].innerHTML = info.user[2];
            inf["lnameBrowse"].innerHTML = info.user[3];
            inf["emailBrowse"].innerHTML = info.user[0];
            inf["genderBrowse"].innerHTML = info.user[4];
            inf["cityBrowse"].innerHTML = info.user[5];
            inf["countryBrowse"].innerHTML = info.user[6];
        }
    };
    xmlhttp.send();    
}

var postMsg = function() {
    var msg = document.getElementById("postMsg").value;
    if (msg == "")
        return;
    xmlhttp.open("POST","http://127.0.0.1:5000/postmessage",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        	console.log("okejsadnakbdiasbdoabd");
            loadMyWall();   
        }
    };
    xmlhttp.send("token="+window.localStorage.token+"&message="+msg+"&email=");
}

var postBrowseMsg = function() {
    var msg = document.getElementById("postMsgBrowse").value;
    if (msg == "")
        return;
    xmlhttp.open("POST","http://127.0.0.1:5000/postmessage",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            loadSearchWall();   
        }
    };
    xmlhttp.send("token="+window.localStorage.token+"&message="+msg+"&email="+foundEmail);
}

//------
var loadMyWall = function() {
    var mail = foundEmail;    
    xmlhttp.open("GET", "http://127.0.0.1:5000/getmessagetoken?token="+window.localStorage.token, true);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var wall = document.getElementById("myWall");
            var msg = JSON.parse(xmlhttp.responseText);
            if (msg.success) {
                loadPersonalInfo();
                loadWall(msg, wall);
            };
        }
        console.log("load my wall");
    };
    xmlhttp.send();
    /*var msg = serverstub.getUserMessagesByToken(window.localStorage.token);
    var wall = document.getElementById("myWall");
    loadWall(msg, wall);*/
}

var loadSearchWall = function() {
    var mail = document.getElementById("searchField").value;
    xmlhttp.open("GET","http://127.0.0.1:5000/getmessageemail?token="+window.localStorage.token+"&email="+mail,true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var inf = document.getElementById("personalInfo").getElementsByTagName("label");
            var info = JSON.parse(xmlhttp.responseText);
            console.log(info);
            var wall = document.getElementById("browseWall");
            if (info.success) {
                document.getElementById("msgBrowse").innerHTML = "";
                foundEmail = mail;
                loadBrowseProfile();
                document.getElementById("messageBoxBrowse").classList.remove("hide");
                loadWall(info, wall);
            } else {
                document.getElementById("msgBrowse").innerHTML = info.message;
                document.getElementById("browseProfile").classList.add("hide");
                document.getElementById("messageBoxBrowse").classList.add("hide");
                clearWall(wall);
            }
        }
    };    
    xmlhttp.send();      
}

var loadWall = function(msg, wall) {
    clearWall(wall);
    addToWall(msg, wall);
}

var clearWall = function(wall) {
    wall.innerHTML = "";
}

var addToWall = function(msg, wall) {
    console.log(msg.messages.length);
    if (msg.messages.length == 0) {
        return
    };
    for (var i = msg.messages.length - 1; i >= 0; i--) {
        wall.innerHTML += "<div class=\"wallContent\">" + "<label id=\"writer\">" + "From:" + msg.messages[i][1] + "</label>" + msg.messages[i][2] + "</div>";
    };
}

//          \__\
//      o   (oo)
//   ____\___\/ 
//  / |     ||  
// *  ||----||  
//    OO    OO
