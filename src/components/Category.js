import React, { Component } from 'react'
import Header from './Header'
import { capitalizeFirstLetter, getNotificationColorByIndex } from './../utils/utils'

class Category extends Component {

  getCategory = (categories) => {
    if (categories)
      return { data: categories.find((category) => (category.path === this.props.categoryPath)),
        index: categories.findIndex((category) => (category.path === this.props.categoryPath)) }
    else return null
  }

	render() {

		const { posts, categories } = this.props

    const category = this.getCategory(categories)

		return (
			<div>
				<Header />
          { category && (
            <section className={'hero ' + getNotificationColorByIndex(category.index)}>
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    {category && capitalizeFirstLetter(category.data.name)}
                  </h1>
                  <h2 className="subtitle">
                    Hero subtitle
                  </h2>
                </div>
              </div>
            </section>
          )}

				<section>
					<div className="container">
						<h2 className="is-size-3"> THE CATEGORY: </h2>
					</div>
				</section>
			</div>
		)
	}
}

export default Category
