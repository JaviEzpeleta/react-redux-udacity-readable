import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'
import AnimatedWrapper from './../utils/AnimatedWrapper';
import AddComment from './AddComment'
import Comment from './Comment'

class Post extends Component {

	render() {

    const {post, comments} = this.props

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
                <span>delete</span>
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
			</div>
		)
	}
}

export default AnimatedWrapper(Post, 4, 50)

