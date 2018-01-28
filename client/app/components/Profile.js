//--Dependencies--//
//----------------//
import React from 'react';
import {Link, IndexLink} from 'react-router';
import axios from 'axios';
import UpdateUser from './local_forms/UpdateUser';

//--- validate reponse ---//
let nonValidResponse = (response) => {
    let status = null
    if(response.status >= 200 && response.status < 300){
        return status = false;
    }
    return status = true
};

export default class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isMobile: false,
			user:{
				email: null,
				first_name: null,
				last_name: null
			}
		};
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);

		this.getUserInfo();
	}

	getUserInfo(){
    axios.get("/getUserInfo",{params: {user_id: this.props.user.user_id}})
      .then((response) => {  
          if (nonValidResponse(response)) {
              throw Error(response.statusText);
          }
          return response;
      })
      .then((response)=>{
      	this.setState({
      		...this.state,
      		user:{
      			['email']: response.data.user[0].email,
      			['first_name']: response.data.user[0].first_name,
      			['last_name']: response.data.user[0].last_name
      		}
      	})
      })
      .catch((err) => {throw Error(err)});
	}

	updateUserInfo(user){
		this.props.updateUserInfo({user_id:Number(this.props.user.user_id),...user})
	}

	componentWillMount() {
		this.handleWindowSizeChange();
	  window.addEventListener('resize', this.handleWindowSizeChange);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		(window.innerWidth < 991) ? 
	  this.setState({ ...this.state,isMobile:true }) : this.setState({ ...this.state,isMobile:false });
	};

	render(){
		if(this.state.isMobile){
			return(
				<div className="profile">
					<div className="switch">
						<Link className="leftSwitch" onlyActiveOnIndex activeClassName="active" to="/">
							<p>Home</p>
						</Link>
						<Link className="rightSwitch" activeClassName="active" to="/profile">
							<p>Profile</p>
						</Link>
					</div>
					<div className="content">
						<div>
							<div className="profilePic">
								<div className='icon'>
									<i className="fas fa-user"></i>
								</div>
							</div>
							<div className="profileInfo">
								<UpdateUser {...this.state.user} onSubmit={(e)=>{this.updateUserInfo(e)}}/>
							</div>
						</div>
					</div>
				</div>
			)	
		} else if(!this.state.isMobile) {
			return(
				<div className="profile">
					<div className="content">
						<div>
							<div className="profilePic">
								<div className='icon'>
									<i className="fas fa-user"></i>
								</div>
							</div>
							<div className="profileInfo">
								<UpdateUser {...this.state.user} onSubmit={(e)=>{this.updateUserInfo(e)}}/>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}