import React, { Component } from 'react'
import AnimatedWrapper from './../../utils/AnimatedWrapper';

class WrongCategoryURL extends Component {

	render() {
		return (

      <section className="hero is-danger">
        <div className="hero-body">
          <div className="container">
      			<div className="container">
              <div className="title is-spaced">
                <i className="fa fa-exclamation-triangle"></i>
                [Error] : Bad URL
              </div>
              <div className="subtitle">
				«{this.props.categoryUrl}» is an incorrect category
				<br />
              	Please review the URL.
              </div>
            </div>
          </div>
        </div>
      </section>

		)
	}
}

export default AnimatedWrapper(WrongCategoryURL, 4, 50)
