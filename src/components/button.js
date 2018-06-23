import React from 'react';

export default function ShowAnotherQuoteButton(props) {

	return (
		<React.Fragment>
			<button onClick={props.showAnotherQuote}>Show Another</button>
		</React.Fragment>
	)
}