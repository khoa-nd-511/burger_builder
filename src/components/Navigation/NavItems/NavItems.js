import React from "react";

import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";
import Aux from "../../../hoc/Auxiliary/Aux";

const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>Burger Builder</NavItem>
    {props.isAuthenicated ? (
      <Aux>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/logout">Logout</NavItem>
      </Aux>
    ) : (
      <NavItem link="/auth">Authenication</NavItem>
    )}
  </ul>
);

export default navItems;
