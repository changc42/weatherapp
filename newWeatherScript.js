var lat;
var long;
window.addEventListener("load", () =>{
	navigator.geolocation.getCurrentPosition(
		response =>{
			lat = response.coords.latitude;
			long = response.coords.longitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const apiURL = `${proxy}https://api.darksky.net/forecast/19225e2dbb37011c100eba26e5a0d482/${lat},${long}`;

			fetch(apiURL)
				.then(response =>{
					return response.json();
				})
				.then(data =>{
					console.log(data);
					let x = data.currently;
					let summary = document.getElementById("summary");
					let locationName= document.getElementById("locationName");
					let temperature=document.getElementById("temperature");
					let tempUnit=document.getElementById("tempUnit");

					locationName.textContent = data.timezone;
					summary.textContent = x.summary;
					temperature.textContent = x.temperature;

					var skycons = new Skycons({"color": "white"});
					skycons.add("animation", x.icon);
					skycons.play();


				});

		},
		error =>{
			console.log("permission denied");
		}
	);
});

//dynamic repositioning
var body=document.getElementById("body");
setInterval("body.style.height=`${window.innerHeight}px`;", .1);


var button = document.getElementById("button");
var f;
var c;

button.addEventListener("click", () =>{
	let temperature=document.getElementById("temperature");
	let tempUnit=document.getElementById("tempUnit");
	if(tempUnit.textContent.includes("F")){
		f = temperature.textContent;
		temperature.textContent= FtoC(temperature.textContent);
		tempUnit.textContent= '\xA0\u00B0C';
	}
	else{
		temperature.textContent= f;
		tempUnit.textContent= '\xA0\u00B0F';
	}
});

function FtoC(s){
	return ((s-32)*(5.0/9.0)).toFixed(2);
}
