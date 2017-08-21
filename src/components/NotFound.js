import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<Header />
        <section className="hero is-danger">
          <div className="hero-body">
            <div className="container">
              <div className="container">
                <div className="title">
                  <i className="fa fa-exclamation-triangle"></i>
                  [404] : Bad URL
                </div>
                <Link to='/' className="subtitle">
                  Go Back Home
                </Link>
              </div>
            </div>
          </div>
        </section>
			<Footer />
		</div>
	)
}

export default NotFound
