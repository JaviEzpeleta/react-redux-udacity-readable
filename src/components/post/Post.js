import React, { Component } from 'react'
import { showDate, capitalizeFirstLetter } from '../../utils/utils'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'
import AnimatedWrapper from './../../utils/AnimatedWrapper';
import AddComment from './../comment/AddComment'
import Comment from './../comment/Comment'
import { displayDeleteModal, setPostIdToDeleteModal } from './../../actions'
import { connect } from 'react-redux'
import PostDeleteModal from './PostDeleteModal'

class Post extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
  }

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
                <blockquote>
                  {post.body}
                </blockquote>
                <div className="has-bottom-margin">
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i> <strong>{post.author}</strong>
                  &nbsp; · &nbsp;
                  <i className="fa fa-clock-o" aria-hidden="true"></i> {showDate(post.timestamp)}
                  &nbsp; · &nbsp;
                  Category: <Link className="tag is-small is-primary is-outlined" to={'/category/' + post.category}>{capitalizeFirstLetter(post.category)}</Link>
                  &nbsp; · &nbsp;
                  <span className="notifcation is-danger is-outlined is-small button" onClick={() => {
                    console.log('clicked')
                    setPostIdToDeleteModal(post.id)
                    displayDeleteModal(true)
                  }}>delete</span>
                  &nbsp;
                  <Link
                      to={'/edit/'+post.id}
                      className="notifcation is-info is-outlined is-small button">
                    edit
                  </Link>
                </div>
                { comments && (comments.length > 0) &&
                  <div>
                    {(comments.length > 1) ?
                      <h3>{comments.length} comments:</h3>
                    :
                      <h3>{comments.length} comment:</h3>
                    }
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
