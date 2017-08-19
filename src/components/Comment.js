import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import VoteScoreComment from './VoteScoreComment';
import CommentActions from './CommentActions';
import { connect } from 'react-redux'

class Comment extends Component {


  handleChange() {
    return true
  }

	render() {

    const {comment, editCommentForm} = this.props

		return (

      <section className="content readable-comment">
        <div className="columns is-mobile">

          <div className="column" style={{maxWidth: '115px'}}>
            <VoteScoreComment voteScore={comment.voteScore} comment={comment} />
          </div>
          <div className="column">
            <strong>{comment.author}</strong> <small>{showDate(comment.timestamp)}</small>
            &nbsp; · &nbsp;
            <CommentActions comment={comment} />
            <br />
            {comment.body}
          </div>
        </div>
        { (editCommentForm.id === comment.id) &&
          <div className="editCommentArea">
            <input type="text" className="input" defaultValue={comment.author} onChange={this.handleChange}/>
            <textarea className="textarea has-bottom-margin" defaultValue={comment.body} onChange={this.handleChange}></textarea>
            <div className="button">Update</div>
          </div>
        }
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
