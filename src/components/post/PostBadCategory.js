import React, { Component } from 'react'
import AnimatedWrapper from './../../utils/AnimatedWrapper';

class PostBadCategory extends Component {

	render() {
		return (

      <section className="hero is-danger">
        <div className="hero-body">
          <div className="container">
      			<div className="container">
              <div className="title">
                <i className="fa fa-exclamation-triangle"></i>
                [Error] : Bad URL («{this.props.categoryUrl}» is a wrong category)
              </div>
            </div>
          </div>
        </div>
      </section>

		)
	}
}

export default AnimatedWrapper(PostBadCategory, 4, 50)
