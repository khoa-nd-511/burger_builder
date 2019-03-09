import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <div className={classes.OrderAndPrice}>
      <div className={classes.PriceBar}>
        Total Price: ${props.totalPrice ? props.totalPrice.toFixed(2) : null }
      </div>
      <button
        className={classes.OrderButton}
        disabled={props.showOrderBtn}
        onClick={props.ordered}
      >
        Order Now
      </button>
    </div>
    {controls.map(c => (
      <BuildControl
        key={c.label}
        label={c.label}
        added={() => props.ingredientAdded(c.type)}
        removed={() => props.ingredientRemoved(c.type)}
        disabled={props.disabled[c.type]}
      />
    ))}
  </div>
);

export default buildControls;
