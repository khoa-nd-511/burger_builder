import React from "react";

import classes from "./BuildControl.css";

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.BuildControl__Label}>{props.label}</div>
    <div className={classes.ButtonGroup}>
      <button
        className={[
          classes.BuildControl__Button,
          classes.BuildControl__ButtonLess
        ].join(" ")}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Less
      </button>
      <button
        className={[
          classes.BuildControl__Button,
          classes.BuildControl__ButtonMore
        ].join(" ")}
        onClick={props.added}
      >
        More
      </button>
    </div>
  </div>
);

export default buildControl;
