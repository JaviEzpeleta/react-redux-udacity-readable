export const SET_POSTS = 'SET_POSTS'
export const APPLY_VOTE = 'APPLY_VOTE'
export const UPDATE_SORT_METHOD = 'UPDATE_SORT_METHOD'
export const CONTROL_NEW_POST_FORM = 'CONTROL_NEW_POST_FORM'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DISPLAY_DELETE_MODAL = 'DISPLAY_DELETE_MODAL'
export const SET_POST_ID_TO_DELETE_MODAL = 'SET_POST_ID_TO_DELETE_MODAL'
export const DELETE_POST = 'DELETE_POST'
export const CONTROL_EDIT_POST_FORM = 'CONTROL_EDIT_POST_FORM'
export const EDIT_POST = 'EDIT_POST'
export const POSTS_ARE_LOADING = 'POSTS_ARE_LOADING'

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  }
}

export function applyVote(postId, newValue) {
  return {
    type: APPLY_VOTE,
    postId,
    newValue
  }
}

export function updateSortMethod(method) {
  return {
    type: UPDATE_SORT_METHOD,
    method
  }
}

export function controlNewPostForm(name, value) {
  return {
    type: CONTROL_NEW_POST_FORM,
    name,
    value
  }
}

export function controlEditPostForm(name, value) {
  return {
    type: CONTROL_EDIT_POST_FORM,
    name,
    value
  }
}

export function addNewPost(formValues) {
  return {
    type: ADD_NEW_POST,
    title: formValues.title,
    category: formValues.category,
    username: formValues.username,
    message: formValues.message,
    id: formValues.id,
    timestamp: formValues.timestamp
  }
}

export function displayDeleteModal(bool) {
  return {
    type: DISPLAY_DELETE_MODAL,
    active: bool
  }
}

export const setPostIdToDeleteModal = postId => ({
  type: SET_POST_ID_TO_DELETE_MODAL,
  postId
})

export const deletePost = postId => ({
  type: DELETE_POST,
  postId
})

export const editPost = post => ({
  type: EDIT_POST,
  post
})

export const postsAreLoading = value => ({
  type: POSTS_ARE_LOADING,
  value
})
