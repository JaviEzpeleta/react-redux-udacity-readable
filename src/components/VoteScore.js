import React, { Component } from 'react'
import { connect } from 'react-redux'
import { applyVote } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'

class VoteScore extends Component {
	render() {

		const { voteScore } = this.props

		return (
			<div className="readable-voteScore-wrapper">
				<div className={'readable-voteScore-value notification ' + getColorClassForVoteSocre(voteScore)}>
					{this.props.voteScore}
				</div>
				<a className="button is-success is-outlined" onClick={() => this.props.applyVote(1)}>
					<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
				</a>
				<a className="button is-danger is-outlined" onClick={() => this.props.applyVote(-1)}>
					<i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
				</a>
			</div>
		)
	}
}

function getColorClassForVoteSocre(voteScore) {
	if (voteScore > 10) return 'is-sucess'
	if (voteScore > 5) return 'is-info'
	if (voteScore < 0) return 'is-danger'
	return 'is-primary'
}

function mapStateToProps(state, props) {
  return {
    postsInfo: state.posts.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    applyVote: (value) =>
      ReadableAPI.getCommentsByPostId(ownProps.postId).then( (comments) => {
        dispatch(applyVote(ownProps.postId, value))
      }
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
