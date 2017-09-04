import React, { Component } from 'react'
import { connect } from 'react-redux'
import { applyVote } from './../../actions'
import * as ReadableAPI from './../../utils/readableAPI'
import { objectToArray, getColorClassForVoteScore } from '../../utils/utils'
import * as LocalStorageAPI from './../../utils/localStorageAPI'

class VoteScore extends Component {
  render() {
    const { post, applyVote } = this.props

    return (
      <div className="readable-voteScore-wrapper">
        <div
          className={
            'readable-voteScore-value notification ' +
            getColorClassForVoteScore(post.voteScore)
          }
        >
          {post.voteScore}
        </div>
        <a
          className="button is-success is-outlined"
          onClick={() => applyVote(post.voteScore, 1)}
        >
          <i className="fa fa-thumbs-o-up" aria-hidden="true" />
        </a>
        <a
          className="button is-danger is-outlined"
          onClick={() => applyVote(post.voteScore, -1)}
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

function mapDispatchToProps(dispatch, ownProps, state) {
  return {
    applyVote: (newValue, diff) => {
      ReadableAPI.votePost(ownProps.post.id, diff)
        .then(res => {
          dispatch(applyVote(ownProps.post.id, newValue + diff))
        })
        .catch(() => {
          dispatch(applyVote(ownProps.post.id, newValue + diff))
          LocalStorageAPI.votePost(ownProps.post.id, newValue + diff)
          LocalStorageAPI.addPendingAction({
            function: 'votePost',
            vote: {
              id: ownProps.post.id,
              newValue: newValue + diff,
              diff: diff
            }
          })
          console.log('connection failed when trying to vote this post')
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
