//--Dependencies--//
import React from 'react';
import { browserHistory } from 'react-router';

export default function (Component) {
	return class Authenicate extends React.Component {
		constructor(props){
			super(props);
			let user = localStorage.getItem('finapp_user');
			if(!user || user === '') {
				//redirect to login
				browserHistory.push('/login');
			} else if ( user && !this.props.user.authenticated){
				//run function to check user and create local storage
				console.log('user, but we need to authenticate it and store it');
				//this.props.testHeaders(user);
			} else {
				console.log('asera');
			}

		}

		render(){
			return(
				<div className="main">
					<Component {...this.props} />
				</div>
			)
		}
	}
}