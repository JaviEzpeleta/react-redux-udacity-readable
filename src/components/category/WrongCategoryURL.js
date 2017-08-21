import React from 'react'
import AnimatedWrapper from './../../utils/AnimatedWrapper';

const WrongCategoryURL = (props) => (

  <section className="hero is-danger">
    <div className="hero-body">
      <div className="container">
  			<div className="container">
          <div className="title is-spaced">
            <i className="fa fa-exclamation-triangle"></i>
            [Error] : Bad URL
          </div>
          <div className="subtitle">
          	«{props.categoryUrl}» is an incorrect category
          	<br />
          	Please review the URL.
          </div>
        </div>
      </div>
    </div>
  </section>

)

export default AnimatedWrapper(WrongCategoryURL, 4, 50)
