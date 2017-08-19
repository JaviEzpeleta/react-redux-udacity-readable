import React, { Component } from 'react'
import { deleteCommentById, getCommentsByPostId } from './../utils/readableAPI'
import { setPostComments } from '../actions'
import { connect } from 'react-redux';
import {notify} from 'react-notify-toast';

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
          notify.show('✔️ comment deleted');
        })
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(CommentActions)

