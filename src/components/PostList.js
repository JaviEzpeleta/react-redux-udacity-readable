import React, { Component } from 'react'
import PostInList from './PostInList'
import { connect } from 'react-redux'
import { updateSortMethod } from '../actions'
import { sortByDate, sortByScore } from '../utils/utils'
import AddPostButton from './AddPostButton'

class PostList extends Component {

	render() {

    const { posts, sortMethod, updateSortMethod } = this.props

    if (sortMethod === 'date') {
      posts.sort(sortByDate);
    } else {
      posts.sort(sortByScore);
    }

    let sectionTitle = ''
    if (posts.length > 1) sectionTitle = posts.length + ' posts'
    else if (posts.length === 1) sectionTitle = '1 post'
    else sectionTitle = 'No posts yet'

    return (
      <div className="container has-top-margin">

        <div className="select right">
          <select value={sortMethod}
            onChange={ (event) => { updateSortMethod(event.target.value) } }>
            <option value="score">Top Score</option>
            <option value="date">Most recent</option>
          </select>
        </div>

        <h3 className="title is-3 is-spaced">
          {sectionTitle}
        </h3>

        <div>
          { posts && posts.length && posts.map( (post, index) =>
            <PostInList key={index} post={post} />
          ) }
        </div>

        <div className="has-top-margin">
          <AddPostButton />
        </div>

      </div>
    )
	}
}

function mapStateToProps(state, props) {
  return {
    sortMethod: state.sortMethod
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSortMethod: (newSortMethod) => {
      dispatch(updateSortMethod(newSortMethod))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
