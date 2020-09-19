import React, { Component } from 'react';
import './Footer.scss';
//its the down bar at the site(never changes)
export class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<div
					style={{
						textAlign: 'center',
						color: 'white',
						letterSpacing: '2px',
						minHeight: '5vh',
					}}
				>
					All Rights Reserved to Yuval Asidon 2019
				</div>
			</div>
		);
	}
}

export default Footer;
