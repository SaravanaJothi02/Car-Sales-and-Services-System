const mongoose = require("mongoose");

const AdminLoginDetailsScehma = new mongoose.Schema(
  {
    uname: String,
    pass: String,
  },
  {
    collection: "admin_login",
  }
);

mongoose.model("admin_login", AdminLoginDetailsScehma);
