import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const fetchIngredients = ingredients => {
  return {
    type: actionTypes.FETCH_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = ingredients => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return async dispatch => {
    try {
      const fetchedIngredients = await axios.get(
        "https://burgerbuilder-bbc3c.firebaseio.com/ingredients.json"
      );
      if ((await fetchedIngredients.status) === 200) {
        dispatch(fetchIngredients(fetchedIngredients.data));
      }
    } catch (error) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
