import React, { Component } from 'react'
import { capitalizeFirstLetter, getNotificationColorByIndex } from './../utils/utils'
import CategorySummary from './CategorySummary'

class HomeCategories extends Component {

	render() {

    const { categories, posts, history } = this.props

		return (
        <div className="container">

          <h3 className="title is-3 is-spaced">
            Categories
          </h3>

          <div className="container">
            <div className="columns">
              { categories && categories.map( (category, index) => {
                let numberOfPosts = posts.filter( (post) => (post.category === category.path)).length;
                return (
                  <CategorySummary
                    linkTo={'/category/'+category.path}
                    key={index} colorToApply={getNotificationColorByIndex(index)}
                    title={capitalizeFirstLetter(category.name)}
                    numberOfPosts={numberOfPosts} />
                )
              } ) }
            </div>
          </div>

        </div>

		)
	}
}

export default HomeCategories
