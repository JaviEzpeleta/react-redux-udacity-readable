import React from 'react'

const Footer = () =>
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          <strong>Readable</strong> by{' '}
          <a href="mailto:javierezpeleta@gmail.com">Javier Ezpeleta</a>.
          <br />
          A project for the React Nanodegree @<a href="htpps://udacity.com">
            Udacity
          </a>.
          <br />
          Madrid, August 2017.
          <br />
          <a className="icon" href="https://github.com/JaviEzpeleta">
            <i className="fa fa-github" />
          </a>
          <a className="icon" href="https://youtube.com/JavEzp">
            <i className="fa fa-youtube" />
          </a>
          <a className="icon" href="https://twitter.com/ezpe">
            <i className="fa fa-twitter" />
          </a>
        </p>
      </div>
    </div>
  </footer>

export default Footer
