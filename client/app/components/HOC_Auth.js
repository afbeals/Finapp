//--Dependencies--//
import React from 'react';
import { browserHistory } from 'react-router';

export default function (Component) {
	return class Authenicate extends React.Component {
		constructor(props){
			super(props);
			let user = localStorage.getItem('finapp_user');
			let auth = false;
			if(!user || user === '') {
				browserHistory.push('/login');
			} else if ( user && !this.props.user.authenticated){
				this.props.authUser(user);
			} else {
				this.auth = true;
			}
		}

		render(){
			if(this.auth){
				return(
					<div className="main">
						<Component {...this.props} />
					</div>
				)	
			} else {
				return(
					null
				)
			}
			
		}
	}
}