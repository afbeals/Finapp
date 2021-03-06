//Demo
//--- Dependencies ---//
import React from 'react';
import {Link} from 'react-router';
import MobileFooter from './MobileFooter';
import Header from './Header';
import SidePanel from './SidePanel';

//--- Basic Main Component Structure. Use 'cloneElement()' to pass down props to children ---//
export default class Main extends React.Component {
	render(){
		return (
			<div id="container">
				<Header {...this.props.user} />
				<SidePanel {...this.props}/>
        { React.cloneElement(this.props.children, this.props) }
        <MobileFooter  {...this.props} />
			</div>
		)
	}
}