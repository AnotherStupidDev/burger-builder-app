import { combineReducers } from "redux"

import { burgerBuilderReducer } from "./reducers/burgerBuilder"
import { orderReducer } from "./reducers/order"
import { authReducer } from "./reducers/auth"

export const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
})
