import { combineReducers } from 'redux'

import {
  SET_CATEGORIES,
  SET_POSTS,
  SET_COMMENTS_TO_POST_ID,
  APPLY_VOTE,
  UPDATE_SORT_METHOD,
  CONTROL_NEW_POST_FORM,
  ADD_NEW_POST
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
      const { postId, newValue } = action

      return {
        ...state,
        [postId]: {
          ...state[postId],
          voteScore: newValue
        }
      }
    case ADD_NEW_POST:
      const { title, username, message, category, id, timestamp } = action

      return {
        ...state,
        theNewPost: {
          author: username,
          body: message,
          category,
          deleted: false,
          id,
          timestamp,
          title,
          voteScore: 1
        }
      }
    default :
      return state
  }
}

function sortMethod(state = 'score', action) {
  switch (action.type) {
    case UPDATE_SORT_METHOD:
      return action.method
    default :
      return state
  }
}

function newPostForm(state = {}, action) {
  switch (action.type) {
    case CONTROL_NEW_POST_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default :
      return state
  }
}

export default combineReducers({
  categories, posts, comments, sortMethod, newPostForm
})