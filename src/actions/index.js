export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'
export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'

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