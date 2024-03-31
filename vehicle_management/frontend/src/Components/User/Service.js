import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CarServiceForm.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Service=({ email,setemail,Pass,setPass })=>{
    
    const navigate=useNavigate();
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
    function submit(e){
        e.preventDefault();
        
        fetch("http://127.0.0.1:5000/service-login", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
             Accept: "application/json",
             "Access-Control-Allow-Origin": "*",
           
          },
          body: JSON.stringify({
            email,
            Pass,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == "ok") {
              notify();
              setTimeout(()=>{
               navigate('/servicepage');  
            },1000)
             
            }
            else{
              errormsg(data.error);
            }
          });
    }
    return(
    <div className='Container'>
        <form  className='box'>
            <h2>LOGIN</h2>
            <input type="email" placeholder="email" name='email' className='email' onChange={(e)=>{setemail(e.target.value)}}/>
            <br/>
            <input type="password" placeholder="password" name='password' className='pass' onChange={(e)=>{setPass(e.target.value)}}/>
            <br/>
            <br/>
            <button type="submit" className='submit' onClick={submit}>Submit</button>
        </form>
        <ToastContainer />
    </div>
    )
}
export default Service;