import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import Aux from "../../hoc/Auxiliary/Auxiliary"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Loader from "../../components/UI/Loader/Loader"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import {
  addIngredientAndCalcPrice,
  removeIngredientAndCalcPrice,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath,
} from "../../store/actions/index"

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false)

  const dispatch = useDispatch()

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients
  })
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice
  })
  const error = useSelector((state) => {
    return state.burgerBuilder.error
  })
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null
  })

  const onIngredientAdded = (ingName) =>
    dispatch(addIngredientAndCalcPrice(ingName))

  const onIngredientRemoved = (ingName) =>
    dispatch(removeIngredientAndCalcPrice(ingName))

  const onInitIngredients = useCallback(() => dispatch(initIngredients()), [
    dispatch,
  ])

  const onInitPurchase = () => dispatch(purchaseInit())

  const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, elem) => {
        return sum + elem
      }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath("/checkout")
      props.history.push("/auth")
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push("/checkout")
  }

  const disabledInfo = {
    ...ings,
  }

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummary = null

  let burger = error ? (
    <p>
      <strong>Ingredients can't be loaded!</strong>
    </p>
  ) : (
    <Loader />
  )

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          price={price}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    )
    orderSummary = (
      <OrderSummary
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ings}
        price={price}
      />
    )
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  )
}

export default withErrorHandler(BurgerBuilder, axios)
