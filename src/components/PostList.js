import React, { Component } from 'react'

class PostList extends Component {

	render() {

    const { posts } = this.props

    console.log('IN RENDER HERE')
    console.log(posts)

		return (

        <section>
          <div className="container">
            <h2 className="is-size-3"> posts: </h2>
            { posts && posts.map( (post, index) =>

              <div className="box" key={index}>
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src="http://bulma.io/images/placeholders/128x128.png" alt="Placeholder" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{post.author}</strong> <small>31m</small>
                        <br />
                        {post.title}
                      </p>
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <a className="level-item">
                          <span className="icon is-small"><i className="fa fa-comment"></i></span>
                          [ { post.comments && post.comments.length } -000 comments
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>

            ) }
          </div>
        </section>

		)
	}
}

export default PostList


