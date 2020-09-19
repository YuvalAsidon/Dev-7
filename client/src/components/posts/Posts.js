import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../spinner/Spinner';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';
//in what way every post will look like
export class Posts extends Component {
	//after everything rendered it will get the posts
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		//destructring
		const { posts, loading } = this.props.post;
		let postContent;

		//if it waits for the information to show then it will show the spinner
		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			//else it will show the feed
			postContent = <PostFeed posts={posts} />;
		}
		return (
			<div className="container">
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<PostForm />
					<div>{postContent}</div>
				</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
Posts.propTypes = {
	post: propTypes.object.isRequired,
	getPosts: propTypes.func.isRequired,
};
//selecting the part of the data from the store that the connected component needs.
//in this case is the post
//so we can access the post using the this.props.post
const mapStateToProps = state => ({
	post: state.post,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ getPosts }
)(Posts);
