import React from "react";

import classes from "./Button.css";

const button = props => (
  <button
    className={[classes.Button, classes[props.type]].join(" ")}
    style={props.style}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.label}
  </button>
);

export default button;
