import bookings from './book.jpg';
import service from './service.png';
import addcus from './addcus.png';
import plus from './plus.png'
import './AdminAction.css';
 const AdminAction=()=>{
    return(
        <div className="pageBody">
            <div className="container">
                <div className="card">
                    <div className="imgBox">
                        <img src={bookings}/>
                    </div>
                    <div className="content">
                    <a href='/bookings'><h1>Booking Requests</h1></a>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quae.
                    </div>
                </div>
                <div className="card">
                    <div className="imgBox">
                        <img src={service}/>
                    </div>
                    <div className="content">
                    <h1>Service Requests</h1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quae.
                    </div>
                </div>
                <div className="card">
                    <div className="imgBox">
                        <img src={plus}/>
                    </div>
                    <div className="content">
                        <a href='/add_car'><h1>Add Cars</h1></a>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quae.
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminAction;