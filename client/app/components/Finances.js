//--Dependencies--//
//----------------//
import React from 'react';
import {Link} from 'react-router';


export default function Finances() {
  return (
  		<div className="finances">
				<ul>
		  			<li>
		  				<Link to="/incomes">Incomes</Link>
		  			</li>
						<li>
							<Link to="/expenses">Expenses</Link>
						</li>
						<li className="homeLink">
							<Link to="/">Home</Link>
						</li>
				</ul>
  		</div>
	)
}