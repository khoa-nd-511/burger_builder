import React from "react";

import classes from "./Toolbar.css";
import Logo from "../../UI/Logo/Logo";
import NavItems from '../NavItems/NavItems'

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Menu} onClick={props.clicked}>
        <div></div>
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <div className={classes.NavItems}>
        <NavItems isAuthenicated={props.isAuth} />
      </div>
    </header>
  );
};

export default toolbar;
