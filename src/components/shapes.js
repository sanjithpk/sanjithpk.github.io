import React from "react"

export const Circle = ({
  size,
  top,
  left = ``,
  right = ``,
  background,
  animation = ``
}) => (
  <div
    className={`hidden xl:block absolute rounded-full bg-gradient-3 ${background}`}
    style={{
      height: size,
      width: size,
      top: top,
      left: left,
      right: right,
      animation: animation
    }}
  />
)

export const Donut = ({
  size,
  top,
  left = ``,
  right = ``,
  background,
  animation = ``
}) => (
  <div
    className={`hidden xl:block absolute rounded-full ${background}`}
    style={{
      height: size,
      width: size,
      top: top,
      left: left,
      right: right,
      animation: animation
    }}
  />
)
