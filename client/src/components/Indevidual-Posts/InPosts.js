import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';
import InPostFeed from './InPostFeed';
import { getPosts } from '../../actions/postActions';
export class InPosts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		console.log('the props are', this.props);
		const { posts, loading } = this.props.post;
		let postContent;

		//if it waits for the information to show then it will show the spinner
		if (posts === null || loading) {
			postContent = <Spinner />;
		} else {
			//else it will show the feed
			postContent = <InPostFeed posts={posts} id={this.props.match.params.id} />;
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
					<div>{postContent}</div>
				</div>
			</div>
		);
	}
}
InPosts.propTypes = {
	post: propTypes.object.isRequired,
	getPosts: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
	post: state.post,
});
//to connect between redux to the component
export default connect(
	mapStateToProps,
	{ getPosts }
)(InPosts);
