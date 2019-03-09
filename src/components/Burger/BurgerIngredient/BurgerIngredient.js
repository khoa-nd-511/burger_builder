import React, {Component} from "react";
import PropTypes from "prop-types";

import classes from './BurgerIngredient.css'

class BurgerIngredient extends Component {
    render () {
        let i = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                i = <div className={classes.BreadBottom}></div>;
                break;
    
            case ('bread-top'):
                i = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
    
            case ('meat'):
                i = <div className={classes.Meat}></div>;
                break;
        
            case ('salad'):
                i = <div className={classes.Salad}></div>;
                break;
        
            case ('bacon'):
                i = <div className={classes.Bacon}></div>;
                break;
        
            case ('cheese'):
                i = <div className={classes.Cheese}></div>;
                break;
        
            default:
                i = null;
        }
    
        return i;
    }    
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;