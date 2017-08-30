export const SET_CATEGORIES = 'SET_CATEGORIES'
export const CATEGORIES_ARE_LOADING = 'CATEGORIES_ARE_LOADING'
export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export function categoriesAreLoading(value) {
  return {
    type: CATEGORIES_ARE_LOADING,
    value
  }
}
