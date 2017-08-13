import React, { Component } from 'react'
import { connect } from 'react-redux'
import { applyVote } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import { objectToArray } from '../utils/utils'

class VoteScore extends Component {

	render() {

		const { postId, posts, applyVote } = this.props

    let thePost = false

    if (posts) {
      thePost = posts.find((post) => (post.id === postId))
    }

		return (
			<div className="readable-voteScore-wrapper">
				<div className={'readable-voteScore-value notification ' + getColorClassForVoteSocre(thePost.voteScore)}>
					{thePost.voteScore}
				</div>
				<a className="button is-success is-outlined" onClick={() => applyVote(thePost.voteScore, 1)}>
					<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
				</a>
				<a className="button is-danger is-outlined" onClick={() => applyVote(thePost.voteScore, -1)}>
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
      ReadableAPI.votePost(ownProps.postId, diff)
      dispatch(applyVote(ownProps.postId, newValue+diff))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
