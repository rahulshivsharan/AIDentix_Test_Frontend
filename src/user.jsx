'use strict';

import React, {useEffect, useState, Fragment} from "react";

export default function UserComponent(){
	const [userList, setUserList] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);


	const fetchUserList = () => {
			
		setLoading(true);
		const date = new Date();
		const url = "http://localhost:8089/user?date="+date.getTime();	

		$.ajax({			
			"url" : url,
			"type" : "GET",
			"success" : function(data){									
				setUserList(data);
				setLoading(false);
			},
			"error" : function(xhr, status, error){					
				setError(error);
				setLoading(false);
			}
		});
	};

	useEffect(()=>{
		fetchUserList();
	},[]);

	const handleClick = (usernameTxt, passwordTxt) => {
		const date = new Date();
		const url = "http://localhost:8089/user?date="+date.getTime();	

		$.ajax({
			"contentType" : "application/json", 
			"processData" : false,			
			"url" : url,
			"type" : "POST",
			"data" : JSON.stringify({
				"username" : usernameTxt,
				"password" : passwordTxt
			}),
			"success" : function(data){									
				setUserList(data);
				setLoading(false);
				$('#myModal').modal('hide');				
			},
			"error" : function(error){					
				console.log(error.responseJSON["error"]);
				setError(error.responseJSON["error"]);
				setLoading(false);
				$('#myModal').modal('hide');
				
			}
		});
	}

	return (
		<Fragment>	
			{error && (<div id="errorBox" className="alert alert-danger alert-dismissible fade in" role="alert">        			
    			<strong>Error!</strong> {error}
    			<button className="btn btn-error" onClick={()=>{
    				setError(null);
    			}}>Close</button>
    		</div>)}
			
			<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  				Launch demo modal
			</button>
			
			<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
			      </div>
			      
			      <div className="modal-body">
				        <form>
				        	<div className="form-group">
	    						<label for="usernameId">User name</label>
	   	 						<input type="text" className="form-control" id="usernameId" placeholder="user name" />
	  						</div>

	  						<div className="form-group">
	    						<label for="passwordId">Password</label>
	   	 						<input type="password" className="form-control" id="passwordId" placeholder="password" />
	  						</div>
				        </form>
			      </div>
			        			      
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			        <button type="button" className="btn btn-primary" onClick={()=>{
			        	const username = $("#usernameId").val();
			        	const password = $("#passwordId").val();
			        	handleClick(username, password);
			        }}>Save changes</button>
			      </div>

			    </div>
			  </div>
			</div>
			<br/>
			<br/>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Sr No</th>
						<th>User Name</th>
						<th>User Password</th>												
					</tr>
				</thead>
				<tbody>
					{userList.map((userObj)=>{				
						const userId = userObj['userId'];
						const username = userObj['username']; 
						const password = userObj['password']; 
						return (
							<tr key={userId}>
								<td>{userId}</td>
								<td>{username}</td>
								<td>{password}</td>								
							</tr>
						)	
					})}							
				</tbody>	
			</table>
		</Fragment>
	);
}