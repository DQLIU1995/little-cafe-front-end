import React from "react";
import PropTypes from "prop-types";
import "./DishMenu.css";

const Dish = (props) => {
    return (
    <section className="dish">
        <p className="name">{props.name}</p>
        <p>{props.image}</p>
        <p>"{props.description}"</p>
        <p>price: ${props.price}</p>
    </section>
        )

}


Dish.propTypes = {
    name:PropTypes.string.isRequired, 
    image:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,
};

export default Dish; 