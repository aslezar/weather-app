import React from "react";
import "./Home.css";

const HomePage = () => {
	React.useEffect(() => {
		const yourTab = document.querySelector("[data-yourWeather]");
		const searchTab = document.querySelector("[data-searchWeather]");
		const weatherContainer = document.querySelector(".weather-container");
		const grantAccessContainer = document.querySelector(
			".grant-location-container"
		);
		const formContainer = document.querySelector(".form-container");
		const loadingContainer = document.querySelector(".loading-container");
		const weatherInfoContainer = document.querySelector(
			".weather-infoContainer"
		);
		let currentTab = yourTab;
		let API_KEY = "8faaa2d181970b428bb3090679a3fc15";
		currentTab.classList.add("current-tab");
		getFromSessionStorage();

		function switchTab(clickedTab) {
			if (clickedTab != currentTab) {
				currentTab.classList.remove("current-tab");
				currentTab = clickedTab;
				currentTab.classList.add("current-tab");

				if (!formContainer.classList.contains("active")) {
					weatherInfoContainer.classList.remove("active");
					grantAccessContainer.classList.remove("active");
					formContainer.classList.add("active");
				} else {
					formContainer.classList.remove("active");
					weatherInfoContainer.classList.remove("active");
					getFromSessionStorage();
				}
			}
		}
		yourTab.addEventListener("click", () => {
			switchTab(yourTab);
		});
		searchTab.addEventListener("click", () => {
			switchTab(searchTab);
		});
		// checks if coordinates are stored or not
		function getFromSessionStorage() {
			const localCoordinates = sessionStorage.getItem("user-coordinates");
			if (!localCoordinates) {
				grantAccessContainer.classList.add("active");
			} else {
				const coordinates = JSON.parse(localCoordinates);
				fetchYourWeatherInfo(coordinates);
			}
		}
		async function fetchYourWeatherInfo(coordinates) {
			const { lat, lon } = coordinates;
			// make grant location disappear
			grantAccessContainer.classList.remove("active");
			// make loader visible
			loadingContainer.classList.add("active");
			// API CALL
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
				);
				const data = await response.json();

				loadingContainer.classList.remove("active");
				weatherInfoContainer.classList.add("active");
				renderWeatherInfo(data);
			} catch (err) {
				loadingContainer.classList.remove("active");
				console.alert(err);
			}
		}
		function renderWeatherInfo(weatherInfo) {
			const cityName = document.querySelector("[data-cityName]");
			const countryIcon = document.querySelector("[data-countryIcon]");
			const description = document.querySelector("[data-weatherDescription]");
			const weatherIcon = document.querySelector("[data-weatherIcon]");
			const temp = document.querySelector("[data-temperature]");
			const windSpeed = document.querySelector("[data-windSpeed]");
			const humidity = document.querySelector("[data-humidity]");
			const cloudiness = document.querySelector("[data-cloud]");
			cityName.innerText = weatherInfo?.name;
			countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
			description.innerText = weatherInfo?.weather?.[0]?.description;
			weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
			temp.innerText = `${weatherInfo?.main?.temp} °C`;
			windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
			humidity.innerText = `${weatherInfo?.main?.humidity}%`;
			cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
		}
		const grantAccessButton = document.querySelector("[data-grantAccess]");
		grantAccessButton.addEventListener("click", getLocation);
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				console.alert("No geolocation support on your browser");
			}
		}
		function showPosition(position) {
			const userCoordinates = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			};
			sessionStorage.setItem(
				"user-coordinates",
				JSON.stringify(userCoordinates)
			);
			fetchYourWeatherInfo(userCoordinates);
		}
		const searchInput = document.querySelector("[data-SearchInput]");
		formContainer.addEventListener("submit", (e) => {
			e.preventDefault();
			if (searchInput.value == "") return;

			fetchSearchWeatherInfo(searchInput.value);
		});
		async function fetchSearchWeatherInfo(city) {
			loadingContainer.classList.add("active");
			weatherInfoContainer.classList.remove("active");
			grantAccessContainer.classList.remove("active");
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
				);
				const data = await response.json();
				loadingContainer.classList.remove("active");
				weatherInfoContainer.classList.add("active");
				renderWeatherInfo(data);
			} catch (err) {
				console.log("Api not working");
			}
		}
	}, []);
	return (
		<>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Document</title>
			<link rel="stylesheet" href="weather.css" />
			<div className="wrapper">
				<h1>Weather app</h1>
				<div className="tab-container">
					<p className="tab" data-yourweather="">
						Your weather
					</p>
					<p className="tab" data-searchweather="">
						Search Weather
					</p>
				</div>
				<div className="weather-container">
					{/* grant location access */}
					<div className="sub-container grant-location-container">
						<img
							src="./assets/location.png"
							loading="lazy"
							width={80}
							height={80}
						/>
						<p>Grant Location Access</p>
						<p>Allow Access To Get Weather Information</p>
						<button className="btn" data-grantaccess="">
							GRANT ACCESS
						</button>
					</div>
					{/* search form */}
					<form className="form-container" data-searchform="">
						<input placeholder="Search for city ..." data-searchinput="" />
						<button className="btn">
							<img
								src="./assets/search.png"
								alt=""
								loading="lazy"
								width={20}
								height={20}
							/>
						</button>
					</form>
					{/* loading screen */}
					<div className="sub-container loading-container">
						<img src="./assets/loading.gif" alt="" width={150} height={150} />
						<p>loading</p>
					</div>
					{/* show weawther information */}
					<div className="sub-container weather-infoContainer">
						<div className="name">
							<p data-cityname="" />
							<img data-countryicon="" />
						</div>
						<p data-weatherdescription="" />
						<img data-weathericon="" />
						<p data-temperature="" />
						{/* card-container */}
						<div className="card-container">
							{/* card-1 */}
							<div className="wind-speed card">
								<img src="./assets/wind.png" alt="" />
								<p>WINDSPEED</p>
								<p data-windspeed="" />
							</div>
							{/* card-2 */}
							<div className="humidity card">
								<img src="./assets/humidity.png" alt="" />
								<p>HUMIDITY</p>
								<p data-humidity="" />
							</div>
							{/* card-3 */}
							<div className="clouds card">
								<img src="./assets/cloud.png" alt="" />
								<p>CLOUDS</p>
								<p data-cloud="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
