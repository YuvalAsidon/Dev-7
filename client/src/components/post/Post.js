import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

export class Post extends Component {
	//executed after the first render only on the client side.
	//it gets the post by the id (it passes the id)
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}
	render() {
		const { post, loading } = this.props.post;
		let postContent;
		//if the post not exist or still loading or the object is empty then we showing the spinner
		if (post === null || loading === true || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			//we don't want to show the like so we set shoeActions to false
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<div>
						<CommentForm postID={post._id} />
					</div>
					<div>
						<CommentFeed postId={post._id} comments={post.comments} />
					</div>
				</div>
			);
		}
		return (
			<div
				className="container"
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div>
					<Link to="/feed">
						<button>Back to feed</button>
					</Link>
				</div>
				<div>{postContent}</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//so we can access the post using the this.props.post
const mapStateToProps = state => ({
	post: state.post,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
