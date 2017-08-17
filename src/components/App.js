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

class App extends Component {

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
  }

  render() {

    return (
      <div>

        <Switch>

          <Route exact path='/' render={ ({ match }) => (
            <Home
              categories={this.props.categories}
              posts={this.props.posts} />
          )}/>

          <Route path='/category/:url' render={ ({ match }) => (
            <Category
              categoryPath={match.params.url}
              categories={this.props.categories}
              posts={this.props.posts} />
          )}/>

          <Route path='/post/:query' render={({ match }) => (
            <PostView postId={match.params.query} />
          )}/>

          <Route path='/edit/:query' render={({ match }) => (
            <EditPost postId={match.params.query} />
          )}/>

          <Route path='/new' component={NewPost} />
          )}/>

        </Switch>

      </div>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    categories: state.categories.categories,
    posts: objectToArray(state.posts),
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
