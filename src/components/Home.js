import React, { Component } from 'react'
import Header from './Header'
import HomeCategories from './HomeCategories'
import PostList from './PostList'

class Home extends Component {

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

export default Home
