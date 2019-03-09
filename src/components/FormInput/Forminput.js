import React from "react";

import classes from "./FormInput.css";

const formInput = props => {
  let inputElement = null;

  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={props.invalid && props.touched ? classes.Invalid : ""}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={props.invalid && props.touched ? classes.Invalid : ""}
          onChange={props.changed}
          value={props.value}
          placeholder={props.placeholder}
        />
      );
      break;
    case "select":
      let options = [];
      for (const o in props.options) {
        if (props.options.hasOwnProperty(o)) {
          const option = props.options[o];
          options.push(option);
        }
      }
      let optionTags = options.map(o => {
        return (
          <option key={o.value} value={o.value}>
            {o.valueDisplay}
          </option>
        );
      });
      inputElement = (
        <select
          className={props.invalid && props.touched ? classes.Invalid : ""}
          onChange={props.changed}
          value={props.value}
        >
          {optionTags}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={props.invalid && props.touched ? classes.Invalid : ""}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.changed}
        />
      );
      break;
  }

  return inputElement;
};

export default formInput;
