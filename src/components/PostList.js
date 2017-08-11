import React, { Component } from 'react'
import { capitalizeFirstLetter, getNotificationColorByIndex } from './../utils/utils'
import { Link } from 'react-router-dom'

class PostList extends Component {

	render() {

    const { posts } = this.props

    console.log(posts)

		return (
        <section>
          <div className="container">
            <h2 className="is-size-3"> posts: </h2>
            { posts && posts.map( (post, index) =>
              <div key={index}>
                «<b>{post.title}</b>» by {post.author}
              </div>
            ) }
          </div>
        </section>
		)
	}
}

export default PostList


