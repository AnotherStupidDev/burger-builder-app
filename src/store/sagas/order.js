import { put } from "redux-saga/effects"
import axios from "../../axios-orders"
import {
  purchaseBurgerFail,
  purchaseBurgerSuccess,
  purchaseBurgerStart,
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFail,
} from "../actions/index"

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart())
  try {
    const response = yield axios.post(
      `/orders.json?auth=${action.token}`,
      action.orderData,
    )
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData))
  } catch (error) {
    yield put(purchaseBurgerFail(error))
  }
}

export function* fetchOrdersSaga(action) {
  yield put(fetchOrderStart())
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`

  try {
    const response = yield axios.get(`/orders.json${queryParams}`)
    const fetchedOrders = []
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      })
    }
    yield put(fetchOrderSuccess(fetchedOrders))
  } catch (error) {
    yield put(fetchOrderFail(error))
  }
}
