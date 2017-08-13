import { combineReducers } from 'redux'

import {
  SET_CATEGORIES,
  SET_POSTS,
  SET_COMMENTS_TO_POST_ID,
  APPLY_VOTE
} from '../actions'

function categories (state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES :
      const { categories } = action
      return {
        ...state,
        categories,
      }
    default :
      return state
  }
}

function comments (state = {}, action) {
  switch (action.type) {
    case SET_COMMENTS_TO_POST_ID :
      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments
      }
    default :
      return state
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case SET_POSTS :
      const { posts } = action
      let stateWithPosts = []
      posts.forEach( (post) => {
        stateWithPosts = {
          ...stateWithPosts,
          [post.id]: post
        }
      })
      return stateWithPosts
    case APPLY_VOTE :
      const { postId, vote } = action

      let newState = state
      Object.keys(newState).forEach((key) => {
        if (newState[key].id === postId) {
          newState[key].voteScore += vote
        }
      })
      let stateToReturn = newState
      return stateToReturn;

    default :
      return state
  }
}

export default combineReducers({
  categories, posts, comments
})