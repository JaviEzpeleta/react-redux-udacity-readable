import React, { Component } from 'react'
import Home from './Home'
import Category from './Category'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>

        <Switch>

          <Route exact path='/' component={Home}/>

          <Route path='/category/:url' render={ ({ match }) => (
            <Category
              categoryPath={match.params.url} />
          )}/>

          <Route path='/post/:query' render={({ match }) => (
            <p> POST {match.params.query} </p>
          )}/>

        </Switch>


            { /*
            <SearchBooks
              updateLastQuery={updateLastQuery.bind(this)}
              changeSelectedBookshelf={changeSelectedBookshelf}
              shelfNames={shelfNames}
              lastQuery={lastQuery}
              books={books} />
            */ }


      </div>
    )
  }
}

export default App