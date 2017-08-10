import React, { Component } from 'react'

class HomeCategories extends Component {
	render() {
		return (
        <div className="container">

          <h3 className="title is-2">
            <span className="icon is-medium">
              <i className="fa fa-list"></i>
            </span>
            Caterories
          </h3>

          <div className="container">

            <div className="columns">
              <div className="column">
                <p className="notification is-info">First column</p>
              </div>
              <div className="column">
                <p className="notification is-success">Second column</p>
              </div>
              <div className="column">
                <p className="notification is-warning">Third column</p>
              </div>
              <div className="column">
                <p className="notification is-danger">Fourth column</p>
              </div>
            </div>
          </div>

        </div>

		)
	}
}

export default HomeCategories
