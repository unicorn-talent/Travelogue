const dotenv = require('dotenv');
const fetch = require('node-fetch');
dotenv.config();
var path = require('path');
//const mockAPI = require('./mockAPI.js');
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

let weatherBit = "https://api.weatherbit.io/v2.0/current?lat=";
let weatherBitKey = "&key=" + process.env.weatherApi;

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('dist'))

//SEND DATA
app.get("/going", goingData)
	function goingData(req, res){
	res.send(serverData);
};


let serverData = {};

//GEO NAMES
app.post("/geoBody", comingData)
	function comingData(req, res) {
	// console.log(req.body);

		serverData.location = req.body.location;
		serverData.latitude = req.body.latitude;
		serverData.longitude = req.body.longitude;
		serverData.countryName = req.body.countryName;
		serverData.dateValues = req.body.dateValues;
		serverData.temperature = req.body.temperature;
		serverData.details = req.body.details;
		res.json({data:serverData})

}

//Date DATA
app.post("/calculator", dateData)
	function dateData(req, res) {	 
		let startDate = req.body.firstDiff;
		let endDate = req.body.difftwo;

	let firstDiff = Math.ceil(Math.abs((endDate.getTime() - startDate.getTime()) / dayTime))
    let secondDiff = Math.ceil(Math.abs((startDate.getTime() - new Date().getTime()) / dayTime));

    serverData.firstDiff = firstDiff;
    serverData.secondDiff = secondDiff;

}


//PIXABAY DATA
app.post("/image", imageData)
	function imageData(req, res) {	 
		serverData.image = req.body.image;
		res.json({url: serverData.image})
}
	

app.listen(8000, function () {
    console.log('Server is running on port 8000!')
})


//exports.weatherBitData = weatherBitData;
exports.imageData = imageData;
exports.comingData = comingData;
exports.goingData = goingData;