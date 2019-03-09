import React, { Component } from "react";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as orderActionTypes from "../../../store/actions/index";
import { checkValidity, updateObj } from "../../../sharedFn/utilities";

import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import FormInput from "../../FormInput/Forminput";
import classes from "./ContactForm.css";

class ContactForm extends Component {
  state = {
    contactForm: {
      name: {
        name: "name",
        value: "",
        placeholder: "Enter Your Name",
        type: "text",
        inputType: "input",
        valid: false,
        validation: {
          required: true,
          length: {
            minLength: 5,
            maxLength: 10
          },
          pattern: /^[a-zA-Z]+$/
        },
        touched: false
      },
      email: {
        name: "email",
        value: "",
        placeholder: "Enter Your Email",
        type: "email",
        inputType: "input",
        valid: false,
        validation: {
          required: true,
          pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        },
        touched: false
      },
      phone: {
        name: "phone",
        value: "",
        placeholder: "Enter Your phone",
        type: "number",
        inputType: "input",
        valid: false,
        validation: {
          required: true,
          length: {
            minLength: 5,
            maxLength: 10
          },
          pattern: /^\d+$/
        },
        touched: false
      },
      address: {
        name: "address",
        value: "",
        placeholder: "Enter Your Adress",
        inputType: "textarea",
        valid: false,
        validation: {
          required: true,
          length: {
            minLength: 5,
            maxLength: 20
          }
        },
        touched: false
      },
      deliveryType: {
        name: "deliveryType",
        inputType: "select",
        options: {
          fastest: {
            value: "fastest",
            valueDisplay: "Fastest"
          },
          cheapest: {
            value: "cheapest",
            valueDisplay: "Cheapest"
          }
        },
        value: "cheapest",
        valid: true,
        validation: {}
      }
    },
    formIsValid: false
  };

  orderHandler = () => {
    let orderContactData = {};
    for (const key in this.state.contactForm) {
      const field = this.state.contactForm[key];
      orderContactData[key] = field.value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: orderContactData,
      userId: this.props.userId
    };

    this.props.onPurchasingBurger(order, this.props.token);
  };

  inputChangedHandler = (e, inputName) => {
    for (const key in this.state.contactForm) {
      const targetInputField = this.state.contactForm[key];
      if (targetInputField.name === this.state.contactForm[inputName].name) {
        const updatedInput = updateObj(this.state.contactForm[inputName], {
          value: e.target.value,
          touched: true,
          valid: checkValidity(
            this.state.contactForm[inputName].value,
            this.state.contactForm[inputName].validation
          )
        });

        const updatedContactForm = updateObj(this.state.contactForm, {
          [inputName]: updatedInput
        });

        let formIsValid = true;
        for (let inputName in updatedContactForm) {
          formIsValid = updatedContactForm[inputName].valid && formIsValid;
        }

        this.setState({ contactForm: updatedContactForm, formIsValid });
      }
    }
  };

  render() {
    let formArr = [];
    for (const key in this.state.contactForm) {
      if (this.state.contactForm.hasOwnProperty(key)) {
        const formEl = this.state.contactForm[key];
        formArr.push(formEl);
      }
    }

    let form = null;
    form = formArr.map(i => {
      return (
        <FormInput
          {...i}
          key={i.name}
          changed={e => this.inputChangedHandler(e, i.name)}
          touched={i.touched}
          invalid={!i.valid}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    const style = {
      display: "block",
      width: "100%",
      marginTop: "1rem",
      padding: "0.5rem",
      color: "white",
      background: "#e48f34",
      borderRadius: "4px"
    };

    return (
      <div className={classes.ContactForm}>
        {form}
        <Button
          label="Order"
          type="Success"
          style={style}
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchasingBurger: (order, token) =>
      dispatch(orderActionTypes.purchaseBurger(order, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactForm, axios));
