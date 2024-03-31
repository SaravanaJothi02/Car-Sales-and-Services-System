const express = require("express");
const app = express();
const cors= require('cors');
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors({
  origin:"*",
}))
app.use(express.urlencoded({ extended: false }));
const mongoUrl ="mongodb://127.0.0.1:27017/vehicle";
mongoose.connect(mongoUrl, 
  {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
app.listen(5000, () => {
    console.log("Server Started");
});
/*Mail setup*/
const nodemailer = require('nodemailer');

require("./admin");
require("./car_deatils");
require("./booking_details");
require("./purchaseDetails");
require("./service_login")
require("./servicerequests")
const Admin = mongoose.model("admin_login");
app.post("/admin-login", async (req, res) => {
    const {uname, pass} = req.body;
    const user = await Admin.findOne({ uname });
    console.log(user);
    if (!user) {
      return res.json({ status: "error",error: "User Not found" });
    }
    if(pass==user.pass){
      if(res.status(201)){
        return res.json({ status: "ok"});
      }
      else {
        return res.json({ error: "error" });
      }
    }

    res.json({ status: "error", error: "InvAlid Password" });
    
  });
  const Car=mongoose.model("carDetails");
  app.post("/add-car",async (req, res)=>{
    const {carId,model,color,price,ec,tc,fuel,seat,mile,base64}=req.body;
    try {
      const oldCar = await Car.findOne({carId});
  
      if (oldCar) {
        return res.json({ error: "Car already exists" });
      }
      await Car.create({
        carId,
        model,
        color,
        price,
        ec,
        tc,
        fuel,
        seat,
        mile,
        image:base64
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  })
  app.get("/get-image", async (req, res) => {
    try {
      await Car.find({}).then(data => {
        res.send({ status: "ok", data: data })
      })
  
    } catch (error) {
  
    }
  })
  const Book=mongoose.model("booking_details");
  app.get("/getAllBookings", async (req, res) => {
    try {
      const allBookings = await Book.find({});
      res.send({ status: "ok", data: allBookings });
    } catch (error) {
      console.log(error);
    }
  });
  /*mail*/
  app.post("/book", async (req, res) => {
    const { carid, name, email, contact } = req.body;
    const cardetails = await Car.findOne({carId:carid});
   
    const msg=`<body>
    <p><bold>Congratulations..🤩</bold> for booking the car in DriveRoyal.</p>
    <p><bold>Car Id:</bold>${cardetails.carId}</p>
    <p><bold>Car Model:</bold>${cardetails.model}</p>
    <p><bold>Price:</bold>Rs.${cardetails.price}</p>
    <p>Kindly confirm your booking within two days by visiting our showroom</p>
    <p><bold>Contact:</bold>8778159941</p>
    </body>`;
    // fs.writeFile("./test.txt",msg,(err)=>{
    //   if(err)
    //    console.error(err)
    //   else 
    //    console.log("written")
    // });
    try {
      await Book.create({
        carid,
        name,
        email,
        contact
      });
      res.send({ status: "ok" });
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ssarorani@gmail.com',
          pass: 'taudpgamlkqrafit',
        },
      });
      var mailOptions = {
        from: 'ssarorani@gmail.com',
        to: email,
        subject: 'Car Booking',
        html: msg
         
        
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent :" + info.response);
        }
      });
    } catch (error) {
      res.send({ status: "error" });
    }
  });
  const Service = mongoose.model("servicelogin");
  const Purchase=mongoose.model("purchaseDetails");
  app.post("/service",async (req, res)=>{
    const {carid,email,Pass}=req.body;
    try {
      const result = await Book.findOneAndDelete({carid:carid,email:email});
  
      if (result) {
        // Document successfully deleted
        console.log('Document deleted:', result);
       
      } else {
        // Document not found
        console.log('Document not found');
        
      }
    } catch (error) {
     
      console.error('Error deleting document:', error);
     
    }
  
    const msg=`<body>
        <p><bold>Congratulations..🤩</bold> for purchasing the car in DriveRoyal.</p>
        <p>For further services of the cars use the following login credentials</p>
        <p><bold>Username:</bold>${email}</p>
       <p><bold>Password:</bold>${Pass}</p>
      <p><bold>Contact:</bold>8778159941</p>
      </body>`;
    try {
      const Email = await Service.findOne({email:email});
      if (!Email) {
        await Service.create({
          email,
          Pass
        }); 
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ssarorani@gmail.com',
          pass: 'taudpgamlkqrafit',
        },
      });
      var mailOptions = {
        from: 'ssarorani@gmail.com',
        to: email,
        subject: 'Login Credentials',
        html: msg
         
        
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent :" + info.response);
        }
      });
      }
      
    } catch (error) {
      console.log(error);
    }
    try {
      await Purchase.create({
        name:email,
        carid:carid
      });
      console.log("New purchase added successfully")
    }catch (error) {
      console.log(error);
    }

  })
  
  //service login
  app.post("/service-login", async (req, res) => {
    const {email, Pass} = req.body;
    const user = await Service.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({ status: "error",error: "User Not found" });
    }
    if(Pass==user.Pass){
      if(res.status(201)){
        return res.json({ status: "ok"});
      }
      else {
        return res.json({ error: "error" });
      }
    }

    res.json({ status: "error", error: "InvAlid Password" });
    
  });
  app.post("/getCarId", async (req, res) => {
    const {email}=req.body;
    console.log(email);
    try {
      const allCar = await Purchase.find({name:email});
      return res.status(200).json(allCar);
    } catch (error) {
      console.log(error);
    }
    
  });
  const Servicereq = mongoose.model("service_requests");
  app.post("/service-requests",async (req, res)=>{
    const {email,
      carid,
      delivery,
      servicetype}=req.body;
    try {
      await Servicereq.create({
        email,
        carid,
        delivery,
        servicetype
      });
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  })