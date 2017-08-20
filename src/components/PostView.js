import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { connect } from 'react-redux'
import { setPostComments } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import { objectToArray } from '../utils/utils'
import Post from './Post'
import PostBadCategory from './PostBadCategory'

class PostView extends Component {

  componentWillMount() {
    this.props.setPostComments(this.props.postId);
    window.scrollTo(0, 0)
  }

  render() {

    const { posts, comments, postId, history, categoryUrl } = this.props

    let post = false
    let rightCategory = false
    let isActive = true

    if (posts) {
      if (post = posts.find((post) => (post.id === postId))) {
        console.log('THE POST')
        console.log(post)
        if (post.category === categoryUrl) {
          rightCategory = true
        } else {
          if (post.deleted) isActive = false
        }
      }
    }

    return (
      <div>
        <Header />
        { rightCategory ?
          <Post post={post} comments={comments} history={history} />
          :
          <PostBadCategory categoryUrl={categoryUrl} />
        }
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    posts: objectToArray(state.posts),
    comments: state.comments[props.postId]
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

