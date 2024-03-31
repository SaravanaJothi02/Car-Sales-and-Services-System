import './Templogin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';

const Templogin=()=>{
  const [carId,setcarId]=useState('');
  const [model,setModel]=useState('');
  const [seat,setSeat]=useState('');
  const [mile,setMile]=useState('');
  const [fuel,setFuel]=useState('Petrol');
  const [image,setImage]=useState('');
  const [ec,setEc]=useState('');
  const [tc,setTc]=useState('');
  const [price,setPrice]=useState('');
  const [color,setColor]=useState('');
  const onOptionChange = e => {
    setFuel(e.target.value)
  }
  const notify = () => {
    toast.success('Login Success..🤩', {
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
  const errormsg=(msg)=>{
    toast.error(msg, {
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
  function convertToBase64(e){
    console.log(e);
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror=error=>{
      console.log("Error: ",error);
    };
  }
  function submit(e){
    e.preventDefault();
    if((mile > 20 && mile <= 30) && ((seat > 0 && seat < 8) && (ec > 1000 && ec < 2500)) && (tc > 45 && tc < 60) && price > 0 ){
      fetch("http://127.0.0.1:5000/add-car", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
         "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        carId,
        model,
        color,
        price,
        ec,
        tc,
        fuel,
        seat,
        mile,
        base64:image,
      }),
    })
    .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
            alert("Car added successfully..");
          } else {
            alert("Something went wrong");
          }
        });
    }
    else{
      errormsg("Invalid details");
    }
    
    }
  
    return(
    <div className='addcar'>
    <section className="container1">
      <h3 className='title'>Add Car Details</h3>
      <form action="#" className="form">
        <div className="input-box">
         
          <input type="text" placeholder="Enter car id" required onChange={(e)=>{setcarId(e.target.value)}} />
        </div>
        <div className="input-box">
         
          <input type="text" placeholder="Enter car model" required onChange={(e)=>{setModel(e.target.value)}} />
        </div>
        <div className="column">
          <div className="input-box">
            
            <input type="number" placeholder="Enter seats available" required onChange={(e)=>{setSeat(e.target.value)}}/>
          </div>
          <div className="input-box">
           
            <input type="number" placeholder="Enter mileage" required onChange={(e)=>{setMile(e.target.value)}} />
          </div>
        </div>
        <div className="fuel-box">
          <h3>Fuel Type</h3>
          <div className="fuel-option">
            <div className="fuel">
              <input type="radio" id="check-petrol" name="fuel" checked={fuel === "Petrol"} value="Petrol" onChange={onOptionChange}/>
              <label htmlFor="check-petrol" >Petrol</label>
            </div>
            <div className="fuel">
              <input type="radio" id="check-diesel" name="fuel" checked={fuel === "Diesel"}value="Diesel" onChange={onOptionChange}/>
              <label htmlFor="check-diesel">Diesel</label>
            </div>
            
          </div>
        </div>
        <div className="input-box">
         
          <input type="number" placeholder="Enter engine capacity" required onChange={(e)=>{setEc(e.target.value)}}/>
         
          <div className="column">
            <input type="text" placeholder="Enter Color" required onChange={(e)=>{setColor(e.target.value)}}/>
            <input type="number" placeholder="Enter price" required onChange={(e)=>{setPrice(e.target.value)}}/>
          </div>
          <div className="column">
            <input type="number" placeholder="Enter Tank capacity" required onChange={(e)=>{setTc(e.target.value)}}/>
            <input type="file" accept="image/*" required onChange={convertToBase64} />
          </div>
        </div>
        <button type="submit" className='submit'onClick={submit}>Submit</button>
      </form>
    </section>
    <ToastContainer />
    </div>
    )
}
export default Templogin;
