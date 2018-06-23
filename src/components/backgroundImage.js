import React from 'react';

export default class BackgroundImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			API_URL: 'https://picsum.photos/',
			imgSrc: ''
		}
		this.windowHeight= window.innerHeight;
		this.windowWidth= window.innerWidth;
	}

	componentDidMount() {
		fetch(`${this.state.API_URL}/${this.windowWidth}/${this.windowHeight}/?random`)
			.then(results => results.arrayBuffer())
			.then(buffer => {
				let base64Flag = 'data:image/jpeg;base64,';
				let imageStr = this.arrayBufferToBase64(buffer);

				this.setState({
					imgSrc: base64Flag + imageStr
				})
			});
	}

	arrayBufferToBase64(buffer) {
		let binary = '';
		let bytes = [].slice.call(new Uint8Array(buffer));

		bytes.forEach(b => binary += String.fromCharCode(b));

		return window.btoa(binary);
	}
			

	render() {
			// console.log(this.windowWidth, this.windowHeight);
			// console.log(this.componentDidMount());
		return (
			<React.Fragment>
				<img src={this.state.imgSrc} />
			</React.Fragment>
		)
	}
}