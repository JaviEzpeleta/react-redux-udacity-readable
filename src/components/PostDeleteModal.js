import React, { Component } from 'react'
import { connect } from 'react-redux'
import { displayDeleteModal, deletePost, setToastMessage } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import Modal from 'react-modal'
import AnimatedWrapper from './../utils/AnimatedWrapper';

class PostDeleteModal extends Component {

	render() {

    const {
      deletePostModal,
      displayDeleteModal,
      deletePost
    } = this.props

		return (
        <Modal
          isOpen={deletePostModal.isActive}
          onRequestClose={() => displayDeleteModal(false)}
          contentLabel="No Overlay Click Modal"
        >
          <div className="container">
            <h1 className="title">
              Are you sure?
            </h1>
            <p>
              Please confirm that you want to delete this post.
              <br />
              <i>(this action cannot be undone)</i>
            </p>
            <br />
            <div style={{marginRight:'12px'}}className="button" onClick={() => displayDeleteModal(false)}>Cancel</div>
            <div className="button is-outlined is-danger"
                onClick={() => {
                  deletePost(deletePostModal.postId)
                  displayDeleteModal(false)
                }} >
              Yes, I want to delete the post
            </div>
          </div>
        </Modal>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    deletePostModal: state.deletePostModal
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    displayDeleteModal: (bool) => {
      dispatch(displayDeleteModal(bool))
    },
    deletePost: (postIdToDelete) => {
      ReadableAPI.deletePostById(postIdToDelete).then(() => dispatch(deletePost(postIdToDelete)))
      dispatch(setToastMessage('Post Deleted!'))
      if (ownProps.redirectAfterDelete)
        ownProps.history.push('/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedWrapper(PostDeleteModal))
