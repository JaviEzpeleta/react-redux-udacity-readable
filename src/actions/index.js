export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'
export const SET_POST = 'SET_POST'
export const SET_POST_COMMENTS = 'SET_POST_COMMENTS'
export const APPLY_VOTE = 'APPLY_VOTE'


export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
export const SET_COMMENTS_TO_POST_ID = 'SET_COMMENTS_TO_POST_ID'

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

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}

export function setPostComments(postId, comments) {
  return {
    type: SET_COMMENTS_TO_POST_ID,
    postId,
    comments
  }
}

export function applyVote(postId, vote) {
  return {
    type: APPLY_VOTE,
    postId,
    vote
  }
}

export function addRecipe ({ day, recipe, meal }) {
  return {
    type: ADD_RECIPE,
    recipe,
    day,
    meal,
  }
}

export function removeFromCalendar ({ day, meal }) {
  return {
    type: REMOVE_FROM_CALENDAR,
    day,
    meal,
  }
}