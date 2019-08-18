const mongoose   = require("mongoose");

const portfolioSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    functionality: String,
    developedWith: [String],
    webLink: String,
    gitLink: String,
    type: String
});

module.exports = mongoose.model("Portfolio", portfolioSchema);