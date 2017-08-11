import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { capitalizeFirstLetter, getNotificationColorByIndex } from './../utils/utils'
import PostList from './PostList'

class Category extends Component {

  getCategory = (categories) => {
    if (categories)
      return { data: categories.find((category) => (category.path === this.props.categoryPath)),
        index: categories.findIndex((category) => (category.path === this.props.categoryPath)) }
    else return null
  }

	render() {

		const { categories, posts } = this.props

    const category = this.getCategory(categories)

    let postsToDisplay = []

    if (category && posts) {
      postsToDisplay = posts.filter( (post) => (post.category === category.data.name))
    }

		return (
			<div>
				<Header />
          { category && (
            <div style={{marginBottom: '50px'}}>
              <section className={'hero ' + getNotificationColorByIndex(category.index)}>
                <div className="hero-body">
                  <div className="container">
                    <h1 className="title">
                      {capitalizeFirstLetter(category.data.name)}
                    </h1>
                    <h2 className="subtitle">
                      Only posts about {capitalizeFirstLetter(category.data.name)}
                    </h2>
                  </div>
                </div>
              </section>
              <PostList posts={postsToDisplay} />
            </div>
          )}
        <Footer />
			</div>
		)
	}
}

export default Category
