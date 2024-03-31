import {React,useState,useEffect} from 'react'
import './Bookings.css';
const Bookings = () => {
    const [data, setData] = useState([]);
    const [carid,setcarid]=useState("");
    const [email,setemail]=useState("");
    const[Pass,setpass]=useState("")
    const length=16;
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()-_=+[]{}<>|;:,.?"
    
    useEffect(() => {
        fetch("http://localhost:5000/getAllBookings", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "bookingData");
            setData(data.data);
          });
        
        
      }, []);
      function createUser(carid,email){
        alert("User created");
          setcarid(carid);
          setemail(email);
          let pass =""
          for (var i = 0; i < length; i++) {
          let rand= Math.floor(
            Math.random() * chars.length
          )
          pass+=chars.substring(rand,rand+1);
          }
          setpass(pass);      
         
      }
      useEffect(() => {
        if (Pass !== '') {  
        fetch("http://127.0.0.1:5000/service", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
             Accept: "application/json",
             "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            carid,
            email,
            Pass
          }),
        })
        .then((res) => res.json())
            .then((data) => {
              if (data.status == "ok") {
                alert("Everything is fine..");
              } else {
                alert("Something went wrong");
              }
            });
        }
      }, [Pass]);
  return (
    <div className='bookings'>
      <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Bookings</h3>
        <table className='bookings_table' style={{ width: 500 }}>
          <tr>
            <th>Car Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Operation</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>{i.carid}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.contact}</td>
                <td>
                  <button onClick={() => createUser(i.carid,i.email)}>Create user</button>
                </td>
              </tr>
            );
          })}
        </table>
   
      </div>
    </div>
    </div>
  )
}

export default Bookings;
