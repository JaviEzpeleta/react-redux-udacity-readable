import React, { Component } from 'react'
import { connect } from 'react-redux'
import { applyVote } from './../../actions'
import * as ReadableAPI from './../../utils/readableAPI'
import { objectToArray } from '../../utils/utils'

class VoteScore extends Component {

	render() {

		const { post, applyVote } = this.props


		return (
			<div className="readable-voteScore-wrapper">
				<div className={'readable-voteScore-value notification ' + getColorClassForVoteSocre(post.voteScore)}>
					{post.voteScore}
				</div>
				<a className="button is-success is-outlined" onClick={() => applyVote(post.voteScore, 1)}>
					<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
				</a>
				<a className="button is-danger is-outlined" onClick={() => applyVote(post.voteScore, -1)}>
					<i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
				</a>
			</div>
		)
	}
}

function getColorClassForVoteSocre(voteScore) {
	if (voteScore > 10) return 'is-success'
	if (voteScore > 5) return 'is-info'
	if (voteScore < 0) return 'is-danger'
	return 'is-primary'
}

function mapStateToProps(state, props) {
  return {
    posts: objectToArray(state.posts)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    applyVote: (newValue, diff) => {
      ReadableAPI.votePost(ownProps.post.id, diff)
      dispatch(applyVote(ownProps.post.id, newValue+diff))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
