const actionButton = document.querySelector('.action_btn');

//CLOSING AND OPENING MODAL TO CREATE A NEW LIST OF TASKS
const modalCreateList = () => {
	const modalCreateList = document.querySelector('.modal');
	const closeModalButton = document.querySelector('.close');

	actionButton.addEventListener('click', () => {
		modalCreateList.style.display = 'block';
	});

	window.addEventListener('click', () => {
		if (event.target == modalCreateList) {
			modalCreateList.style.display = 'none';
		}
	});

	closeModalButton.addEventListener('click', () => {
		modalCreateList.style.display = 'none';
	});
};

//CREATING A NEW LIST OF TASKS
const createList = () => {
	const formCreateNewList = document.querySelector('.form_create_list');
	const inputListName = document.querySelector('#list_name_input');
	const listItems = document.querySelector('.list_items');
	const instruction = document.querySelector('.instruction');
	const modalCreateList = document.querySelector('.modal');

	formCreateNewList.addEventListener('submit', e => {
		e.preventDefault();
		if (inputListName.value) {
			const li = document.createElement('li');
			li.textContent = inputListName.value;
			li.classList.add('list_items');
			listItems.appendChild(li);
			instruction.textContent =
				'Select a List to see your tasks for today';
			instruction.classList.add('instruction_header');
		}
		modalCreateList.style.display = 'none';
		inputListName.value = '';
	});
};

//MAIN NAVEGATION MENU - SLIDER
const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		//Toggle Nav
		nav.classList.toggle('nav-active');

		//Animate Links
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index /
					7 +
					0.5}s`;
			}
		});
		//Burger Animation
		burger.classList.toggle('toggle');
	});
};

//LOADING THE WEATHER API INFO ON HOME PAGE

const weatherApiInfoLoader = () => {

	window.addEventListener(`load`, () => {

		// Fetch variables from html
		let long;
		let lat;
		const weatherDisplay = document.querySelector(`.weather_display`);
		let location = document.querySelector(`.location, span`);
		let temp = document.querySelector(`.temperature`);
		let tempDescription = document.querySelector(`.weather_description`);
		let icon = document.querySelector(`.weather_icon`);
	


		//Get current location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
	
				long = position.coords.longitude;
				lat = position.coords.latitude;
			  
				const api = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=fdc20835f2afc8721c378d891785f78d`;
				
				// Fetch API 
				fetch(api)
					.then(response => response.json())
					.then(data => {
						console.log(data)

						//Display temperature
						const temperature = data.main.temp;
						const celsius = Math.floor(temperature - 273.15);
						temp.textContent = `${celsius}° C` ; 
						console.log(temperature);

						//Display temperature description
						tempDescription.textContent = data.weather[0].main;
						console.log(tempDescription)
						weatherDisplay.appendChild(tempDescription);
						console.log(tempDescription);

						//Display location
						location.textContent = data.name;
						weatherDisplay.appendChild(location);

						//Display icon
						
						iconId = data.weather[0].icon;
						icon.innerHTML=`<img src = "icons/${iconId}.png"/>`;
					    weatherDisplay.appendChild(icon);
					 
						 console.log(icon)
					});
				
			});
	
		}
	});
}



const greetingScreen = () => {
	let today = new Date();
	let hourNow = today.getHours();
	const greeting = document.querySelector(`.greeting`);
	
	if (hourNow > 18) {
		greeting.textContent = `Good evening!`
	}
	else if (hourNow > 12) {
		greeting.textContent = `Good afternoon!`
	}
	else if (hourNow > 0) {
		greeting.textContent = `Good morning!`;
	}
	else {
		greeting.textContent = `Welcome!`
	}	
}


const weatherIcon = document.querySelector(`.weather_icon`);


//EXECUTING ALL FUNCTIONS
const app = () => {
	navSlide();
	modalCreateList();
	createList();
	weatherApiInfoLoader();
	greetingScreen();
	
};

app();
