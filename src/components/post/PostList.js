import React, { Component } from 'react'
import PostInList from './PostInList'
import { connect } from 'react-redux'
import { updateSortMethod } from '../../actions'
import { sortByDate, sortByScore } from '../../utils/utils'
import AddPostButton from './AddPostButton'

class PostList extends Component {
  render() {
    const {
      posts,
      sortMethod,
      updateSortMethod,
      history,
      loadingPosts
    } = this.props

    sortMethod === 'date' ? posts.sort(sortByDate) : posts.sort(sortByScore)

    let sectionTitle = ''
    if (posts.length > 1) sectionTitle = posts.length + ' posts'
    else if (posts.length === 1) sectionTitle = '1 post'
    else sectionTitle = 'No posts yet'

    return (
      <div className="container has-top-margin">
        <div className="select right">
          <select
            value={sortMethod}
            onChange={event => {
              updateSortMethod(event.target.value)
            }}
          >
            <option value="score">Top Score</option>
            <option value="date">Most recent</option>
          </select>
        </div>

        {loadingPosts
          ? <div />
          : <div>
              <h3 className="title is-3 is-spaced">
                {sectionTitle}
              </h3>
              <div>
                {posts.length > 0 &&
                  posts.map((post, index) =>
                    <PostInList
                      position={index}
                      key={index}
                      post={post}
                      history={history}
                    />
                  )}
              </div>
            </div>}

        <div className="has-top-margin">
          <AddPostButton />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    sortMethod: state.sortMethod,
    loadingPosts: state.postsAreLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSortMethod: newSortMethod => {
      dispatch(updateSortMethod(newSortMethod))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
