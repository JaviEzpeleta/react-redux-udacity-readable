import React, { Component } from 'react'
import { showDate } from '../utils/utils'
import AnimatedWrapper from './../utils/AnimatedWrapper';

class Comment extends Component {

	render() {

    const {comment} = this.props

		return (
      <div className="box">
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
		)
	}
}

export default AnimatedWrapper(Comment, 4)

