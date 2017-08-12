import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { connect } from 'react-redux'
import { setPost, setPostComments } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'

class Post extends Component {

  componentWillMount() {
      this.props.setPost(this.props.postId);
      this.props.setPostComments(this.props.postId);
  }

	render() {

    const {postsInfo, comments, postId} = this.props

    if (postsInfo) {
      const thePost = postsInfo.find((post) => (post.id === postId))
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
          <div style={{marginBottom: '50px'}}>
            THIS IS THE POST DETAIL
            <br />
            { postsInfo && postsInfo.map( (post, id) =>
              <div key={id}>
                {post.title} !!!
                <br />
                [ {post.comments && post.comments.length} ] !!!
              </div>
            )}
          </div>
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

