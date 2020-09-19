import React from 'react';
//when we go to url when there is nothing there
export default function NotFound() {
	return (
		<div className="container">
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<h1>Page Not found</h1>
				<p>Sorry this page does not exist</p>
			</div>
		</div>
	);
}
