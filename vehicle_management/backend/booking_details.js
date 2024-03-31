const mongoose = require("mongoose");
const BookingDetailsScehma = new mongoose.Schema(
    {
        carid:String,
        name:String,
        email:String,
        contact:String
    },
    {
      collection: "booking_details",
    }
  );
  
  mongoose.model("booking_details", BookingDetailsScehma);
  