import { actionTypes } from "./actions"

const initialState = {
  ingredients: {
    salad: 1,
    bacon: 1,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT_AND_CALC_PRICE:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
    case actionTypes.REMOVE_INGREDIENT_AND_CALC_PRICE:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      }
    default:
      return state
  }
}
