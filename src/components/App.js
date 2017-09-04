import React, { Component } from 'react'
import Home from './Home'
import Category from './category/Category'
import PostView from './post/PostView'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  setCategories,
  setPosts,
  setToastMessage,
  categoriesAreLoading,
  postsAreLoading
} from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import * as LocalStorageAPI from './../utils/localStorageAPI'
import { backgroundSync } from './../utils/backgroundSync'
import { withRouter } from 'react-router'
import { objectToArray } from '../utils/utils'
import NewPost from './post/NewPost'
import EditPost from './post/EditPost'
import Notifications, { notify } from 'react-notify-toast'
import NotFound from './NotFound'

class App extends Component {
  componentWillMount() {
    this.props.getAllCategories()
    this.props.getAllPosts()
    backgroundSync()
  }

  componentWillReceiveProps() {
    const { toastMessage, setToastMessage } = this.props
    if (toastMessage !== '') {
      notify.show(toastMessage)
      setToastMessage('')
    }
  }

  render() {
    const { history, categories, posts, loadingCategories } = this.props

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={({ match }) =>
              <Home
                categories={categories}
                posts={posts}
                history={history}
                loadingCategories={loadingCategories}
              />}
          />

          <Route
            path="/category/:url"
            render={({ match }) =>
              <Category
                categories={categories}
                categoryPath={match.params.url}
                posts={posts}
                history={history}
              />}
          />

          <Route
            path="/edit/:query"
            render={({ match }) =>
              <EditPost postId={match.params.query} history={history} />}
          />

          <Route
            path="/:category/:postId"
            render={({ match }) =>
              <PostView
                postId={match.params.postId}
                categoryUrl={match.params.category}
                history={history}
              />}
          />

          <Route
            path="/post/:query"
            render={({ match }) =>
              <PostView postId={match.params.query} history={history} />}
          />

          <Route exact path="/new" component={NewPost} />

          <Route path="*" component={NotFound} />
        </Switch>

        <Notifications options={{ timeout: 2200 }} />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    categories: state.categories,
    posts: objectToArray(state.posts).filter(post => post.deleted === false),
    toastMessage: state.toastMessage,
    loadingCategories: state.categoriesAreLoading,
    loadingPosts: state.loadingPosts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setToastMessage: message => dispatch(setToastMessage(message)),
    getAllCategories: () => {
      dispatch(categoriesAreLoading(true))
      let categories = LocalStorageAPI.getCategories()
      if (categories) {
        console.log('I have the categories at localStorageAPI')
        dispatch(setCategories(objectToArray(categories)))
        dispatch(categoriesAreLoading(false))
      }
      ReadableAPI.getAllCategories()
        .then(categories => {
          LocalStorageAPI.setCategories(categories)
          dispatch(setCategories(objectToArray(categories)))
          dispatch(categoriesAreLoading(false))
        })
        .catch(function() {
          LocalStorageAPI.addPendingAction({ function: 'getAllCategories' })
          console.log('connection failed, getting the categories')
        })
    },
    getAllPosts: () => {
      dispatch(postsAreLoading(true))
      let posts = LocalStorageAPI.getPosts()
      if (posts) {
        console.log('I have the posts at localStorageAPI')
        dispatch(setPosts(posts))
        dispatch(postsAreLoading(false))
      }
      ReadableAPI.getAllPosts()
        .then(posts => {
          LocalStorageAPI.setPosts(posts)
          dispatch(setPosts(posts))
          dispatch(postsAreLoading(false))
        })
        .catch(function() {
          LocalStorageAPI.addPendingAction({ function: 'getAllPosts' })
          console.log('connection failed, getting the posts')
        })
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
