import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { connect } from 'react-redux'
import { setPostComments } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import { objectToArray } from '../utils/utils'
import Post from './Post'

class PostView extends Component {

  componentWillMount() {
    this.props.setPostComments(this.props.postId);
    window.scrollTo(0, 0)
  }

  render() {

    const { posts, comments, postId, history } = this.props

    let post = false
    let theComments = false

    if (posts) {
      post = posts.find((post) => (post.id === postId))
    }

    if (comments) theComments = comments[postId]
    return (
      <div>
        <Header />
        { post && <Post post={post} comments={theComments} history={history} /> }
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    posts: objectToArray(state.posts),
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setPostComments: () =>
      ReadableAPI.getCommentsByPostId(ownProps.postId).then( (comments) => {
        dispatch(setPostComments(ownProps.postId, comments))
      }
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

