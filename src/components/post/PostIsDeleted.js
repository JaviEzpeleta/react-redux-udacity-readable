import React, { Component } from 'react'
import AnimatedWrapper from './../../utils/AnimatedWrapper';

class PostIsDeleted extends Component {

	render() {
		return (

      <section className="hero is-danger">
        <div className="hero-body">
          <div className="container">
      			<div className="container">
              <div className="title">
                <i className="fa fa-exclamation-triangle"></i>
                [Error] This post has been deleted.
              </div>
            </div>
          </div>
        </div>
      </section>

		)
	}
}

export default AnimatedWrapper(PostIsDeleted, 4, 50)
