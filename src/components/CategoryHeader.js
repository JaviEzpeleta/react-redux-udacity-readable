import React, { Component } from 'react'
import { getNotificationColorByIndex } from './../utils/utils'
import AnimatedWrapper from './../utils/AnimatedWrapper';

class CategoryHeader extends Component {

	render() {

    const { elegantCategoryName, category } = this.props
		return (
      <section className={'hero ' + getNotificationColorByIndex(category.index)}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {elegantCategoryName}
            </h1>
            <h2 className="subtitle">
              Only posts about {elegantCategoryName}
            </h2>
          </div>
        </div>
      </section>
		)
	}
}

export default AnimatedWrapper(CategoryHeader)
