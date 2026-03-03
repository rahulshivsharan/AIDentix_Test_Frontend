import $ from "jquery";
import React, {useState , Fragment} from "react";
import {createRoot} from "react-dom/client";
import UserComponent from "./user.jsx";


export default function App(){
	console.log("App rendering");
	return(	
		<Fragment>	
			<nav className="navbar navbar-default">
				<div class="container-fluid">					
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				        <span class="sr-only">Toggle navigation</span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				      </button>
				      <a class="navbar-brand" href="#">User Information</a>
				    </div>
				</div>
			</nav>	
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<UserComponent />
					</div>	
				</div>
			</div>		
		</Fragment>	
	);
}

$(document).ready(function(){
	console.log("Document loaded..");
	const container = $("#root")[0];
	const root = createRoot(container);
	root.render(<App />);
});