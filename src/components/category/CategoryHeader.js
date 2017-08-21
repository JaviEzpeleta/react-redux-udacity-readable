import React from 'react'
import { getNotificationColorByIndex } from './../../utils/utils'
import AnimatedWrapper from './../../utils/AnimatedWrapper';

const CategoryHeader = (props) => (
  <section className={'hero ' + getNotificationColorByIndex(props.category.index)}>
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          {props.elegantCategoryName}
        </h1>
        <h2 className="subtitle">
          Only posts about {props.elegantCategoryName}
        </h2>
      </div>
    </div>
  </section>
)

export default AnimatedWrapper(CategoryHeader)
