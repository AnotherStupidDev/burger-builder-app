import { actionTypes } from "./actionTypes"
import axios from "../../axios-orders"

export const addIngredientAndCalcPrice = (ingredName) => {
  return {
    type: actionTypes.ADD_INGREDIENT_AND_CALC_PRICE,
    ingredientName: ingredName,
  }
}

export const removeIngredientAndCalcPrice = (ingredName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT_AND_CALC_PRICE,
    ingredientName: ingredName,
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-app-550b7.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data))
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed())
      })
  }
}
