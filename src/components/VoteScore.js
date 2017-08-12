import React, { Component } from 'react'

class VoteScore extends Component {
	render() {

		const { voteScore } = this.props

		return (
			<div className="readable-voteScore-wrapper">
				<div className={'readable-voteScore-value notification ' + getColorClassForVoteSocre(voteScore)}>
					{this.props.voteScore}
				</div>
				<a className="button is-success is-outlined">
					<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
				</a>
				<a className="button is-danger is-outlined">
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

export default VoteScore
