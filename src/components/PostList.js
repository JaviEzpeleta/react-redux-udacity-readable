import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PostInList from './PostInList'
// import Moment from 'react-moment';

class PostList extends Component {

	render() {

    const { posts } = this.props

		return (
      <section>
        <div className="container" style={{marginTop:'2em'}}>
          { posts && posts.map( (post, index) =>
            <PostInList key={index} post={post} />
          ) }
        </div>
      </section>
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

export default PostList
