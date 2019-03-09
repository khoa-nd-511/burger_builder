import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactForm from "../../components/Order/ContactForm/ContactForm";

class Checkout extends Component {
  continueHandler = () => {
    this.props.history.push(this.props.match.path + "/contact");
  };

  cancelHandler = () => {
    this.props.history.push("/");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            canceled={this.cancelHandler}
            continue={this.continueHandler}
          />
          <Route
            path={this.props.match.path + "/contact"}
            component={ContactForm}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
