import React, { useState } from 'react'
import  Select  from 'react-select'
import './ServicePage.css'
import carservice from './car2.jpeg'
import { useEffect } from 'react'
const ServicePage = ({email}) => {
  console.log(email)
  const [data,setData]=useState([]);
  const [carid, setcarId] = useState('')
  const [servicetype, setservicetype] = useState('')
  const [delivery, setdelivery] = useState('')
  const handlecarid = (event) => {
    setcarId(event.target.value);
  };
  const handletype = (event) => {
    setservicetype(event.target.value);
  };
  const handledelivery= (event) => {
    setdelivery(event.target.value);
  };
  // const option = [

  // ]
  useEffect(() => {
  fetch("http://127.0.0.1:5000/getCarId", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
       "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
     email,
    }),
  }) 
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setData(data);
    });
  }, []);
  function submit(e){
    e.preventDefault();
    fetch("http://127.0.0.1:5000/service-requests", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
         "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        carid,
        delivery,
        servicetype,
      }),
    })
    .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
            alert("Service request is done ..");
          } else {
            alert("Something went wrong");
          }
        });
    }
  return (
   <div>
     <div className="page">
      <div className="image-container">
        <img src={carservice} alt="Image" className="image" />
      </div>
      <div className="form-container">
      <form  className='box'>
      <h2>Service Form</h2>
      <div className='service_dropdown'>
      <label>Car Id</label> 
          <select value={carid} onChange={handlecarid}>
            {
              data.map(data => {
                console.log(data.carid)
                return (
                  
                      <option key={data.id} label={data.carid} value={data.carid}>{data.carid}</option>
                  
                )
              })
            }
          </select>
          <br/>
          <br/>
          <br/>
          <br/>
          <label>Service type</label>
          <select value={servicetype} onChange={handletype}>
            <option value="Maintenance">Maintanence</option>
            <option value="Tire Replacement">Tire Replacement</option>
            <option value="Repair">Repair</option>
          </select>
          <br/>
          <br/>
          <br/>
          <br/>
          <label>Delivery type</label>
          <select value={delivery} onChange={handledelivery}>
            <option value="Pick up delivery">Pick up delivery</option>
            <option value="Drop delivery">Drop delivery</option>
          </select>
          </div> 
          <br/>
          <br/>
          <button className='servicebtn' onClick={submit}>Submit</button>        
    </form>
      </div>
    </div>
   </div>
  )
}

export default ServicePage
