import React, { Component } from 'react'
import { deleteCommentById, getCommentsByPostId } from './../utils/readableAPI'
import { setPostComments } from '../actions'
import { connect } from 'react-redux';

class CommentActions extends Component {

	render() {

    const { deleteComment } = this.props

		return (
      <div>
        <div>
          edit
        </div>
        <div onClick={deleteComment}>
          remove
        </div>
      </div>
		)
	}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteComment: () => {
      deleteCommentById(ownProps.comment.id).then(() => {
        getCommentsByPostId(ownProps.comment.parentId).then( (comments) => {
          dispatch(setPostComments(ownProps.comment.parentId, comments))
        })
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(CommentActions)

