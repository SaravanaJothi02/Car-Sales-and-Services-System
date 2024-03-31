import './Products.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState } from 'react';
import Car from "./Car";
import Modal from './Modal';

function Product(){
    
    const [allImage, setAllImage] = useState([]);
    const [model,setmodel] =useState(false);
    const [carid,setcarid]=useState("");

    function handleState(e) {
      setmodel(true);
      setcarid(e);
    }
    useEffect(()=>{
        getImage()
    },[])
    function getImage() {
        fetch("http://localhost:5000/get-image", {
            method: "GET",
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            setAllImage(data.data);
        })
    }
    console.log(allImage);
    const product = allImage.map((item) => (
        <Car
          model={item.model}
          url={item.image}
          price={item.price}
          carId={item.carId}
          color={item.color}
          ec={item.ec}
          tc={item.tc}
          fuel={item.fuel}
          seat={item.seat}
          mile={item.mile}
          change={handleState}
          
         
        />
      ));
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1024 },
          items: 4,
          slidesToSlide: 2,
        },
        desktop: {
          breakpoint: { max: 1024, min: 800 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 800, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
     
    return(
        
        <div className='carousel'>
            <Carousel showDots={true} responsive={responsive}  >
            {product}
            </Carousel>
            <div style={{ position:"absolute" }}>
            {model && <Modal setmodel={setmodel} carid={carid} allImage={allImage}/>}
            </div> 
        </div>
    )
}
export default Product;