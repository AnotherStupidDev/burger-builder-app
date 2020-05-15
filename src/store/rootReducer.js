import { combineReducers } from "redux"

import { burgerBuilderReducer } from "./reducers/burgerBuilder"
import { orderReducer } from "./reducers/order"

export const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
})
