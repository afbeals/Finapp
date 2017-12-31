//--Dependencies--//
import React from 'react';

export default function (Component) {
	return class Authenicate extends React.Component {
		constructor(props){
			super(props);
			let user = localStorage.getItem('finapp_user');
			if(!user || user === '') {
				//redirect to login
				console.log('no user; redirect to login');
			} else if ( user && !this.props.user.authenticated){
				//run function to check user and create local storage
				console.log('user, but we need to authenticate it and store it');
				//this.props.testHeaders(user);
			}

		}

		render(){
			return(
				<div>
					<Component {...this.props} />
				</div>
			)
		}
	}
}