import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'
import AnimatedWrapper from './../utils/AnimatedWrapper';
import AddComment from './AddComment'
import Comment from './Comment'
import { displayDeleteModal, setPostIdToDeleteModal } from './../actions'
import { connect } from 'react-redux'
import PostDeleteModal from './PostDeleteModal'

class Post extends Component {

	render() {

    const { post,
      comments,
      deletePostModal,
      displayDeleteModal,
      setPostIdToDeleteModal,
      history
    } = this.props

		return (
			<div>
        { post &&
          <div className="container content has-top-margin" style={{marginBottom: '50px'}}>

            <div className="columns is-mobile">
              <div className="column" style={{maxWidth: '115px'}}>
                <VoteScore voteScore={post.voteScore} post={post}/>
              </div>
              <div className="column">
                <h1>
                  {post.title}
                </h1>
                <span className="notifcation is-danger is-small button" onClick={() => {
                  console.log('clicked')
                  setPostIdToDeleteModal(post.id)
                  displayDeleteModal(true)
                }}>delete</span>
                &nbsp;
                ·
                <span>edit</span>
                <br />
                <br />
                <blockquote>
                  {post.body}
                </blockquote>

                posted by <strong>{post.author}</strong>,
                &nbsp;
                {showDate(post.timestamp)}
                <br />
                category: <Link to={'/category/' + post.category}>{post.category}</Link>

                { comments &&
                  <div>
                    {comments.map( (comment, index) =>
                      <Comment position={index} key={index} comment={comment} />
                    )}
                  </div>
                }

                <AddComment postId={post.id} />
              </div>

            </div>

          </div>
        }

        <PostDeleteModal
          deletePostModal={deletePostModal}
          history={history}
          redirectAfterDelete={true} />

			</div>
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
    setPostIdToDeleteModal: (postId) => {
      dispatch(setPostIdToDeleteModal(postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedWrapper(Post, 4, 50))
