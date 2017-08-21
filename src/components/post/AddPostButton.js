import React from 'react'
import { Link } from 'react-router-dom'

const AddPostButton = () => (
  <Link className="button is-primary" to="/new">
    <span className="icon"><i className="fa fa-plus"></i></span>
    &nbsp; Add new post
  </Link>
)

export default AddPostButton
