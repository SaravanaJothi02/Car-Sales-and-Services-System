import React from 'react';
import './Home.css';
import car_vdo from './car.mp4';
import bike_vdo from './bike.mp4';
import tesla from './tesla.mp4';
const Home=()=>{
    return(
       <div className="home">
            <header>
                <a href='#' className="brand">DriveROYAL</a>
                <div className="navigation">
                    <div className="navigation-items">
                        <a href='/explore'>Explore</a>
                        <a href='/service'>Book for service</a>
                       
                        <a href='/adminlogin'>Admin</a>
                    </div>
                </div>
            </header>
            <section className='Car'>
                <video src={tesla} autoPlay muted loop></video>
                <div className="home_content">
                    <h1>Smooth Moves</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ut tempora eum quia soluta dolorum recusandae optio? Similique error expedita, at minus laboriosam, a totam suscipit blanditiis vel saepe magnam ipsam! Accusantium eveniet consequatur eos praesentium quas voluptates repellendus laborum? Molestias dicta cum a impedit quas laboriosam iure officia, non iste error consectetur rem obcaecati beatae tempore. At, fugiat earum. Omnis illo nostrum natus repellat in nobis, maxime sint praesentium deleniti quis possimus! Incidunt corrupti, nam pariatur unde vel provident ipsa molestias molestiae placeat ut voluptatum magni voluptates esse, asperiores ratione. Alias officiis quas blanditiis et doloremque sed, nostrum itaque?
                    </p>
                    <a href='#'>Read More</a>
                </div>
                
            </section>
       </div>
    )
}
export default Home;