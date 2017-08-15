import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddPostButton extends Component {
	render() {
		return (
          <Link className="button is-primary" to="/new">
            <span className="icon"><i className="fa fa-plus"></i></span>
            &nbsp; Add new post
          </Link>
		)
	}
}

export default AddPostButton
