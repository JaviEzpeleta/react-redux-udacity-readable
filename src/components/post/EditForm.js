import React, { Component } from 'react';
import { connect } from 'react-redux';
import { controlEditPostForm, editPost, setToastMessage } from '../../actions'
import { editPostById } from './../../utils/readableAPI'
import AnimatedWrapper from './../../utils/AnimatedWrapper';

class EditForm extends Component {

  componentDidMount() {
    const { post, controlEditPostForm } = this.props
    controlEditPostForm('id', post.id)
    controlEditPostForm('title', post.title)
    controlEditPostForm('timestamp', post.timestamp)
    controlEditPostForm('body', post.body)
    controlEditPostForm('author', post.author)
    controlEditPostForm('category', post.category)
    controlEditPostForm('showNotification', false)
  }

  handleChange = (event) => {
    this.props.controlEditPostForm(event.target.name, event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.fieldsAreValid()) {
      this.props.editPost(this.props.editPostForm)
    } else {
      this.props.controlEditPostForm('showNotification', true)
    }
    event.preventDefault()
  }

  fieldsAreValid = () => {
    const form = this.props.editPostForm
    if (form.title && form.title !== ''
      && form.category && form.category !== ''
      && form.author && form.author !== ''
      && form.body && form.body !== ''
      && form.category !== 0
      ) return true;
    return false;
  }

	render() {

    const {post, categories, editPostForm } = this.props

		return (
      <div className="container has-top-margin has-bottom-margin">
        <div className="title">
          Edit this post: <i>{post.title}</i>
        </div>

        <div className="columns">
          <div className="column is-half">

            <form onSubmit={this.handleSubmit}>

              <div className="field">
                <label className="label">Post Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="title"
                    defaultValue={post.title}
                    onChange={(event) => this.handleChange(event)}
                    placeholder="Title"/>
                </div>
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    name="author"
                    onChange={(event) => this.handleChange(event)}
                    placeholder="your username"
                    defaultValue={post.author}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <p className="usernameMessageError help is-success is-hidden">This username is not valid</p>
              </div>

              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <div className="select">
                    <select
                      name="category"
                      defaultValue={post.category}
                      onChange={(event) => this.handleChange(event)}>
                      <option value="0">Select category</option>
                      { categories && categories.map((category, index) =>
                        <option
                          key={index}
                          value={category.path}>
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
                    onChange={(event) => this.handleChange(event)}
                    className="textarea"
                    defaultValue={post.body}
                    placeholder="Your message"></textarea>
                </div>
              </div>

              { editPostForm.showNotification &&
                <div className="container notification is-danger">
                  <button className="delete" onClick={() => controlEditPostForm('showNotification', false)}></button>
                  <strong>Oops. Something is not right.</strong><br />
                  Please fill all the fields in this form, and select a category.
                </div>
              }

              <div className="field is-grouped">
                <div className="control">
                  <button type="submit" className="button is-primary">
                    <span className="icon"><i className="fa fa-paper-plane"></i></span>
                    &nbsp; &nbsp;
                    Submit
                  </button>
                </div>
                <div className="control">
                  <a onClick={() => window.history.back()} className="button is-link">Cancel</a>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>

		)

	}

}

function mapStateToProps(state) {
  return {
    editPostForm: state.editPostForm
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    controlEditPostForm: (name, value) =>
      dispatch(controlEditPostForm(name, value)),
    editPost: (formValues) => {
      editPostById(formValues.id, formValues).then(() => {
        dispatch(editPost(formValues))
        dispatch(setToastMessage('Post Saved!!'))
        ownProps.history.push('/'+formValues.category+'/'+formValues.id);
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedWrapper(EditForm))
