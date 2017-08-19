import React, { Component } from 'react'
import Home from './Home'
import Category from './Category'
import PostView from './PostView'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCategories, setPosts } from './../actions'
import * as ReadableAPI from './../utils/readableAPI'
import { withRouter } from 'react-router'
import { objectToArray } from '../utils/utils'
import NewPost from './NewPost'
import EditPost from './EditPost'
import Notifications, {notify} from 'react-notify-toast';

class App extends Component {

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
  }

  componentWillReceiveProps() {
    const { toastMessage } = this.props
    if (this.props.toastMessage !== '') {
      let myColor = { background: '#0E1717', text: "#FFFFFF" };
      notify.show(toastMessage, "custom", 2000, myColor);
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
              posts={posts} />
          )}/>

          <Route path='/category/:url' render={ ({ match }) => (
            <Category
              categoryPath={match.params.url}
              categories={categories}
              posts={posts} />
          )}/>

          <Route path='/edit/:query' render={({ match }) => (
            <EditPost postId={match.params.query} history={history} />
          )}/>

          <Route path='/:category/:postId' render={ ({ match }) => (
            <PostView
              postId={match.params.postId}
              categoryUrl={match.params.category}
              categoryPath={match.params.url}
              history={history} />
          )}/>

          <Route path='/post/:query' render={({ match }) => (
            <PostView postId={match.params.query} history={history} />
          )}/>

          <Route exact path='/new' component={NewPost} />

        </Switch>

        <Notifications />

      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    categories: state.categories.categories,
    posts: objectToArray(state.posts).filter((post) => (post.deleted === false)),
    toastMessage: state.toastMessage
  }
}

function mapDispatchToProps (dispatch) {
  return {
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
