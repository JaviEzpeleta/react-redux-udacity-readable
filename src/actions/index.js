export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'
export const APPLY_VOTE = 'APPLY_VOTE'
export const SET_COMMENTS_TO_POST_ID = 'SET_COMMENTS_TO_POST_ID'
export const UPDATE_SORT_METHOD = 'UPDATE_SORT_METHOD'
export const CONTROL_NEW_POST_FORM = 'CONTROL_NEW_POST_FORM'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DISPLAY_DELETE_MODAL = 'DISPLAY_DELETE_MODAL'
export const SET_POST_ID_TO_DELETE_MODAL = 'SET_POST_ID_TO_DELETE_MODAL'
export const DELETE_POST = 'DELETE_POST'
export const CONTROL_EDIT_POST_FORM = 'CONTROL_EDIT_POST_FORM'
export const EDIT_POST = 'EDIT_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const CONTROL_NEW_COMMENT = 'CONTROL_NEW_COMMENT'
export const APPLY_VOTE_TO_COMMENT = 'APPLY_VOTE_TO_COMMENT'
export const SHOW_TOAST = 'SHOW_TOAST'

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}
export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  }
}

export function setPostComments(postId, comments) {
  return {
    type: SET_COMMENTS_TO_POST_ID,
    postId,
    comments
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

export function setPostIdToDeleteModal(postId) {
  return {
    type: SET_POST_ID_TO_DELETE_MODAL,
    postId
  }
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function addNewCommentAction(postId, comment) {
  return {
    type: ADD_COMMENT,
    postId,
    comment
  }
}

export function controlNewCommentData(name, value) {
  return {
    type: CONTROL_NEW_COMMENT,
    name,
    value
  }
}

export function applyVoteToComment(commentId, parentId, newValue) {
  return {
    type: APPLY_VOTE_TO_COMMENT,
    commentId,
    parentId,
    newValue
  }
}

export function setToastMessage(message) {
  return {
    type: SHOW_TOAST,
    message
  }
}
