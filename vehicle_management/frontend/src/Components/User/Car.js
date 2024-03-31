import React from "react";


export default function Car(props) {
  

  return (
   
    <div className="card1">
      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.model}</h2>
      <p className="price1">Rs.{props.price}</p>
      <p>
        <button onClick = {(e) => props.change(e.target.name)} name={props.carId}>Click for booking</button> 
      </p>
    </div>
   
  );
}