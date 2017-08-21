import { combineReducers } from 'redux'

import {
  UPDATE_SORT_METHOD,
  SHOW_TOAST
} from '../actions'

import { categories } from './categories'
import { posts, newPostForm, deletePostModal, editPostForm } from './posts'
import { comments, newCommentData, editCommentForm } from './comments'

function sortMethod(state = 'score', action) {
  switch (action.type) {
    case UPDATE_SORT_METHOD:
      return action.method
    default :
      return state
  }
}

function toastMessage(state = '', action) {
  switch (action.type) {
    case SHOW_TOAST :
      const { message } = action
      return message
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  sortMethod,
  newPostForm,
  editPostForm,
  deletePostModal,
  newCommentData,
  toastMessage,
  editCommentForm
})