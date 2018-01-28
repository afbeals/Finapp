//--Dependencies--//
import React from 'react';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';

export default function (Component) {
	return class Authenicate extends React.Component {
		constructor(props){
			super(props);
			let user = localStorage.getItem('finapp_user');
			if(!user || user === '') {
				browserHistory.push('/login');
			} else if ( user && !this.props.user.authenticated){
				this.props.authUser(user);
			}
		}



		render(){
			if(this.props.user.authenticated){
				return(
					<div className="main">
						<Component {...this.props} />
					</div>
				)	
			} else {
				return(
					<Link to="login">Login!</Link>
				)
			}
			
		}
	}
}