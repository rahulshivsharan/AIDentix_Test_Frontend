'use strict'
import express from "express";

const app = new express();
const PORT = 3000;

function sayHi(request, response){
	response.json({
		"message" : "Hello"
	});
}

app.get("/hi",sayHi);

app.use("/",express.static("dest"));


app.listen(PORT, ()=> {
	console.log(`React-Browserify Demo app ${PORT}`);
});