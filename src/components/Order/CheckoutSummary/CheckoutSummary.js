import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>The burger you're ordering</h1>
      <Burger ingredients={props.ingredients} marginTop='0px' />
      <Button label="Cancel" type="Danger" clicked={props.canceled} />
      <Button label="Continue" type="Success" clicked={props.continue} />
    </div>
  );
};

export default checkoutSummary;
