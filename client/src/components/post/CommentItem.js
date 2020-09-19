import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import './Comment.scss';

export class CommentItem extends Component {
	//to delete the comment if the user is the user how wrote the comment or the admin
	onDeleteClick = (postId, commentId) => {
		this.props.deleteComment(postId, commentId);
	};

	render() {
		const { comment, postId, auth } = this.props;
		return (
			<div className="commentItem">
				<div>
					<img style={{ borderRadius: '200rem', height: '100px' }} src={comment.avatar} alt="" />
				</div>
				<div className="commentItem-content">
					<div>
						<p style={{ fontSize: '1.5rem' }}>{comment.name}</p>
					</div>
					<div>
						<p>{comment.text}</p>
					</div>
				</div>

				<div>
					{comment.user === auth.user.id || auth.user.role === 'Admin' ? (
						<button onClick={() => this.onDeleteClick(postId, comment._id)}>Delete comment</button>
					) : null}
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//so we can access the auth using the this.props.auth
const mapStateToProps = state => ({
	auth: state.auth,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
