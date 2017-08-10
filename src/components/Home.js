import React, { Component } from 'react'
import * as ReadableAPI from './../utils/readableAPI'
import Header from './Header'
import HomeCategories from './HomeCategories'
import { connect } from 'react-redux'
import { setCategories, setPosts } from './../actions'

class Home extends Component {

	state = {}

	componentWillMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
	}

	render() {

		console.log('from RENDER:')
		console.log(this.props)

		const { posts, categories } = this.props

		return (
			<div>
				<Header />

				<HomeCategories />

				<section>
					<div className="container">
						<h2 className="is-size-3"> categories {this.props.saludo}: </h2>
						{ categories && categories.map( (category, index) =>


							<div key={index}>
								{category.name}
							</div>
						) }
					</div>
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
