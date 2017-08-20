import React, { Component } from 'react'
import { showDate, nl2br } from '../utils/utils'
import { controlEditCommentForm, updateComment } from '../actions'
import VoteScoreComment from './VoteScoreComment';
import CommentActions from './CommentActions';
import { connect } from 'react-redux'
import { updateCommentById } from './../utils/readableAPI'
import {notify} from 'react-notify-toast';

class Comment extends Component {

  componentDidMount() {
    this.props.controlEditCommentForm('id', 0)
  }
  handleChange(event) {
    this.props.controlEditCommentForm(event.target.name, event.target.value)
  }

  handleSubmit() {
    const { editCommentForm } = this.props
    if (this.fieldsAreValid()) {
      controlEditCommentForm('showNotification', false)
      this.props.updateComment(
        editCommentForm.id,
        editCommentForm.commentBody,
        editCommentForm.commentAuthor)
    } else {
      this.props.controlEditCommentForm('showNotification', true)
    }
  }

  fieldsAreValid() {
    const form = this.props.editCommentForm
    if (form.commentAuthor && form.commentAuthor !== ''
      && form.commentBody && form.commentBody !== ''
      ) return true;
    return false;
  }

	render() {

    const { comment, editCommentForm, controlEditCommentForm } = this.props

		return (

      <section className="content readable-comment">
        <div className="columns is-mobile">

          <div className="column" style={{maxWidth: '115px'}}>
            <VoteScoreComment voteScore={comment.voteScore} comment={comment} />
          </div>
          <div className="column">
            { (editCommentForm.id !== comment.id) &&
            <div>
              <strong>{comment.author}</strong>
              &nbsp;
              <small>{showDate(comment.timestamp)}</small>
              &nbsp; · &nbsp;
              <CommentActions comment={comment} />
              <br />
              <div className="content">
                {comment.body.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>
                })}
              </div>
            </div>
            }
            { (editCommentForm.id === comment.id) &&
              <div className="editCommentArea">
                <input type="text"
                  className="input"
                  name="commentAuthor"
                  defaultValue={comment.author}
                  onChange={(event) => this.handleChange(event)} />
                <textarea
                  className="textarea has-bottom-margin"
                  name="commentBody"
                  defaultValue={comment.body}
                  onChange={(event) => this.handleChange(event)} />
                <div className="button is-success is-small"
                  onClick={() => this.handleSubmit()}>
                  Update
                </div>
                &nbsp;
                <div
                  className="button is-small"
                  onClick={() => {controlEditCommentForm('id', 0)}}>
                  Cancel
                </div>
                { editCommentForm.showNotification &&
                  <div className="notification is-danger" style={{marginTop: '10px'}}>
                    <button className="delete" onClick={() => controlEditCommentForm('showNotification', false)}></button>
                    <strong>Oops. Something is not right.</strong><br />
                    Please enter your username and some text for the comment.
                  </div>
                }

              </div>
            }
          </div>
        </div>
      </section>
		)
	}
}

function mapStateToProps(state) {
  return {
    editCommentForm: state.editCommentForm,
  }
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    controlEditCommentForm: (name, value) => {
      dispatch(controlEditCommentForm(name, value))
    },
    updateComment: (commentId, body, author) => {
      updateCommentById(commentId, body, author)
        .then(() => {
          dispatch(updateComment(commentId,
            ownProps.comment.parentId,
            body,
            author))
          dispatch(controlEditCommentForm('id', 0))
          notify.show('✅ Comment Updated!');
        }
        )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
