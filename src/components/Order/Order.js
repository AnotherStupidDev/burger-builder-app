import React from "react"

import classes from "./Order.module.css"

const order = (props) => {
  const ingredients = []

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    })
  }

  const ingredientOutput = ingredients.map((ingr) => {
    return (
      <span className={classes.Span} key={ingr.name}>
        {ingr.name} ({ingr.amount})
      </span>
    )
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default order
