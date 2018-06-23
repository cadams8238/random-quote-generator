import React from 'react';
import ShowAnotherQuoteButton from './button';
import BackgroundImage from './backgroundImage';

export default class QuoteGenerator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			API_URL: 'https://talaikis.com/api/quotes/random/',
			quote: '',
			author: ''
		}
	}

	componentDidMount() {
		fetch(this.state.API_URL)
			.then(result => {
				if(result) {
					return result.json();
				} else {
					return new Error('Something went wrong: no quote to be found')
				}
			})
			.then(jsonResult => {
				// console.log(jsonResult);
				this.setState({
					quote: jsonResult.quote,
					author: jsonResult.author
				})
				// console.log(this.state.quote, this.state.author);
			});
	}

	render() {
		return (
			<div>
				<BackgroundImage />
				<blockquote>
					<q>{this.state.quote}!</q>
					<p>-{this.state.author}</p>
				</blockquote>
				<ShowAnotherQuoteButton showAnotherQuote={() => this.componentDidMount()} />
			</div>
		);
	}
}