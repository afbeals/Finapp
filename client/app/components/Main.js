//Demo
//--- Dependencies ---//
import React from 'react';
import {Link} from 'react-router';
import Nav from './Nav';

//--- Basic Main Component Structure. Use 'cloneElement()' to pass down props to children ---//
export default class Main extends React.Component {
	render(){
		return (
			<div>
				<div>Main Element</div>
				<Nav />
        		{ React.cloneElement(this.props.children, this.props) }
			</div>
		)
	}
}