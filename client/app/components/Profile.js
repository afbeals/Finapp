//--- Dependencies ---//
//--------------------//
import React from 'react';

export default class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state = {};

		this.setit = this.setit.bind(this);
	}

	componentWillMount(){
		console.log('willmount');
	}

	componentDidMount(){
		console.log('didmount');
	}

	componentWillReceiveProps(){
		console.log('willrecprops');
	}

	shouldComponentUpdate(){
		console.log('shouldUpdate');
		return true;
	}

	componentWillUpdate(){
		console.log('willupdate');
	}

	setit(){
		this.setState({
			...this.state,
			test:'123'
		})
	}

	render(){
		return (
			<div>
				<h1>Profile</h1>
				{console.log('mah props',this.props)}
				<button onClick={this.setit}>test it! </button>
			</div>
		)
	}
}
