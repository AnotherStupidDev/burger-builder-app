import { put } from "redux-saga/effects"
import axios from "../../axios-orders"
import { setIngredients, fetchIngredientsFailed } from "../actions"

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-burger-app-550b7.firebaseio.com/ingredients.json",
    )
    yield put(setIngredients(response.data))
  } catch (error) {
    yield put(fetchIngredientsFailed())
  }
}
