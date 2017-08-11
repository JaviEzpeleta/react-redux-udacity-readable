import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import * as ReadableAPI from './../utils/readableAPI'
import { setCategories } from './../actions'
import { capitalizeFirstLetter, getNotificationColorByIndex } from './../utils/utils'

class Category extends Component {

	componentWillMount() {
    if (this.props.categories) {
    } else {
      this.props.getAllCategories()
    }
	}

  getCategory = (categories) => {
    if (categories)
      return { data: categories.find((category) => (category.path === this.props.categoryPath)),
        index: categories.findIndex((category) => (category.path === this.props.categoryPath)) }
    else return null
  }

	render() {

		const { posts, categories } = this.props

    const category = this.getCategory(categories)

		return (
			<div>
				<Header />
          { category && (
            <section className={'hero ' + getNotificationColorByIndex(category.index)}>
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    {category && capitalizeFirstLetter(category.data.name)}
                  </h1>
                  <h2 className="subtitle">
                    Hero subtitle
                  </h2>
                </div>
              </div>
            </section>
          )}

				<section>
					<div className="container">
						<h2 className="is-size-3"> THE CATEGORY: </h2>
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
