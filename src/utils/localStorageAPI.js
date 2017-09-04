export const setCategories = categories => {
  console.log('setting the categories...')
  console.log(categories)
  localStorage.setItem('categories', JSON.stringify(categories))
}

export const getCategories = () => {
  if (localStorage.categories) {
    return JSON.parse(localStorage.getItem('categories'))
  }
  return null
}

export const setPosts = posts => {
  console.log('setting the posts...')
  console.log(posts)
  localStorage.setItem('posts', JSON.stringify(posts))
}

export const getPosts = () => {
  if (localStorage.posts) {
    return JSON.parse(localStorage.getItem('posts'))
  }
  return null
}

export const setCommentsByPostId = (postId, comments) => {
  console.log('setting the comments...')
  console.log(comments)
  localStorage.setItem('commentsByPost-' + postId, JSON.stringify(comments))
}

export const getCommentsByPostId = postId => {
  return JSON.parse(localStorage.getItem('commentsByPost-' + postId))
}
