import React, { Component } from 'react'
import { capitalizeFirstLetter, getNotificationColorByIndex } from './../utils/utils'
import { Link } from 'react-router-dom'

class HomeCategories extends Component {

	render() {

    const { categories } = this.props

		return (
        <div className="container">

          <h3 className="title is-3 is-spaced">
          { /* <span className="icon is-medium">
              <i className="fa fa-list"></i>
            </span> */ }
            Categories
          </h3>

          <div className="container">
            <div className="columns">
              { categories && categories.map( (category, index) =>
                <Link to={'/category/'+category.path} key={index} className="column">
                  <p className={'notification is-centered-text ' + getNotificationColorByIndex(index)}>
                    <span className="subtitle">{capitalizeFirstLetter(category.name)}</span>
                  </p>
                </Link>
              ) }
            </div>
          </div>

        </div>

		)
	}
}

export default HomeCategories
