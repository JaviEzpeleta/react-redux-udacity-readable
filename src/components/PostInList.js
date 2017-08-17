import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showDate } from '../utils/utils'
import { connect } from 'react-redux'
import { setPostComments,
    displayDeleteModal,
    setPostIdToDeleteModal,
    deletePost } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import VoteScore from './VoteScore'
import Modal from 'react-modal'
import AnimatedWrapper from './../utils/AnimatedWrapper';

class PostInList extends Component {

  componentWillMount() {
      this.props.setPostComments(this.props.postId);
      // console.log('🖨 PostInList.js')
  }

	render() {

    const { post,
      comments,
      deletePostModal,
      displayDeleteModal,
      setPostIdToDeleteModal,
      deletePost } = this.props

    let postComments = false
    if (comments) {
      postComments = comments[post.id]
    }

		return (
      <div className="box">
        <div className="columns">
          <div className="column">
            <article className="media">
              <div className="media-left">
                <figure className="has-text-centered">
                  <VoteScore postId={post.id} />
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
          <div className="column" style={{maxWidth: '100px'}}>
            <div
                className="button actionButtonFromPostList is-danger is-small is-outlined"
              onClick={() => {
                  setPostIdToDeleteModal(post.id)
                  displayDeleteModal(true)
                }
              }>
              <span className="icon is-small"><i className="fa fa-trash-o"></i></span>
              &nbsp;
              delete
            </div>
            <br />
            <Link to={'/edit/'+post.id}
                className="button actionButtonFromPostList is-small is-info is-outlined">
              <span className="icon is-small"><i className="fa fa-edit"></i></span>
              &nbsp;
              edit
            </Link>
          </div>
        </div>

        <Modal
          isOpen={deletePostModal.isActive}
          onRequestClose={() => displayDeleteModal(false)}
          contentLabel="No Overlay Click Modal"
        >
          <div className="container">
            <h1 className="title">
              Are you sure?
            </h1>
            <p>
              Please confirm that you want to delete this post.
              <br />
              <i>(this action cannot be undone)</i>
            </p>
            <br />
            <div style={{marginRight:'12px'}}className="button" onClick={() => displayDeleteModal(false)}>Cancel</div>
            <div className="button is-outlined is-danger"
                onClick={() => {
                  deletePost(deletePostModal.postId)
                  displayDeleteModal(false)
                }} >
              Yes, I want to delete the post
            </div>
          </div>
        </Modal>

      </div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    comments: state.comments,
    deletePostModal: state.deletePostModal
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setPostComments: () =>
      ReadableAPI.getCommentsByPostId(ownProps.post.id).then( (comments) => {
        dispatch(setPostComments(ownProps.post.id, comments))
      }
    ),
    displayDeleteModal: (bool) => {
      dispatch(displayDeleteModal(bool))
    },
    setPostIdToDeleteModal: (postId) => {
      dispatch(setPostIdToDeleteModal(postId))
    },
    deletePost: (postIdToDelete) => {
      ReadableAPI.deletePostById(postIdToDelete).then(() => dispatch(deletePost(postIdToDelete)))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedWrapper(PostInList, 12))
// export default connect(mapStateToProps, mapDispatchToProps)(PostInList)
