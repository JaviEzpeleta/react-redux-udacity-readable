import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import HomeCategories from './HomeCategories'
import PostList from './PostList'

class Home extends Component {

	render() {

		const { categories, posts } = this.props

		return (
			<div>
				<Header />

        <div className="readable-body-wrapper">
          <HomeCategories categories={categories} />
          <PostList posts={posts}/>
        </div>

        <Footer />

			</div>
		)
	}
}

export default Home
