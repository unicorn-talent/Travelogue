//Geo Names Api


  async function geoInfo() {
        const geoUrl = "http://api.geonames.org/searchJSON?q="; 
        const place = document.getElementById("city").value;
        const userName = "&username=mohammedg";
        const weatherBit = "https://api.weatherbit.io/v2.0/forecast/daily?lat=";
        const weatherBitKey = "&key=75004504abee420796aa388b3c7f0d99&days=";
        try{
        const link = encodeURI(geoUrl + place + "&maxRows=1" + userName)
        
        const res =  await fetch(link)
        console.log(res)

            const data = await res.json();
            //return data; 


    const lat = data.geonames[0].lat;
    const long = data.geonames[0].lng;

    const weatherUrl = weatherBit + lat + "&lon=" + long + weatherBitKey + calculateDate().firstDiff;
    const response = await fetch(weatherUrl);
        console.log(response)
        const wea = await response.json();
        //return wea;


        await postData("http://localhost:8000/geoBody", { 
        location: data.geonames[0].countryCode,
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
        countryName: data.geonames[0].countryName,
        dateValues: calculateDate().startDate,
        temperature: wea.data[0].temp,
        details: wea.data[0].weather.description
    })
    updateUI()
        } catch(error) {
            console.log("error", error);
            //return error;
    }
}


//CALCULATE DATE
function calculateDate() {
    let newDate = new Date();
    let dayTime = 1000 * 60 * 60 * 24;

    let startDate = new Date(document.getElementById("first-date").value);
    let endDate = new Date(document.getElementById("second-date").value); 

    let firstDiff = Math.ceil(Math.abs((startDate.getTime() - new Date().getTime()) / dayTime));
    let secondDiff = Math.ceil(Math.abs((endDate.getTime() - startDate.getTime()) / dayTime));

    return {startDate, endDate, firstDiff, secondDiff}

};



// GET PIXEL BAY
async function getImageData() {

    const pixaBay = "https://pixabay.com/api/?key=";
    const pixaBayKey = "16826274-3a4c7fb40dd3d6c35d7701abf&q=";
    const place = document.getElementById("city").value + "&image_type=photo";

    const pixaBayUrl = encodeURI(pixaBay + pixaBayKey + place) 
    try{
        const response = await fetch(pixaBayUrl);
        const data = await response.json();
        console.log('image data:', data)
        postData("http://localhost:8000/image", {
            image: data.hits[0].webformatURL
        }).then(res => {
            console.log(res)
            geoInfo()
        })
    } catch (error) {
        console.log("error", error);
    }
}


//HANDLE SUBMIT 
async function handleSubmit () {

    let place = document.getElementById("city").value;
    calculateDate().endDate;
    if(place === ""){
        alert("Please fill in a destination");
        return;
    }
    if (isNaN(calculateDate().endDate)) {
        alert("We need to know the date to show your destination weather.");
        return;
    }
     calculateDate()
     getImageData()
}


//POST DATA FORMAT
const postData = async( url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors", 
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log(newData)
        return newData
    } catch(error) {
        console.log("error", error);
    }
};


//UPDATE UI
let longtitude = document.getElementById("longtitude");
let latitude = document.getElementById("latitude");
let country = document.getElementById("country");
let weather = document.getElementById("weather");
let summary = document.getElementById("details");
let image = document.getElementById("image");
let firstDiff =  document.getElementById("countdown"); 
let secondDiff = document.getElementById("length"); 



const updateUI = async() => {
    const request = await fetch("http://localhost:8000/going")
    try{
        const comingData = await request.json();
        //console.log(comingData);
        longtitude.innerHTML = `${comingData.longitude}`;
        latitude.innerHTML = `${comingData.latitude}`;
        country.innerHTML = `${comingData.countryName}`;
        weather.innerHTML = `Temperature: ${comingData.temperature}°deg`;
        summary.innerHTML = `Details: ${comingData.details}`;
        image.innerHTML = `<img src=${comingData.image} alt=${comingData.countryName}>`;
        firstDiff.innerHTML = `You have about ${calculateDate().firstDiff} day(s) left to your trip`; 
        secondDiff.innerHTML = `You are going on a(n) ${calculateDate().secondDiff} day trip`;
    }
    catch(error) {
        console.log("error", error)
    }
}

function lastFunction () {

    document.addEventListener("DOMContentLoaded", () => {

        const submit = document.getElementById('button')

        submit.addEventListener('click', function(event) {
            event.preventDefault()
            handleSubmit();
        })
    })
}
lastFunction();


export { handleSubmit, geoInfo, calculateDate, getImageData, updateUI, postData, lastFunction}

