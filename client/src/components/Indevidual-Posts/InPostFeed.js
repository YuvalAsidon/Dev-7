import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InPostItem from './InPostItem';
import './InPosts.scss';
//showing every post
class InPostFeed extends Component {
	render() {
		const { posts, id } = this.props;
		let result;
		//to bring every single post
		result = posts.filter(post => post.user === id);
		if (result.length == 0) {
			return (
				<div style={{ marginTop: '10rem' }}>
					<h1>You have no posts yet</h1>
				</div>
			);
		}
		return result.map(post => <InPostItem key={post._id} post={post} />);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
InPostFeed.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default InPostFeed;
