import React, { Component } from 'react'
import { deleteCommentById, getCommentsByPostId } from './../utils/readableAPI'
import { setPostComments, controlEditCommentForm } from '../actions'
import { connect } from 'react-redux';
import {notify} from 'react-notify-toast';

class CommentActions extends Component {

	render() {

    const { deleteComment, startEditingThisComment } = this.props

		return (
      <span>
        <div onClick={deleteComment} className="button is-small is-danger is-outlined">
          delete
        </div>
        &nbsp;
        <div onClick={startEditingThisComment} className="button is-small is-info is-outlined">
          edit
        </div>
      </span>
		)
	}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteComment: () => {
      deleteCommentById(ownProps.comment.id).then(() => {
        getCommentsByPostId(ownProps.comment.parentId).then( (comments) => {
          dispatch(setPostComments(ownProps.comment.parentId, comments))
          notify.show('✔️ comment deleted');
        })
      })
    },
    startEditingThisComment: () => {
      dispatch(controlEditCommentForm('id', ownProps.comment.id))
      dispatch(controlEditCommentForm('commentAuthor', ownProps.comment.author))
      dispatch(controlEditCommentForm('commentBody', ownProps.comment.body))
    }
  }
}

export default connect(null, mapDispatchToProps)(CommentActions)

