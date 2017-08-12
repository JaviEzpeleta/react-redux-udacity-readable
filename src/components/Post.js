import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { connect } from 'react-redux'
import { setPost, setPostComments } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import { showDate } from '../utils/utils'
import { Link } from 'react-router-dom'

class Post extends Component {

  componentWillMount() {
      this.props.setPost(this.props.postId);
      this.props.setPostComments(this.props.postId);
  }

	render() {

    const {postsInfo, comments, postId} = this.props

    let thePost = false

    if (postsInfo) {
      thePost = postsInfo.find((post) => (post.id === postId))
      console.log(thePost)
    }

    if (comments) {
      const theComments = comments[postId]
      console.log('THE COMMENTS')
      console.log(theComments)
    }
		return (
			<div>
				<Header />
          { thePost &&
            <div className="container content" style={{marginTop: '25px', marginBottom: '50px'}}>

              <h1>
                {thePost.title}
              </h1>
              <blockquote>
                {thePost.body}
              </blockquote>
              <p>
                posted by <strong>{thePost.author}</strong>,
                &nbsp;
                {showDate(thePost.timestamp)}
                <br />
                category: <Link to={'/category/' + thePost.category}>{thePost.category}</Link>
              </p>

            </div>
          }
        <Footer />
			</div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    postsInfo: state.posts.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
      setPost: () =>
        ReadableAPI.getPostById(ownProps.postId).then( (post) => {
          dispatch(setPost(post))
        }
      ),
      setPostComments: () =>
        ReadableAPI.getCommentsByPostId(ownProps.postId).then( (comments) => {
          dispatch(setPostComments(ownProps.postId, comments))
        }
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)

