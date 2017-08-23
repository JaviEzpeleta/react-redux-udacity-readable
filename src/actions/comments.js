export const CONTROL_EDIT_COMMENT_FORM = 'CONTROL_EDIT_COMMENT_FORM'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const SET_COMMENTS_TO_POST_ID = 'SET_COMMENTS_TO_POST_ID'
export const ADD_COMMENT = 'ADD_COMMENT'
export const CONTROL_NEW_COMMENT = 'CONTROL_NEW_COMMENT'
export const APPLY_VOTE_TO_COMMENT = 'APPLY_VOTE_TO_COMMENT'
export const UPDATE_COMMENTS_SORT_METHOD = 'UPDATE_COMMENTS_SORT_METHOD'

export function setPostComments(postId, comments) {
  return {
    type: SET_COMMENTS_TO_POST_ID,
    postId,
    comments
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

export function controlEditCommentForm(name, value) {
  return {
    type: CONTROL_EDIT_COMMENT_FORM,
    name,
    value
  }
}

export function updateComment(id, parentId, body, author) {
  return {
    type: UPDATE_COMMENT,
    parentId,
    id,
    body,
    author
  }
}

export const updateCommentsSortMethod = method => ({
  type: UPDATE_COMMENTS_SORT_METHOD,
  method
})
