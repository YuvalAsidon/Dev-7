import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import './InPosts.scss';

export class InPostItem extends Component {
	//to delete the post if it's the admin or the user that wrote the post
	onDeleteClick = id => {
		this.props.deletePost(id);
	};
	//to add like to the post
	onLikeClick = id => {
		this.props.addLike(id);
	};
	//to remove the like if the user did one
	onUnlikeClick = id => {
		this.props.removeLike(id);
	};
	//checks if user liked the button will be implemented later
	findUserLike(likes) {
		const { auth } = this.props;
		//if the user is in that array(that the user liked the post)
		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else return false;
	}
	render() {
		//show actions is the like if it's true it will show if not it won't
		const { post, auth, showActions } = this.props;
		return (
			<div className="PostItem">
				<div>
					<a>
						<div>
							<img
								style={{ borderRadius: '200px', width: '200px', height: '200px' }}
								src={post.avatar}
								alt=""
								onError={e => {
									e.target.onerror = null;
									e.target.src =
										'http://www.gravatar.com/avatar/1dc94927731584333d25f0b7d5e0c814?s=200&r=pg&d=mm';
								}}
							/>
						</div>
					</a>
				</div>
				<div>
					<p>{post.name}</p>
				</div>
				<div>{post.text}</div>
				<div>
					{showActions ? (
						<span>
							{' '}
							<button className="PostItem-button" onClick={() => this.onLikeClick(post._id)}>
								<span>
									<i className="far fa-thumbs-up" />
									{post.likes.length}
								</span>
							</button>
							<button className="PostItem-button" onClick={() => this.onUnlikeClick(post._id)}>
								<i className="far fa-thumbs-down" />
							</button>
							<Link className="postLink" to={`/post/${post._id}`}>
								<i class="fas fa-comments" />
							</Link>
							{//if the post is of the user or the user is an admin they can delete the post
							post.user === auth.user.id || auth.user.role === 'Admin' ? (
								<button className="PostItem-button" onClick={() => this.onDeleteClick(post._id)}>
									<i className="fas fa-trash-alt" />
								</button>
							) : null}
						</span>
					) : null}
				</div>
			</div>
		);
	}
}
//to set default values for the props argument
InPostItem.defaultProps = {
	showActions: true,
};
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
InPostItem.propTypes = {
	post: propTypes.object.isRequired,
	auth: propTypes.object.isRequired,
	deletePost: propTypes.func.isRequired,
	addLike: propTypes.func.isRequired,
	removeLike: propTypes.func.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//in the case is the authentication
//so we can access the auth using the this.props.auth
const mapStateToProps = state => ({
	auth: state.auth,
});
//to connect between redux to the component post item
export default connect(
	mapStateToProps,
	{ deletePost, removeLike, addLike }
)(InPostItem);
