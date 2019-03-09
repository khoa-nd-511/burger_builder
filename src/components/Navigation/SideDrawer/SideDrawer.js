import React from "react";

import classes from "./SideDrawer.css";
import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavItems/NavItems";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Aux";

const sideDrawer = props => {
  let classAdded = props.open ? classes.Open : classes.Close;

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.clicked} />
      <div 
      className={[classes.SideDrawer, classAdded].join(" ")}
      onClick={props.clicked}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.Nav}>
          <NavItems isAuthenicated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
