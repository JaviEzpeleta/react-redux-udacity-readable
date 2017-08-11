import React, { Component } from 'react'
import * as ReadableAPI from './../utils/readableAPI'
import Header from './Header'
import HomeCategories from './HomeCategories'
import { connect } from 'react-redux'
import { setCategories, setPosts } from './../actions'
import PostList from './PostList'

class Home extends Component {

	componentWillMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
	}

	render() {

		const { posts, categories } = this.props

		return (
			<div>
				<Header />

				<HomeCategories categories={categories} />

        <PostList posts={posts} />

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
			</div>
		)
	}
}

function mapStateToProps (state, props) {
  return {
    categories: state.categories.categories,
    posts: state.posts.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () =>
    	ReadableAPI.getAllCategories().then( (categories) => {
    		dispatch(setCategories(categories))
    	}
   	),
    getAllPosts: () =>
      ReadableAPI.getAllPosts().then( (posts) => {
        dispatch(setPosts(posts))
      }
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
