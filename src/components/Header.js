import React, { Component } from 'react'
import LogoImage from './../images/readable-logo.png'
import { Link } from 'react-router-dom'
import AddPostButton from './post/AddPostButton'
class Header extends Component {
  render() {
    return (
      <div className="readable-header">
        <div className="container ">
          <nav className="navbar ">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <img
                  src={LogoImage}
                  alt="Bulma: a modern CSS framework based on Flexbox"
                  width="112"
                  height="26"
                />
              </Link>
              <a
                className="navbar-item is-hidden-desktop"
                href="https://github.com/JaviEzpeleta"
              >
                <span className="icon">
                  <i className="fa fa-github" />
                </span>
              </a>

              <a
                className="navbar-item is-hidden-desktop"
                href="https://twitter.com/ezpe"
              >
                <span className="icon">
                  <i className="fa fa-twitter" />
                </span>
              </a>

              <div
                className="navbar-burger burger"
                data-target="navMenuDocumentation"
              >
                <span />
                <span />
                <span />
              </div>
            </div>

            <div id="navMenuDocumentation" className="navbar-menu">
              <div className="navbar-end">
                <a
                  className="navbar-item is-hidden-desktop-only"
                  href="https://github.com/JaviEzpeleta"
                >
                  Github
                </a>
                <a
                  className="navbar-item is-hidden-desktop-only"
                  href="https://twitter.com/ezpe"
                >
                  Twitter
                </a>
                <div className="navbar-item">
                  <div className="field is-grouped">
                    <p className="control">
                      <AddPostButton />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}
export default Header
