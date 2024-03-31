import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './AdminLogin.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminLogin=()=>{
    // const [email,setEmail] =useState('');
    // const [message,setMessage] =useState('');
    let regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

    const [uname,setUname]=useState('');
    const [pass,setPass]=useState('');
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
    function emailValidation(e){
        e.preventDefault();
        console.log(uname);
        console.log(pass);
        console.log(uname =="" || pass == "");
        //const regpass = /^[A-Z]+[a-z]+[!@#$%^&*]+[0-9]*$/;
        // console.log(regpass.test(pass));
        if(uname =="" || pass == "" || !regEx.test(uname)) {
          errormsg("please fill valid details");
        }
        else{
            fetch("http://127.0.0.1:5000/admin-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uname,
            pass,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == "ok") {
              notify();
              setTimeout(()=>{
               navigate('/adminaction');  
            },1000)
             
            }
            else{
              errormsg(data.error);
            }
          });
        }
        
    }
    return(
    <div className='Container'>
      <h1 className='heading1'>Admin LOgin</h1>
        <form  className='box'>
            <input type="email" placeholder="email" name='email' className='email' onChange={(e)=>{setUname(e.target.value)}} value={uname} />
            <br/>
            <input type="password" placeholder="password" name='password' className='pass' onChange={(e)=>{setPass(e.target.value)}} value={pass}/>
            <br/>
            <br/>
            <button type="submit" className='submit' onClick={(e) => emailValidation(e)}>Submit</button>
        </form>
        <ToastContainer />
    </div>
    )
}
export default AdminLogin;