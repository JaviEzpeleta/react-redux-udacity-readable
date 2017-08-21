import {
  SET_CATEGORIES
} from '../actions'

export const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES :
      const { categories } = action
      console.log('ITS ME!')
      console.log(categories)
      return categories
    default :
      return state
  }
}