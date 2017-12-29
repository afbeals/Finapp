//--Dependencies--//
import React from 'react';

export default function (component) {
	class Authenicate extends React.Component {
		constructor(){
			let user = localStorage.getItem('finapp_user');
			if(!user) {
				//redirect to login
			} else if ( user && !props.authenticated){
				//run function to check user and create local storage
			}

		}

		render(){
			return(
				<component />;
			)
		}
	}
}