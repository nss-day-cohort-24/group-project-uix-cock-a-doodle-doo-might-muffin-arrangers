"use strict";
console.log("main js here");
  

       let $ = require('jquery'),
       news = require("./news-Getter"),
       meetup = require('./ajaxCall'),
       bookSearch = require("./books-getter"),
       weather=require("./weather_load"),
       user=require("./user"),
       DOMbuild =require("./add_user"),      
       firebase = require("./config"),
      interaction=require("./user-interaction");


// Preparing the object to be posted to firebase
function createUserObj() {
    let userObj = {
        name: "",
        location: "",
        uid: user.getUser()
    };
    console.log("userObj", userObj);
    return userObj;
}

//login//
$("#login").click(function () {
    console.log("clicked auth");
    user.logInGoogle()
        .then((result) => {
            console.log("result from login", result.user.uid);
            user.setUser(result.user.uid);
            $("#login").addClass("d-none");
            $("#userPic").removeClass("d-none").html(`<img src="${result.user.photoURL}" alt="${result.user.displayName} photo from Google" class="profPic rounded-circle">`);
            console.log("login complete!");
            sendToFirebase();
        });

});
         
$("#logout").click(() => {
    console.log("logout clicked");
    user.logOut();
    $("#userPic").addClass("d-none");
    $("#login").removeClass("d-none");
    $("#logout").addClass("d-none");
    $("#secondaryLogin").removeClass("d-none");
});


function sendToFirebase() {
    let userBuild = createUserObj();
    //need to add logic to not add to firebase if user is already in firebase by UID
    user.addUser(userBuild);
}    
