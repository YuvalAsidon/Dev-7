import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import './Posts.scss';
//showing every post
class PostFeed extends Component {
	render() {
		const { posts } = this.props;
		//to bring every single post
		return posts.map(post => <PostItem key={post._id} post={post} />);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
PostFeed.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostFeed;
