import React, { Component } from 'react'
import { connect } from 'react-redux'
import { applyVoteToComment } from './../../actions'
import { voteComment } from './../../utils/readableAPI'
import { objectToArray, getColorClassForVoteScore } from '../../utils/utils'
import * as LocalStorageAPI from './../../utils/localStorageAPI'

class VoteScoreComment extends Component {
  render() {
    const { comment, applyVoteToComment } = this.props

    return (
      <div className="readable-voteScore-wrapper">
        <div
          className={
            'readable-voteScore-value notification ' +
            getColorClassForVoteScore(comment.voteScore)
          }
        >
          {comment.voteScore}
        </div>
        <a
          className="button is-success is-outlined"
          onClick={() => applyVoteToComment(comment.voteScore, 1)}
        >
          <i className="fa fa-thumbs-o-up" aria-hidden="true" />
        </a>
        <a
          className="button is-danger is-outlined"
          onClick={() => applyVoteToComment(comment.voteScore, -1)}
        >
          <i className="fa fa-thumbs-o-down" aria-hidden="true" />
        </a>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    posts: objectToArray(state.posts)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    applyVoteToComment: (newValue, diff) => {
      voteComment(ownProps.comment.id, diff)
        .then(
          dispatch(
            applyVoteToComment(
              ownProps.comment.id,
              ownProps.comment.parentId,
              newValue + diff
            )
          )
        )
        .catch(() => {
          dispatch(
            applyVoteToComment(
              ownProps.comment.id,
              ownProps.comment.parentId,
              newValue + diff
            )
          )
          LocalStorageAPI.voteComment(
            ownProps.comment.id,
            newValue + diff,
            ownProps.comment.parentId
          )
          LocalStorageAPI.addPendingAction({
            function: 'voteComment',
            vote: {
              id: ownProps.comment.id,
              newValue: newValue + diff,
              diff: diff
            }
          })
          console.log('connection failed when trying to vote this comment')
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScoreComment)
