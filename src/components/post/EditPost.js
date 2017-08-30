import React, { Component } from 'react'
import Header from './../Header'
import Footer from './../Footer'
import EditForm from './EditForm'
import { connect } from 'react-redux'
import { objectToArray } from './../../utils/utils'

class EditPost extends Component {
  componentWillMount() {
    window.scrollTo(0, 0)
  }

  fieldsAreValid = () => {
    const form = this.props.newPostForm
    if (form.title && form.category && form.username && form.message)
      return true
    return false
  }

  handleChange = event => {
    this.props.controlNewPostForm(event.target.name, event.target.value)
  }

  render() {
    const { posts, postId, categories } = this.props

    let post = false

    if (posts.length > 0) {
      post = posts.find(post => post.id === postId)
    }

    return (
      <div>
        <Header />
        {post &&
          <EditForm
            post={post}
            categories={categories}
            history={this.props.history}
          />}
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: objectToArray(state.posts),
    categories: state.categories,
    newPostForm: state.newPostForm
  }
}

export default connect(mapStateToProps)(EditPost)
