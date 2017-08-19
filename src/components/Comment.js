import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import { controlEditCommentForm } from '../actions'
import VoteScoreComment from './VoteScoreComment';
import CommentActions from './CommentActions';
import { connect } from 'react-redux'

class Comment extends Component {

  handleChange() {
    return true
  }

	render() {

    const {comment, editCommentForm, controlEditCommentForm} = this.props

		return (

      <section className="content readable-comment">
        <div className="columns is-mobile">

          <div className="column" style={{maxWidth: '115px'}}>
            <VoteScoreComment voteScore={comment.voteScore} comment={comment} />
          </div>
          <div className="column">
            { (editCommentForm.id !== comment.id) &&
            <div>
              <strong>{comment.author}</strong> <small>{showDate(comment.timestamp)}</small>
              &nbsp; · &nbsp;
              <CommentActions comment={comment} />
              <br />
              {comment.body}
            </div>
            }
            { (editCommentForm.id === comment.id) &&
              <div className="editCommentArea">
                <input type="text" className="input" defaultValue={comment.author} onChange={this.handleChange}/>
                <textarea className="textarea has-bottom-margin" defaultValue={comment.body} onChange={this.handleChange}></textarea>
                <div className="button is-success is-small">Update</div>
                &nbsp;
                <div className="button is-small" onClick={() => {
                  controlEditCommentForm('id', 0)}
                  }>Cancel</div>
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
