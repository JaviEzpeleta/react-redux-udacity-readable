export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'
export const APPLY_VOTE = 'APPLY_VOTE'
export const SET_COMMENTS_TO_POST_ID = 'SET_COMMENTS_TO_POST_ID'
export const UPDATE_SORT_METHOD = 'UPDATE_SORT_METHOD'

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
