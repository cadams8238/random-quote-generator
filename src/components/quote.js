import React from 'react';
import ShowAnotherQuoteButton from './button';
import BackgroundImage from './backgroundImage';

export default class QuoteGenerator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			API_URL_QUOTE: 'https://talaikis.com/api/quotes/random/',
			quote: '',
			author: '',

			API_URL_IMG: 'https://picsum.photos/',
			imgSrc: ''
		}
		this.windowHeight= window.innerHeight;
		this.windowWidth= window.innerWidth;
	}

	componentDidMount() {
		//for image
		fetch(`${this.state.API_URL_IMG}/${this.windowWidth}/${this.windowHeight}/?random`)
			.then(results => results.arrayBuffer())
			.then(buffer => {
				let base64Flag = 'data:image/jpeg;base64,',
						imageStr = this.arrayBufferToBase64(buffer),
						quote = '',
						author = '';

				//for quote
				fetch(this.state.API_URL_QUOTE)
					.then(result => {
						if(result) {
							return result.json();
						} else {
							return new Error('Something went wrong: no quote to be found')
						}
					})
					.then(jsonResult => {
						quote = jsonResult.quote;
						author = jsonResult.author;

						this.setState({
							imgSrc: base64Flag + imageStr,
							quote: quote,
							author: author
						})
					});
			});

		//for quote
		// fetch(this.state.API_URL_QUOTE)
		// 	.then(result => {
		// 		if(result) {
		// 			return result.json();
		// 		} else {
		// 			return new Error('Something went wrong: no quote to be found')
		// 		}
		// 	})
		// 	.then(jsonResult => {
		// 		this.setState({
		// 			quote: jsonResult.quote,
		// 			author: jsonResult.author
		// 		})
		// 	});
	}

	arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));

		bytes.forEach(b => binary += String.fromCharCode(b));

		return window.btoa(binary);
	}

	render() {
		return (
			<div className="background">
				<img src={this.state.imgSrc} />
				<blockquote>
					<q>{this.state.quote}!</q>
					<p>-{this.state.author}</p>
				</blockquote>
				<ShowAnotherQuoteButton showAnotherQuote={() => this.componentDidMount()} />
			</div>
		);
	}
}
