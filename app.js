const express    = require("express")
      mongoose   = require("mongoose"),
      app        = express(),
      Portfolio  = require("./models/portfolio"),
      seedDB     = require("./seed");


const url = process.env.PORTFOLIODB || "mongodb://localhost:27017/portfolio";
mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);    

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

app.get("/", (req, res) => {
    Portfolio.find().then(entries => res.render("home", {entries: entries}))
                     .catch(err => console.log(err));
});

app.get("/about", (req, res) => {
    res.render("about");
});


var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
    console.log("Server Started");
});
