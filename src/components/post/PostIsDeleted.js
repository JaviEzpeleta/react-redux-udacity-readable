import React from 'react'
import AnimatedWrapper from './../../utils/AnimatedWrapper'

const PostIsDeleted = () =>
  <section className="hero is-danger">
    <div className="hero-body">
      <div className="container">
        <div className="container">
          <div className="title">
            <i className="fa fa-exclamation-triangle" />
            [Error] This post has been deleted.
          </div>
        </div>
      </div>
    </div>
  </section>

export default AnimatedWrapper(PostIsDeleted, 4, 50)
