import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import AnimatedWrapper from './../utils/AnimatedWrapper';
import VoteScoreComment from './VoteScoreComment';
import CommentActions from './CommentActions';

class Comment extends Component {

	render() {

    const {comment} = this.props

		return (
      <div className="box">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{comment.author}</strong> <small>{showDate(comment.timestamp)}</small>
              <br />
              {comment.body}
            </p>
          </div>
          <VoteScoreComment voteScore={comment.voteScore} comment={comment} />
          <CommentActions comment={comment} />
        </div>
      </div>
		)
	}
}

export default AnimatedWrapper(Comment)

