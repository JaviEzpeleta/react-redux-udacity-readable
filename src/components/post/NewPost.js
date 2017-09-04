import React, { Component } from 'react'
import Header from './../Header'
import Footer from './../Footer'
import { connect } from 'react-redux'
import { controlNewPostForm, addNewPost, setToastMessage } from '../../actions'
import faker from 'faker'
import { addPost, getAllPosts } from './../../utils/readableAPI'

class NewPost extends Component {
  componentWillMount() {
    window.scrollTo(0, 0)
    this.props.controlNewPostForm('showNotification', false)
    this.props.controlNewPostForm('title', '')
    this.props.controlNewPostForm('category', '')
    this.props.controlNewPostForm('username', '')
    this.props.controlNewPostForm('message', '')
    this.props.controlNewPostForm('category', 0)
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.fieldsAreValid()) {
      this.props.newPostForm.id = faker.random.uuid()
      this.props.newPostForm.timestamp = Date.now()
      this.props.addNewPost(this.props.newPostForm)
    } else {
      this.props.controlNewPostForm('showNotification', true)
    }
    event.preventDefault()
  }

  fieldsAreValid = () => {
    const form = this.props.newPostForm
    if (
      form.title &&
      form.title !== '' &&
      form.category &&
      form.category !== '' &&
      form.username &&
      form.username !== '' &&
      form.message &&
      form.message !== '' &&
      form.category !== 0
    )
      return true
    return false
  }

  handleChange = event => {
    this.props.controlNewPostForm(event.target.name, event.target.value)
  }

  render() {
    const { categories, newPostForm, controlNewPostForm } = this.props

    return (
      <div>
        <Header />

        <div className="container has-top-margin has-bottom-margin">
          {!navigator.onLine &&
            <div className="container notification is-info">
              <div className="subtitle">
                <span role="img" aria-label="sad face">
                  🙁
                </span>
                &nbsp; You are offline now
              </div>
              Unfortunately, you need to have connection to publish a new post.
              <br />
              Please come back when you have internet connection.
              <br />
              <br />
              <i>While you are offline, you can still vote and add comments.</i>
            </div>}
          <div className="columns">
            <div className="column is-half">
              <form onSubmit={this.handleSubmit}>
                <div className="title">Add a new Post</div>

                <div className="field">
                  <label className="label">Post Title</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="title"
                      onChange={event => this.handleChange(event)}
                      placeholder="Title"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input {/*is-success*/}"
                      type="text"
                      name="username"
                      onChange={event => this.handleChange(event)}
                      placeholder="your username"
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <p className="usernameMessageError help is-success is-hidden">
                    This username is not valid
                  </p>
                </div>

                <div className="field">
                  <label className="label">Category</label>
                  <div className="control">
                    <div className="select">
                      <select
                        name="category"
                        onChange={event => this.handleChange(event)}
                      >
                        <option value="0">Select category</option>
                        {categories &&
                          categories.map((category, index) =>
                            <option key={index} value={category.path}>
                              {category.name}
                            </option>
                          )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea
                      name="message"
                      onChange={event => this.handleChange(event)}
                      className="textarea"
                      placeholder="Your message"
                    />
                  </div>
                </div>

                {newPostForm.showNotification &&
                  <div className="container notification is-danger">
                    <button
                      className="delete"
                      onClick={() =>
                        controlNewPostForm('showNotification', false)}
                    />
                    <strong>Oops. Something is not right.</strong>
                    <br />
                    Please fill all the fields in this form, and select a
                    category.
                  </div>}

                <div className="field is-grouped">
                  <div className="control">
                    <button type="submit" className="button is-primary">
                      <span className="icon">
                        <i className="fa fa-paper-plane" />
                      </span>
                      &nbsp; &nbsp; Submit
                    </button>
                  </div>
                  <div className="control">
                    <a
                      onClick={() => window.history.back()}
                      className="button is-link"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    newPostForm: state.newPostForm
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    controlNewPostForm: (name, value) =>
      dispatch(controlNewPostForm(name, value)),
    addNewPost: formValues => {
      addPost(formValues)
        .then(() => {
          dispatch(addNewPost(formValues))
          getAllPosts().then(posts => {
            dispatch(setToastMessage('✅ New Post Added!'))
            ownProps.history.push('/')
          })
        })
        .catch(() => {
          dispatch(
            setToastMessage(
              "🙁 You're offline now. Please come back when you have internet connection"
            )
          )
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
