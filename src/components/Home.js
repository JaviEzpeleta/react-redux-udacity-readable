import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import HomeCategories from './category/HomeCategories'
import PostList from './post/PostList'

class Home extends Component {
  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { categories, posts, history, loadingCategories } = this.props

    return (
      <div>
        <Header />
        <div className="readable-body-wrapper">
          <HomeCategories
            categories={categories}
            posts={posts}
            loadingCategories={loadingCategories}
          />
          <PostList posts={posts} history={history} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
