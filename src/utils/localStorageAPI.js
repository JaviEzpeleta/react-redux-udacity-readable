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
  if (localStorage.posts) return JSON.parse(localStorage.getItem('posts'))
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

export const getAllPendingActions = () => {
  return JSON.parse(localStorage.getItem('pendingActions'))
}

export const addPendingAction = action => {
  let pendingActions = getAllPendingActions()
  if (!pendingActions) pendingActions = []
  pendingActions.push(action)
  setPendingActions(pendingActions)
}

export const setPendingActions = pendingActions => {
  localStorage.setItem('pendingActions', JSON.stringify(pendingActions))
}

export const cleanAllPendingActions = () => {
  localStorage.setItem('pendingActions', null)
}

export const votePost = (postId, value) => {
  let posts = getPosts()
  posts.forEach(post => {
    if (post.id === postId) post.voteScore = value
  })
  setPosts(posts)
}

export const voteComment = (commentId, value, postId) => {
  let comments = getCommentsByPostId(postId)
  comments.forEach(comment => {
    if (comment.id === commentId) comment.voteScore = value
  })
  setCommentsByPostId(postId, comments)
}
