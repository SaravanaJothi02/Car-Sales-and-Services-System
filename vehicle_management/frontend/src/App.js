import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Components/Home/Home';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminAction from './Components/Admin/AdminAction';
import AddCar from './Components/Admin/AddCar';
import Templogin from './Components/Admin/Templogin';
import Products from './Components/User/Products'
import Bookings from './Components/Admin/Bookings';
import Service from './Components/User/Service';
import ServicePage from './Components/User/ServicePage';
import { useState } from 'react';
function App() {
  const [email,setemail]=useState('');
const [Pass,setPass]=useState('');
  return (
    <Router>
    <Routes>
      <Route  path="/" element={<Home/>}></Route>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/adminaction" element={<AdminAction/>}/>
      <Route path="/add_car" element={<Templogin/>}/>
      <Route path="/explore" element={<Products/>}/>
      <Route path="/bookings" element={<Bookings/>}/>
      <Route path="/service" element={<Service email={email} setemail={setemail} Pass={Pass} setPass={setPass}/>}/>
      <Route path="/servicepage" element={<ServicePage  email={email} />}/>
    </Routes>
    </Router>
  );
}

export default App;
