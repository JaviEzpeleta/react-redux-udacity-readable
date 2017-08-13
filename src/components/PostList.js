import React, { Component } from 'react'
import PostInList from './PostInList'

class PostList extends Component {

	render() {

    const { posts } = this.props

		return (
      <section>
        <div className="container" style={{marginTop:'2em'}}>
          { posts && posts.length && posts.map( (post, index) =>
            <PostInList key={index} post={post} />
          ) }
        </div>
      </section>
		)
	}
}


export default PostList
