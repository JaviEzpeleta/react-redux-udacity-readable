import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showDate } from '../utils/utils'
import { connect } from 'react-redux'
import { setPostComments } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'

class PostInList extends Component {

  componentWillMount() {
      this.props.setPostComments(this.props.postId);
  }

	render() {

    const { post, comments } = this.props

    let postComments = false
    if (comments) {
      postComments = comments[post.id]
      console.log('COMMENTS')
      console.log(comments)
      console.log('THE COMMENTS')
      console.log(postComments)
    }

		return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src="http://bulma.io/images/placeholders/128x128.png" alt="Placeholder" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>
                  {post.author}
                </strong>
                &nbsp;
                <small>
                {showDate(post.timestamp)}
                { /*
                  <Moment fromNow>
                    <Moment unix>{post.timestamp}</Moment>
                  </Moment>
                */ }
                </small>
                <br />
                <Link to={'/post/'+post.id} className="is-size-5">{post.title}</Link>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <Link to={'/category/'+post.category} className="tag">
                  {post.category}
                </Link>
                &nbsp;
                <span className="icon is-small">
                  <i className="fa fa-comment-o"></i>
                </span>
                &nbsp;
                { postComments && postComments.length ?
                  ((postComments.length === 1) ?
                      '1 comment'
                      : postComments.length + ' comments')
                  : ' 0 comments'
                }
              </div>
            </nav>
          </div>
        </article>
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
    setPostComments: () =>
      ReadableAPI.getCommentsByPostId(ownProps.post.id).then( (comments) => {
        dispatch(setPostComments(ownProps.post.id, comments))
      }
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostInList)
