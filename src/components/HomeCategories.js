import React, { Component } from 'react'
import { capitalizeFirstLetter, getNotificationColorByIndex } from './../utils/utils'
import { Link } from 'react-router-dom'

class HomeCategories extends Component {

	render() {

    const { categories, posts } = this.props

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
                <Link to={'/category/'+category.path} key={index} className="column">
                  <p className={'notification is-centered-text ' + getNotificationColorByIndex(index)}>
                    <span className="title">{capitalizeFirstLetter(category.name)}</span>
                    <br />
                    { (numberOfPosts > 0 ) ?
                      ((numberOfPosts > 1 ) ? numberOfPosts + ' posts' : '1 post') : 'No posts yet' }
                  </p>
                </Link>
                )
              } ) }
            </div>
          </div>

        </div>

		)
	}
}

export default HomeCategories
