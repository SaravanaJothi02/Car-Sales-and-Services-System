import { AiOutlineCloseSquare } from "react-icons/ai";
import p from '../Admin/service.png';
import './Modal.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Modal= ({setmodel,carid,allImage}) => {
  let regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  let regPh = /^[6-9]\d{9}$/;
  console.log(carid);
  console.log(allImage);
  const [name,setName]=useState('');
  const [email,setemail]=useState('');
  const [contact,setcontact]=useState('');
  const navigate=useNavigate();
  function closemodal(){
    setmodel(false);
  }
  console.log(name);
  console.log(email);
  console.log(contact);

  const notify = () => {
    toast.success('Booked Successfully!Check your mail🤩', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });  
  }
  function submit(e){
    e.preventDefault();
    console.log(email);
    console.log(!regEx.test(email) || name=="" || email=="" || contact=="");

    if(!regEx.test(email) && name=="" && email=="" && contact=="") {
      alert("please fill valid details");
    }
    else{
    fetch("http://127.0.0.1:5000/book", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
         "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
       carid,
       name,
       email,
       contact
      }),
    })
    .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
           notify();
           setTimeout(() => {
            navigate('/');
           }, 1000);

          } else {
            alert("Something went wrong");
          }
        });
      }
    }
    console.log(carid);
  
  return (

    <div
      onClick={()=>setmodel(false)}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
       
      }}
    >
      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          width: "1000px",
          height:"80vh",
          padding: "20px 10px",
          animation: "dropTop .3s linear",
          border:"8px solid rgb(101, 172, 235)"
        }}
      >
        {/* Header */}
        <div  
        >
          <h1 style={{ margin: 0, fontFamily: "'Amita', cursive",fontSize:"2rem" }}>Booking form</h1>
          <div
            onClick={closemodal}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <AiOutlineCloseSquare />
          </div>
        </div>
        {/* Body */}
        <div className="modalBody">
             {
              allImage.filter(Cardata=>carid==Cardata.carId).map(details=>{
                return (
                  <>
                  <div class="modalImage">
                      <img src={details.image} alt="Image"/>
                      <div className="Car_details">
                      <p><span>Car ID </span>- {details.carId}</p>
                      <p><span>Model </span>- {details.model}</p>
                      <p><span>Engine Capacity</span> - {details.ec} cc</p>
                      <p><span>Tank Capacity</span> - {details.tc} litres</p>
                      <p><span>Mileage</span> - {details.mile} KMPL</p>
                      <p><span>Seats </span>- {details.seat}</p>
                      <p><span>Fuel Type </span>- {details.fuel}</p>
                      <p><span>Color </span>- {details.color}</p>
                      <p><span>Price </span>- <span className="pricecar">Rs.{details.price}</span></p>
                     
                      </div>
                  </div>
                  <div class="modalForm">
                  <form>
                    <input type="text" name="name" placeholder="Your Name" required  onChange={(e)=>{setName(e.target.value)}} value={name}/>
                    <input type="email" name="email" placeholder="Your Email" required  onChange={(e)=>{setemail(e.target.value)}} value={email}/>
                    <input type="text" name="contact" placeholder="Your PhoneNumber" required  onChange={(e)=>{setcontact(e.target.value)}} value={contact}/>
                    
                    <button type="submit" onClick={submit}>Submit</button>
                  </form>
                </div>
                </>
                )
              })
             }
            
            <ToastContainer />
        </div>
       
        
      </div>
    </div>
  );
};
export default Modal;
