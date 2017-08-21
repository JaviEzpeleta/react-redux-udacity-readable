import React, { Component } from 'react'
import Home from './Home'
import Category from './category/Category'
import PostView from './post/PostView'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCategories, setPosts, setToastMessage } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import { withRouter } from 'react-router'
import { objectToArray } from '../utils/utils'
import NewPost from './post/NewPost'
import EditPost from './post/EditPost'
import Notifications, {notify} from 'react-notify-toast';

class App extends Component {

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
  }

  componentWillReceiveProps() {
    const { toastMessage, setToastMessage } = this.props
    if (toastMessage !== '') {
      notify.show(toastMessage);
      setToastMessage('')
    }
  }

  render() {

    const { history, categories, posts } = this.props

    return (
      <div>

        <Switch>

          <Route exact path='/' render={ ({ match }) => (
            <Home
              categories={categories}
              posts={posts}
              history={history} />
          )}/>

          <Route path='/category/:url' render={ ({ match }) => (
            <Category
              categoryPath={match.params.url}
              posts={posts}
              history={history} />
          )}/>

          <Route path='/edit/:query' render={({ match }) => (
            <EditPost postId={match.params.query} history={history} />
          )}/>

          <Route path='/:category/:postId' render={ ({ match }) => (
            <PostView
              postId={match.params.postId}
              categoryUrl={match.params.category}
              history={history} />
          )}/>

          <Route path='/post/:query' render={({ match }) => (
            <PostView postId={match.params.query} history={history} />
          )}/>

          <Route exact path='/new' component={NewPost} />

        </Switch>

        <Notifications options={{timeout: 2000}}/>

      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    categories: state.categories,
    posts: objectToArray(state.posts).filter((post) => (post.deleted === false)),
    toastMessage: state.toastMessage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setToastMessage: (message) => dispatch(setToastMessage(message)),
    getAllCategories: () =>
      ReadableAPI.getAllCategories().then( (categories) => {
        dispatch(setCategories(categories))
      }
    ),
    getAllPosts: () =>
      ReadableAPI.getAllPosts().then( (posts) => {
        dispatch(setPosts(posts))
      }
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
