import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';

class ProfileGithub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: '89f85b1c8b1e3bd4e238',
			clientSecret: 'de33f364ccd2709d28f98de6fcc2ed217fa1d04d',
			count: 5, //of repstoris
			sort: 'created: asc', //by the date
			repos: [],
		};
	}
	//fetching from the url the github
	componentDidMount() {
		const { username } = this.props;
		const { count, sort, clientId, clientSecret } = this.state;
		//to request
		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => res.json())
			.then(data => {
				//to save the data
				this.setState({ repos: data });
			})
			.catch(err => console.log(err));
	}
	render() {
		const { repos } = this.state;
		//map thoghu the array of github data
		const repoItems = repos.map(repo => (
			<div key={repo.id}>
				<div>
					<h4>
						<a href={repo.html_url} rel="noopener noreferrer" target="_blank">
							<button>{repo.name}</button>
						</a>
					</h4>
					<p>{repo.description}</p>
				</div>

				<div>
					<span>Stars:{repo.stargazers_count}</span>
				</div>

				<div>
					<span>Watchers:{repo.watchers_count}</span>
				</div>

				<div>
					<span>Forks:{repo.forks_count}</span>
				</div>
			</div>
		));
		return (
			<div className="profileGithub">
				<div>
					<h1>Latest GitHub Repos</h1>
				</div>
				<div className="profileGithub-items">{repoItems}</div>
			</div>
		);
	}
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid
ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired,
};
export default ProfileGithub;
