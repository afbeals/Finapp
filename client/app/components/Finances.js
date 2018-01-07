import React from 'react';
import {Link} from 'react-router';


export default function Finances() {
  return (
  		<ul>
  			<li><Link activeClassName="active" to="/incomes" activeStyle={{color: 'pink'}}>Incomes</Link></li>
			<li><Link activeClassName="active" to="/expenses" activeStyle={{color: 'pink'}}>Expenses</Link></li>
		</ul>
	)
}