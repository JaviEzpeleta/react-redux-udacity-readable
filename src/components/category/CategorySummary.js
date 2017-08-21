import React from 'react'
import { Link } from 'react-router-dom'

const CategorySummary = (props) => (
  <Link to={props.linkTo} className="column">
    <p className={'notification is-centered-text ' + props.colorToApply}>
      <span className="title">{props.title}</span>
      <br />
      { (props.numberOfPosts > 0 ) ?
        ((props.numberOfPosts > 1 ) ?
          props.numberOfPosts + ' posts' : '1 post')
        : 'No posts yet' }
    </p>
  </Link>
)

export default CategorySummary
