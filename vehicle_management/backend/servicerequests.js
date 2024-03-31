const mongoose = require("mongoose");
const ServiceScehma = new mongoose.Schema(
    {
        email:String,
        carid:String,
        delivery:String,
        servicetype:String,
    },
    {
      collection: "service_requests",
    }
  );
  
  mongoose.model("service_requests", ServiceScehma);
  