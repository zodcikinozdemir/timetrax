import React from "react";

//import helper file
import Helpers from '../utils/Helpers.js';
import Auth  from "./Auth";

class Timesheet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
    		timeSheets:[],
    		userData:Auth._getData()
  		};
	}

	componentWillMount() {
  	
  		Helpers._getTimeSheets()
      		.then(function(userData,err){
        	this.setState({timeSheets:userData.data});
      	}.bind(this));
}//componentWillMount




	render() {
	    var that =this;
		return(
			<div>
				<p> Time Sheets </p>
				<p>{this.state.userData.firstName} {this.state.userData.lastName}</p>
				<table>
				 <thead>
        			<tr>
          			<th>Client</th>
          			<th>Date</th>
          			<th>Start Time</th>
          			<th>End Time</th>
          			</tr>
          		  </thead>
          		  <tbody>	
          			{this.state.timeSheets.map(function(id,i){
			            return(
			          		<tr key={i}> 
			            		<td>{id.jobName}</td>
			            		<td>{moment(id.clockedInDate).format('L')}</td>
			            		<td>{id.clockIn}</td>
			            		<td>{id.clockOut}</td>
			            	</tr>
			            );
          			})}
          			</tbody>
        		</table>
				
        	</div>
		);
	}
}
export default Timesheet;