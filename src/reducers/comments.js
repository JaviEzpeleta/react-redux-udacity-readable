import {
  SET_COMMENTS_TO_POST_ID,
  CONTROL_NEW_COMMENT,
  ADD_COMMENT,
  APPLY_VOTE_TO_COMMENT,
  CONTROL_EDIT_COMMENT_FORM,
  UPDATE_COMMENT,
  UPDATE_COMMENTS_SORT_METHOD
} from '../actions'

export const comments = (state = {}, action) => {
  switch (action.type) {
    case SET_COMMENTS_TO_POST_ID:
      const { postId, comments } = action
      return {
        ...state,
        [postId]: comments
      }

    case APPLY_VOTE_TO_COMMENT:
      const { commentId, newValue } = action
      let newState = state
      newState[action.parentId].map(comment => {
        if (comment.id === commentId) comment.voteScore = newValue
        return comment
      })
      return newState

    case ADD_COMMENT:
      const { comment } = action
      const parentId = action.postId

      const newComment = {
        author: comment.commentAuthor,
        body: comment.newComment,
        deleted: false,
        id: comment.id,
        parentDeleted: false,
        parentId: parentId,
        timestamp: comment.timestamp,
        voteScore: 1
      }

      return {
        ...state,
        [parentId]: state[parentId].concat(newComment)
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.parentId]: state[action.parentId].map(
          content =>
            content.id === action.id
              ? { ...content, body: action.body, author: action.author }
              : content
        )
      }

    default:
      return state
  }
}

export const newCommentData = (state = {}, action) => {
  switch (action.type) {
    case CONTROL_NEW_COMMENT:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default:
      return state
  }
}

export const editCommentForm = (state = { id: 0 }, action) => {
  switch (action.type) {
    case CONTROL_EDIT_COMMENT_FORM:
      const { name, value } = action
      return {
        ...state,
        [name]: value
      }
    default:
      return state
  }
}

export const commentsSortMethod = (state = 'score', action) => {
  switch (action.type) {
    case UPDATE_COMMENTS_SORT_METHOD:
      return action.method
    default:
      return state
  }
}
