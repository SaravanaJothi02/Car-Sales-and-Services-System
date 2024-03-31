const mongoose = require("mongoose");
const CarDetailsScehma = new mongoose.Schema(
    {
        carId:String,
        model:String,
        color:String,
        price:String,
        ec:String,
        tc:String,
        fuel:String,
        seat:String,
        mile:String,
        image:String,
    },
    {
      collection: "carDetails",
    }
  );
  
  mongoose.model("carDetails", CarDetailsScehma);
  