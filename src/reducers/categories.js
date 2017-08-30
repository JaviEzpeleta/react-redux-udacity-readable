import { SET_CATEGORIES, CATEGORIES_ARE_LOADING } from '../actions'

export const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action
      return categories
    default:
      return state
  }
}

export const categoriesAreLoading = (state = false, action) => {
  switch (action.type) {
    case CATEGORIES_ARE_LOADING:
      return action.value
    default:
      return state
  }
}
