import React from 'react';

export default function ShowAnotherQuoteButton(props) {

	return (
		<React.Fragment>
			<button onClick={props.showAnotherQuote}>SHOW ANOTHER</button>
		</React.Fragment>
	)
}