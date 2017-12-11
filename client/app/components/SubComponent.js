//Demo
//--- Dependencies ---//
import React from 'react';
import {Link} from 'react-router';

export default class SubComponent extends React.Component {
	constructor(props){
		super();
	}

	render(){
		return (
			<div>
				Child Component!
				{console.log(this.props)}
			</div>
		)
	}
}