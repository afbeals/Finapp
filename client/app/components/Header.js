//--- Dependencies ---//
//--------------------//
import React from 'react';
import {Link} from 'react-router';


export default function Finances(props) {
	const formatDate = () =>{
	  let months = ["January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  	],
	  	days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			date = new Date(),
	  	weekDay = days[date.getDay()],
  		day = date.getDate(),
  		month = months[date.getMonth()],
  		year = date.getFullYear();
	  return weekDay + ', ' + month + ' ' + day + ', ' + year;
	};

  return (
  		<ul className="header">
  			<li className="headerLogo"><Link to="/" >FinApp</Link></li>
  			<li className="headerDate">{formatDate()}</li>
				<li className="headerProfile">
					<Link to="/Profile" >
						<div className="userIcon">
							<i className="fas fa-user"></i>
						</div>
						{props.first_name}
					</Link>
				</li>
		</ul>
	)
}