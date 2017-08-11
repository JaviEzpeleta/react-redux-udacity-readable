import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Moment from 'react-moment';

class PostInList extends Component {

	render() {

    const { post } = this.props

		return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src="http://bulma.io/images/placeholders/128x128.png" alt="Placeholder" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>
                  {post.author}
                </strong>
                &nbsp;
                <small>
                {showDate(post.timestamp)}
                { /*
                  <Moment fromNow>
                    <Moment unix>{post.timestamp}</Moment>
                  </Moment>
                */ }
                </small>
                <br />
                <Link to={'/post/'+post.id} className="is-size-5">{post.title}</Link>
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <span className="tag">{post.category}</span>
                &nbsp;
                <span className="icon is-small">
                  <i className="fa fa-comment-o"></i>
                </span>
                &nbsp;
                { post.comments && post.comments.length ? post.comments.length : '--' } comments
              </div>
            </nav>
          </div>
        </article>
      </div>
		)
	}
}

function showDate(timestamp) {
  var a = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

export default PostInList


