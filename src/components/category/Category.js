import React, { Component } from 'react'
import Header from './../Header'
import Footer from './../Footer'
import CategoryHeader from './CategoryHeader'
import { capitalizeFirstLetter } from './../../utils/utils'
import PostList from './../post/PostList'
import WrongCategoryURL from './WrongCategoryURL'

class Category extends Component {

  getCategory = (categories) => {
    if (categories) {
      const categoryFound = {
          data: categories.find((category) => (category.path === this.props.categoryPath)),
          index: categories.findIndex((category) => (category.path === this.props.categoryPath))
      }
      if (categoryFound.index === -1) return null
      else return categoryFound
    }
    return null
  }

	render() {

		const { categories, posts, history, categoryPath } = this.props

    const category = this.getCategory(categories)

    let postsToDisplay = []

    if (category && posts) {
      postsToDisplay = posts.filter( (post) => (post.category === category.data.name))
    }

    let elegantCategoryName = ''
    if (category) elegantCategoryName = capitalizeFirstLetter(category.data.name)

		return (
			<div>
				<Header />
          { category ? (
            <div style={{marginBottom: '50px'}}>
              <CategoryHeader
                elegantCategoryName={elegantCategoryName}
                category={category} />
              <PostList posts={postsToDisplay} history={history}/>
            </div>
            ) :
            <WrongCategoryURL categoryUrl={categoryPath}/>
          }
        <Footer />
			</div>
		)
	}
}

export default Category