const express    = require("express")
      mongoose   = require("mongoose"),
      app        = express(),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      Portfolio  = require("./models/portfolio"),
      User     = require("./models/user");
 //      seedDB     = require("./seed");


const url = process.env.PORTFOLIODB || "mongodb://localhost:27017/portfolio";
mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);    

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Czterech pancernych i pies.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});

 //seedDB();

 isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.get("/", (req, res) => {
    Portfolio.find().then(entries => res.render("home", {entries: entries}))
                     .catch(err => console.log(err));
});

app.get("/computer", (req, res) => {
    Portfolio.find().then(entries => res.render("computer", {entries: entries}))
                     .catch(err => console.log(err));
});

app.get("/new", isLoggedIn, (req, res) => res.render("new"));

app.post("/", isLoggedIn, (req, res) => {
    const newEntry = req.body.portfolio;
    const developedWithArr = newEntry.developedWith.split(",").map(item => item.trim()).filter(Boolean);
    newEntry.developedWith = developedWithArr;
    Portfolio.create(newEntry)
              .then(() => {
                  return res.redirect("/");
                })
              .catch(err => console.log(err));
});

//register form
app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password)
        .then(user => passport.authenticate("local")(req, res, () => {
            return res.redirect("/");
        }))
        .catch(err => {
            console.log(err);
            return res.redirect("/register");
        });

});

//login form
app.get("/login", (req, res) => res.render("login"));

//logging in action
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), (req, res) => {});

//logging out action
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("back");
});


var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
    console.log("Server Started");
});



