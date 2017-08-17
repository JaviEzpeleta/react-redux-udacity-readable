import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'
import AnimatedWrapper from './../utils/AnimatedWrapper';

class Post extends Component {

	render() {

    const {post, comments} = this.props

		return (
			<div>
        { post &&
          <div className="container content has-top-margin" style={{marginBottom: '50px'}}>

            <div className="columns is-mobile">
              <div className="column" style={{maxWidth: '115px'}}>
                <VoteScore voteScore={post.voteScore} postId={post.id}/>
              </div>
              <div className="column">
                <h1>
                  {post.title}
                </h1>
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
                      <div className="box" key={index}>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <strong>{comment.author}</strong> <small>{showDate(comment.timestamp)}</small>
                                <br />
                                {comment.body}
                              </p>
                            </div>
                            <nav className="level is-mobile">
                              <div className="level-left">
                                <a className="level-item">
                                  <span className="icon is-small"><i className="fa fa-edit"></i></span>
                                </a>
                                <a className="level-item">
                                  <span className="icon is-small"><i className="fa fa-trash-o"></i></span>
                                </a>
                              </div>
                            </nav>
                          </div>
                      </div>
                    )}
                  </div>
                }

              </div>

            </div>

          </div>
        }
			</div>
		)
	}
}

export default AnimatedWrapper(Post, 4, 50)

