import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth", { notAuth: true });
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  checkoutHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  mapIngredients = () => {
    const disabledInfo = {
      ...this.props.ings
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return {
      disabledInfo,
      shouldDisableOrderBtn: disabledInfo["cheese"] === true && disabledInfo["meat"] === true
    }
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {

    let orderSummary = null;

    let burger =
      this.props.error && !this.state.loading ? (
        <p style={{ marginTop: "200px", textAlign: "center" }}>
          <b>Internal Server Error</b>
          <br />
          Please try going back another time....
        </p>
      ) : (
        <Spinner />
      );

    if (this.props.ings && !this.props.error) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemoved={this.props.onIngredientsRemoved}
            totalPrice={this.props.price}
            disabled={this.mapIngredients().disabledInfo}
            showOrderBtn={this.mapIngredients().shouldDisableOrderBtn}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          checkout={this.checkoutHandler}
          cancel={this.purchaseCancelHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        {burger}
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onIngredientsAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientsRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName)),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
