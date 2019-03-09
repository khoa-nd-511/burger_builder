import React from "react";

import Burger from "../../../components/Burger/Burger";
import classes from "./Order.css";

const order = props => {
  return (
    <div className={classes.OrderItem}>
      <div classes={classes.Burger}>
        <Burger ingredients={props.ingredients} marginTop='0px' maxWidth='50%' height='100px'/>
      </div>
      <hr />
      <div className={classes.Ingredients}>
        <p>
          <b>Salad:</b> {props.salad}
        </p>
        <p>
          <b>Cheese:</b> {props.cheese}
        </p>
        <p>
          <b>Bacon:</b> {props.bacon}
        </p>
        <p>
          <b>Meat:</b> {props.meat}
        </p>
        <p>
          <b>Price:</b> ${props.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default order;
