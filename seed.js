const mongoose   = require("mongoose"),
      Portfolio  = require("./models/portfolio");

var data = [
        {
            title: "YelpCamp", 
            image: "/yelp.jpg",
            description: "YelpCamp is a node.js web application designed by Colt Steele for an Udemy course called \"The Web Developer Bootcamp\". This is my attempt at building the YelpCamp web app, where I use all the skills and technologies that I learned during this course.",
            functionality: "Current version of the app allows to register a new account with encrypted password, login, and logout. Logged in users are able to add new camp entries that consist of camp name, image, price, and description. Logged in users can also add comments to existing campgrounds, furthermore, all campgrounds and comments can be edited/deleted by the user who posted them. All comments and campground posts have their \"submitted date\" saved and displayed in the form of time passed since submitted.",
            developedWith: ["HTML5", "CSS3", "Bootstrap4", "JavaScript", "Node.js", "Express.js", "RESTful routing", "MongoDB", "Passport.js"],
            webLink: "https://immense-forest-77804.herokuapp.com/",
            gitLink:"https://github.com/marcin388/YelpCamp/",
            type: "web"
        },
        {
            title: "Colour Game", 
            image: "/color.png",
            description: "Colour Game is a front-end web application designed by Colt Steele for an Udemy course called \"The Web Developer Bootcamp\". Although design originates from the course, I have implemented it using a different approach, using my own jQuery code, and adding more functionalities, as well as improving device compatibility",
            functionality: "This is a simple front-end web app where the task is to guess a colour based on a randomly generated RGB code. Currently difficulty level can be set to easy/medium/hard, each having different amount of colours to pick from. If this project will be expanded in the future I might add countdown and scoring, possibly even highscore board.",
            developedWith: ["HTML5", "CSS3", "Bootstrap4", "JavaScript", "jQuery"],
            webLink: "https://limitless-brook-85640.herokuapp.com/",
            gitLink: "https://github.com/marcin388/Color-Game/",
            type: "web"
        }
    ];


function seedDB(){
    Portfolio.deleteMany()
             .then(() => {
                 data.forEach((seed) => {
                    Portfolio.create(seed);
                    console.log("added Portfolio Entry")
                });
             })
             .catch(err => console.log(err));
}


module.exports = seedDB;