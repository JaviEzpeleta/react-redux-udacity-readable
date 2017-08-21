import {
  SET_CATEGORIES
} from '../actions'

export const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES :
      const { categories } = action
      return categories
    default :
      return state
  }
}