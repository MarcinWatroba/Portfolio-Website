const express = require("express")
      app     = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// var port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log("Server started");
// });

app.listen(process.env.PORT, process.env.IP);