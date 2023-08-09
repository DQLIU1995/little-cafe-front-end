import React, { useState } from "react";
import PropTypes from "prop-types";

import Dish from "./DishMenu";
import "./DishContainer.css";



const DishContainer = (props) => {
    console.log("hi here is props in dishcontainer");
    console.log(props.dishList);
    if (props.dishList === undefined || props.dishList.length == 0) {
        return;
    }
    const dishComponents = props.dishList.map((dish)=> {
        return (
            <li key={dish.name}>
                <Dish
                    name={dish.name}
                    image={dish.image}
                    description={dish.description}
                    price={dish.price}
                ></Dish>
            </li>
        );
    });

    return (
        <section className="dish-container">
            <h2>{props.categoryName}</h2>
            <section className="dish-list">{dishComponents}</section>
        </section>
        
    )
}; 

export default DishContainer; 