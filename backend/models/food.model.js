const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodname: { type: String, required: true, unique: true },
  foodprice: { type: Number, required: true},
  foodqty: { type: Number, required: true },
  fooddesc: { type: String, required: true },  
});

module.exports = Food = mongoose.model("food", foodSchema);