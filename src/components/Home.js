import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import HomeCategories from './HomeCategories'
import PostList from './PostList'

class Home extends Component {

  render() {

    const { categories, posts, history } = this.props

    return (
      <div>
        <Header />
        <div className="readable-body-wrapper">
          <HomeCategories categories={categories} posts={posts} />
          <PostList posts={posts} history={history} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
