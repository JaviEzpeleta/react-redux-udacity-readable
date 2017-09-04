import firebase from './../firebase'
import { objectToArray } from './utils'

const workOnLocalhost = true

let api = ''
if (workOnLocalhost) api = 'http://localhost:5001'

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
export const updateFirebaseCommentById = (id, data) => {
  return firebase
    .database()
    .ref('comments')
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

export const getAllCategoriesOfflineFirst = () => {
  if (localStorage.categories) return localStorage.categories
  return getAllCategories()
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

export const getCommentsByPostId = workOnLocalhost
  ? postId =>
      fetch(`${api}/posts/${postId}/comments`, { headers }).then(res =>
        res.json()
      )
  : postId =>
      firebase
        .database()
        .ref('comments')
        .orderByChild('parentId')
        .equalTo(postId)
        .once('value')
        .then(snapshot => objectToArray(snapshot.val()))

export const getPostById = postId =>
  fetch(`${api}/posts/${postId}`, { headers }).then(res => res.json())

export const voteComment = workOnLocalhost
  ? (commentId, value) => {
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
  : (commentId, value) =>
      firebase
        .database()
        .ref('comments/' + commentId + '/voteScore')
        .once('value')
        .then(snapshot => {
          let commentScore = snapshot.val()
          let newValue = +commentScore + +value
          updateFirebaseCommentById(commentId, { voteScore: newValue })
          return getCommentById(commentId)
        })

export const hardCoded = data => {
  firebase.database().ref('posts').push(data)
}

export const addNewComment = workOnLocalhost
  ? (postId, comment) => {
      const body = {
        body: comment.newComment,
        voteScore: 1,
        id: comment.id,
        parentId: postId,
        author: comment.commentAuthor,
        timestamp: comment.timestamp,
        deleted: false
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
  : (postId, comment) => {
      const body = {
        body: comment.newComment,
        voteScore: 1,
        id: comment.id,
        parentId: postId,
        author: comment.commentAuthor,
        timestamp: comment.timestamp,
        deleted: false
      }
      return firebase
        .database()
        .ref('comments')
        .push(body)
        .then(element =>
          updateFirebaseCommentById(element.getKey(), { id: element.getKey() })
        )
    }

export const addPost = workOnLocalhost
  ? formValues => {
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
  : formValues => {
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
      return firebase
        .database()
        .ref('posts')
        .push(body)
        .then(element =>
          updatePostById(element.getKey(), { id: element.getKey() })
        )
    }

export const updateCommentById = workOnLocalhost
  ? (commentId, body, author) => {
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
  : (commentId, body, author) => {
      updateFirebaseCommentById(commentId, { body })
      updateFirebaseCommentById(commentId, { author })
      return getCommentById(commentId)
    }

const getCommentById = id =>
  firebase
    .database()
    .ref('comments/' + id)
    .once('value')
    .then(snapshot => snapshot.val())

export const editPostById = workOnLocalhost
  ? (postId, formValues) => {
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
  : (postId, formValues) => {
      const body = {
        title: formValues.title,
        category: formValues.category,
        author: formValues.author,
        body: formValues.body
      }
      return updatePostById(postId, body)
    }

export const deletePostById = workOnLocalhost
  ? postId =>
      fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: headers
      }).then(res => res)
  : postId => updatePostById(postId, { deleted: true })

export const deleteCommentById = workOnLocalhost
  ? commentId =>
      fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers: headers
      }).then(res => res)
  : commentId => {
      updateFirebaseCommentById(commentId, { deleted: 'true' })
      return getCommentById(commentId)
    }
