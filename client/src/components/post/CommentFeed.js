import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
//to get ecery comment
export class CommentFeed extends Component {
	render() {
		const { comments, postId } = this.props;
		//show every comment
		return comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired,
};
export default CommentFeed;
