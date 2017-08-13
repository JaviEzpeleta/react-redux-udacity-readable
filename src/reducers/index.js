import { combineReducers } from 'redux'

import {
  SET_CATEGORIES,
  SET_POSTS,
  SET_POST,
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
      return {
        ...state,
        posts,
      }
    case SET_POST :
      const { post } = action
      return {
        ...state,
        [post.id]: post,
      }
    case APPLY_VOTE :
      const { postId, vote } = action
      console.log('⚡️ RECEIVED: ' + postId + ' :: ' + vote)
      console.log(state)
      let newState = state
      console.log('debugging newState')
      console.log(newState)
      newState.posts.forEach((val) => {
        if (val.id === postId) {
          val.voteScore += vote
        }
        console.log('inside THE forEach')
        console.log(val)
      })
      /*
      newState.map((val) =>{
        console.log('inside THE forEach')
        console.log(val)
      })
      */
      return { ...state,
        posts: newState.posts }
    default :
      return state
  }
}
/*
function food (state = {}, action) {
  switch (action.type) {
    case ADD_RECIPE :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    default :
      return state
  }
}

const initialCalendarState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}

function calendar (state = initialCalendarState, action) {
  const { day, recipe, meal } = action

  switch (action.type) {
    case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }
    case REMOVE_FROM_CALENDAR :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}
*/
export default combineReducers({
  categories, posts, comments
})