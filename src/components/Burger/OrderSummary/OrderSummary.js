import React from "react";

import classes from "./OrderSummary.css";
import Aux from "../../../hoc/Auxiliary/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Ingredients Added: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <b>Total Cost: </b>
        {props.totalPrice.toFixed(2)}
      </p>
      <div className={classes.BtnGroup}>
        <Button label="Cancel" type="Danger" clicked={props.cancel} />
        <Button label="Checkout" type="Success" clicked={props.checkout} />
      </div>
    </Aux>
  );
};

export default orderSummary;
