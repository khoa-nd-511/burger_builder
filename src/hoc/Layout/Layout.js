import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Auxiliary/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  showSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  hideSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          clicked={this.showSideDrawerHandler}
          isAuth={this.props.isAuthenicated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          clicked={this.hideSideDrawerHandler}
          isAuth={this.props.isAuthenicated}
        />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenicated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
