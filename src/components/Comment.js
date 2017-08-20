import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import { controlEditCommentForm } from '../actions'
import VoteScoreComment from './VoteScoreComment';
import CommentActions from './CommentActions';
import { connect } from 'react-redux'

class Comment extends Component {

  componentDidMount() {
    this.props.controlEditCommentForm('id', 0)
  }
  handleChange(event) {
    this.props.controlEditCommentForm(event.target.name, event.target.value)
  }

  handleSubmit() {
    if (this.fieldsAreValid()) {
      controlEditCommentForm('showNotification', false)
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
              {comment.body}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
