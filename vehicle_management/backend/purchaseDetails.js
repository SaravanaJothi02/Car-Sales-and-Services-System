const mongoose = require("mongoose");
const PurchaseDetailsScehma = new mongoose.Schema(
    {
        name: {
            type: String,
            
        },
        carid: {
            type: String,
          },
    },
    {
      collection: "purchaseDetails",
    }
  );
  
  mongoose.model("purchaseDetails", PurchaseDetailsScehma);
  