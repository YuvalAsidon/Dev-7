import React, { Component } from 'react';
import './Chat.scss';
//the chat body
export class ChatBody extends Component {
	render() {
		return (
			<div className="ChatBody">
				{this.props.chat.map((chatitem, key) => (
					<div className="ChatBody-item" key={key}>
						<div className="ChatBody-name">{chatitem.senderName}</div>
						<div className="ChatBody-text">{chatitem.text}</div>
					</div>
				))}
			</div>
		);
	}
}

export default ChatBody;
