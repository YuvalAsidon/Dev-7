import React from 'react';
import './Spinner.css';
//the spinner when the website is waiting fo data
export default function Spinner() {
	return (
		<div className="loaderContainer">
			<div className="loader" />
		</div>
	);
}
