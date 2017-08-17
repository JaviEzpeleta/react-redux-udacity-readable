import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CategorySummary extends Component {

	render() {

    const { linkTo, colorToApply, title, numberOfPosts } = this.props

		return (
      <Link to={linkTo} className="column">
        <p className={'notification is-centered-text ' + colorToApply}>
          <span className="title">{title}</span>
          <br />
          { (numberOfPosts > 0 ) ?
            ((numberOfPosts > 1 ) ?
              numberOfPosts + ' posts' : '1 post')
            : 'No posts yet' }
        </p>
      </Link>
		)
	}

}

export default CategorySummary
