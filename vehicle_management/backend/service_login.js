const mongoose = require("mongoose");
const ServiceScehma = new mongoose.Schema(
    {
        email:String,
        Pass:String
    },
    {
      collection: "serviceLogin",
    }
  );
  
  mongoose.model("servicelogin", ServiceScehma);
  