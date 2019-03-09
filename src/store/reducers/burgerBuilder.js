import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../sharedFn/utilities";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const updateIngredients = (state, action, operator) => {
  let updatedIng = null;
  switch (operator) {
    case "increment":
      updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      break;
    case "decrement":
      updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      break;
    default:
      return;
  }
  const updatedIngs = updateObj(state.ingredients, updatedIng);
  const updatedState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObj(state, updatedState);
};

const fetchIngredients = (state, action) => {
  return updateObj(state, {
    ingredients: {
      salad: action.ingredients.salad,
      ...action.ingredients
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateIngredients(state, action, "increment");

    case actionTypes.REMOVE_INGREDIENT:
      return updateIngredients(state, action, "decrement");

    case actionTypes.FETCH_INGREDIENTS:
      return fetchIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObj(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
