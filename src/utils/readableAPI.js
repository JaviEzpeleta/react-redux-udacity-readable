import firebase from './../firebase'
import { objectToArray } from './utils'

const workOnLocalhost = false

let api = ''
if (workOnLocalhost) {
  api = 'http://localhost:5001'
} else {
  api = 'https://evening-harbor-34965.herokuapp.com'
}

let token = localStorage.token

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: token
}

export const updatePostById = (id, data) => {
  return firebase
    .database()
    .ref('posts')
    .child(id)
    .update(data)
    .then(ref => ref.once('value'))
    .then(snapshot => snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }))
}

export const votePost = workOnLocalhost
  ? (postId, value) => {
      let option = ''
      option = value === 1 ? 'upVote' : 'downVote'

      return fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
      }).then(res => res)
    }
  : (postId, value) => {
      firebase
        .database()
        .ref('posts/' + postId + '/voteScore')
        .once('value')
        .then(snapshot => {
          let postScore = snapshot.val()
          let newValue = +postScore + +value
          return updatePostById(postId, { voteScore: newValue })
        })
    }

export const getAllCategories = workOnLocalhost
  ? () =>
      fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)
  : () =>
      firebase
        .database()
        .ref('categories')
        .once('value')
        .then(snapshot => snapshot.val())

export const getAllPosts = workOnLocalhost
  ? () => fetch(`${api}/posts`, { headers }).then(res => res.json())
  : () =>
      firebase
        .database()
        .ref('posts')
        .once('value')
        .then(snapshot => objectToArray(snapshot.val()))

export const getCommentsByPostId = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers }).then(res => res.json())

export const getPostById = postId =>
  fetch(`${api}/posts/${postId}`, { headers }).then(res => res.json())

export const voteComment = (commentId, value) => {
  let option = ''
  option = value === 1 ? 'upVote' : 'downVote'

  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res)
}

export const addPost = formValues => {
  const body = {
    id: formValues.id,
    title: formValues.title,
    category: formValues.category,
    author: formValues.username,
    body: formValues.message,
    timestamp: formValues.timestamp,
    voteScore: 1,
    deleted: false
  }

  return fetch(`${api}/posts/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const updateCommentById = (commentId, body, author) => {
  const commentBody = {
    body,
    author
  }

  return fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentBody)
  })
}
export const editPostById = (postId, formValues) => {
  const body = {
    title: formValues.title,
    category: formValues.category,
    author: formValues.author,
    body: formValues.body
  }

  return fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const deletePostById = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res)

export const deleteCommentById = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res)

export const addNewComment = (postId, comment) => {
  const body = {
    body: comment.newComment,
    voteScore: 1,
    id: comment.id,
    parentId: postId,
    author: comment.commentAuthor,
    timestamp: comment.timestamp
  }
  return fetch(`${api}/comments/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => {
    return res
  })
}
