import React, { Component } from 'react'
import { connect } from 'react-redux'
import { controlNewCommentData, addNewCommentAction } from '../../actions'
import { addNewComment, getCommentsByPostId } from './../../utils/readableAPI'
import AnimatedWrapper from './../../utils/AnimatedWrapper'
import faker from 'faker'
import { notify } from 'react-notify-toast'

class AddComment extends Component {
  constructor(props) {
    super(props)
    // emptyInputField will be used to empty the "body" textarea right after you post a new comment
    // that way you can post several comments and you won't have to clean the previously entered text
    // (but the username will be kept, assuming you are still you)
    this.emptyInputField = this.emptyInputField.bind(this)
  }

  emptyInputField() {
    this.textInput.value = ''
  }

  handleChange = event => {
    this.props.controlNewCommentData(event.target.name, event.target.value)
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.fieldsAreValid()) {
      this.props.newCommentData.id = faker.random.uuid()
      this.props.newCommentData.timestamp = Date.now()
      this.props.addNewComment(this.props.newCommentData)
      this.props.controlNewCommentData('showNotification', false)
      this.emptyInputField()
      this.props.controlNewCommentData('newComment', '')
    } else {
      this.props.controlNewCommentData('showNotification', true)
    }
    event.preventDefault()
  }

  fieldsAreValid = () => {
    const form = this.props.newCommentData
    if (
      form.commentAuthor &&
      form.commentAuthor !== '' &&
      form.newComment &&
      form.newComment !== ''
    )
      return true
    return false
  }

  render() {
    const { newCommentData, controlNewCommentData } = this.props
    return (
      <div className="newCommentWapper">
        <h4>Add a comment:</h4>
        <input
          className="input has-bottom-margin"
          type="text"
          name="commentAuthor"
          placeholder="your username"
          onChange={event => this.handleChange(event)}
        />
        <textarea
          className="textarea has-bottom-margin"
          ref={element => (this.textInput = element)}
          type="text"
          name="newComment"
          placeholder="add a comment..."
          onChange={event => this.handleChange(event)}
        />
        <div
          className="button has-bottom-mini-margin"
          onClick={this.handleSubmit}
        >
          Post Comment
        </div>

        {newCommentData.showNotification &&
          <div className="notification is-danger">
            <button
              className="delete"
              onClick={() => controlNewCommentData('showNotification', false)}
            />
            <strong>Oops. Something is not right.</strong>
            <br />
            Please enter your username and some text for the comment.
          </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newCommentData: state.newCommentData
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    controlNewCommentData: (name, value) =>
      dispatch(controlNewCommentData(name, value)),
    addNewComment: commentData => {
      addNewComment(ownProps.postId, commentData).then(() => {
        getCommentsByPostId(ownProps.postId).then(comments => {
          dispatch(addNewCommentAction(ownProps.postId, commentData))
          notify.show('✅ New Comment Added!')
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AnimatedWrapper(AddComment)
)
