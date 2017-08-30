import React from 'react'
import {
  capitalizeFirstLetter,
  getNotificationColorByIndex
} from './../../utils/utils'
import CategorySummary from './CategorySummary'

const HomeCategories = props =>
  <div className="container">
    <h3 className="title is-3 is-spaced">Categories</h3>

    <div className="container">
      {props.loadingCategories
        ? <div className="columns">
            <div className="column has-text-centered notification is-info">
              <div className="button is-loading is-info" />
            </div>
          </div>
        : <div className="columns">
            {props.categories &&
              props.categories.map((category, index) => {
                let numberOfPosts = props.posts.filter(
                  post => post.category === category.path
                ).length
                return (
                  <CategorySummary
                    linkTo={'/category/' + category.path}
                    key={index}
                    colorToApply={getNotificationColorByIndex(index)}
                    title={capitalizeFirstLetter(category.name)}
                    numberOfPosts={numberOfPosts}
                  />
                )
              })}
          </div>}
    </div>
  </div>

export default HomeCategories
