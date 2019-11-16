// CLOSING AND OPENING MODAL TO CREATE A NEW LIST OF TASKS
const modal = (openBtn, modal, closeBtn) => {
  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  window.addEventListener("click", () => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
};

//MAIN NAVEGATION MENU - SLIDER BY CLICKING BURGER BUTON
const navSlide = () => {
  const burger = document.querySelector(".burger");

  burger.addEventListener("click", () => {
    navSlidingEvent();
    // burger.classList.toggle('toggle');
    burger.classList.toggle("toggle");
  });
};

//HOME CLICK ON MAIN NAVEGATION
const navSlideHomeLink = () => {
  const homeLink = document.querySelector("[remove_sliders]");
  const burger = document.querySelector(".burger");

  homeLink.addEventListener("click", () => {
    navSlidingEvent();
    burger.classList.toggle("toggle");
  });
};

//MAIN NAVEGATION AND LISTS SLIDER - JOINT ANIMATION SETTING
const navSlidingEvent = () => {
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const listsSlider = document.querySelector("[lists_slider_container]");
  const tasksSlider = document.querySelector("[tasks_slider_container]");
  const locationsSlider = document.querySelector(
    "[locations_slider_container]"
  );
  const aboutSlider = document.querySelector("[about_slider]");

  //List slider Closes and Main Nav Opens
  locationsSlider.style.transform = "translateX(-100%)";
  tasksSlider.style.transform = "translateX(-100%)";
  listsSlider.style.transform = "translateX(-100%)";
  aboutSlider.style.transform = "translateX(-100%)";
  nav.classList.toggle("nav-active");

  //Animate Links from Main Navegation
  ulContentSliderAnimation(navLinks);
};

const ulContentSliderAnimation = list => {
  list.forEach((li, index) => {
    if (li.style.animation) {
      li.style.animation = "";
    } else {
      li.style.animation = `liFade 0.5s ease forwards ${index / 7 + 0.5}s`;
    }
  });
};

// SLIDER SHOW
const listSliderToggleEvent = () => {
  const listsSlider = document.querySelector("[lists_slider_container]");
  listsSlider.style.transform = "translateX(0%)";
};

const locationsSliderToggleEvent = () => {
  const locationsSlider = document.querySelector(
    "[locations_slider_container]"
  );
  locationsSlider.style.transform = "translateX(0%)";
};

const aboutLiToggleEvent = () => {
  const aboutSlider = document.querySelector("[about_slider]");
  aboutSlider.style.transform = "translateX(0%)";
};

//CLICKING LINKS TO SLIDERS ON MAIN NAVEGATION
const sliderListsToggle = () => {
  const listsSliderToggle = document.querySelector("[lists_slider_toggle]");
  const mapSliderToggle = document.querySelector("[map_slider_toggle]");
  const burger = document.querySelector(".burger");
  const aboutLiToggle = document.querySelector("[about_slider_toggle]");

  listsSliderToggle.addEventListener("click", () => {
    navSlidingEvent();
    burger.classList.toggle("toggle");
    listSliderToggleEvent();
  });
  mapSliderToggle.addEventListener("click", () => {
    navSlidingEvent();
    burger.classList.toggle("toggle");
    locationsSliderToggleEvent();
  });

  aboutLiToggle.addEventListener("click", () => {
    navSlidingEvent();
    burger.classList.toggle("toggle");
    aboutLiToggleEvent();
  });
};

// // About Us Page JS link

// const aboutUsPage = () => {
//   const aboutLi = document.querySelector("[about_us]");
//   aboutLi.addEventListener("click", () => {});
// };

// ANIMATION FOR BUTTON SUBMIT NEW LIST NAME ON LISTS SCREEN
const btnSubmtitAnimationToggle = (button, input) => {
  input.addEventListener("focus", () => {
    console.log(input);
    button.classList.add("btn_submit");
  });

  input.addEventListener("blur", () => {
    button.classList.remove("btn_submit");
  });
};

// //OPENING SLIDER WITH TASKS FROM A LIST
// const tasksFromList = () => {
//   const list = document.querySelector('#list label');

//   list.addEventListener("click", () => {
//     const listsSlider = document.querySelector("[lists_slider_container]");
//     const tasksSlider = document.querySelector("[tasks_slider_container]");

//     listsSlider.style.transform = "translateX(-100%)";
//     tasksSlider.style.transform = "translateX(0%)";
//   });
// };

//LOADING THE WEATHER API INFO ON HOME PAGE
const weatherApiInfoLoader = callback => {
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
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        const api = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=fdc20835f2afc8721c378d891785f78d`;

        // Fetch API
        fetch(api)
          .then(response => response.json())
          .then(data => {
            console.log(data);

            //Display temperature
            const temperature = data.main.temp;
            const celsius = Math.floor(temperature - 273.15);
            temp.textContent = `${celsius}°C`;
            console.log(temperature);

            //Display temperature description
            tempDescription.textContent = data.weather[0].main;
            console.log(tempDescription);
            weatherDisplay.appendChild(tempDescription);

            //update background image accordingly
            // const bodyBackground = document.querySelector("body");
            const urlWeatherParameter = tempDescription.innerText;

            // bodyBackground.style.backgroundImage = `url(https://source.unsplash.com/random/720×960/?${urlWeatherParameter})`;
            callback(urlWeatherParameter);
            //Display location
            location.textContent = data.name;
            weatherDisplay.appendChild(location);

            //Display icon
            // let image = document.createElement(`img`);
            iconId = data.weather[0].icon;
            // icon.setAttribute(`src`, `<img src = "./icons/${iconId}.png"/>`);
            // icon.getAttribute(`src`, `<img src = "./icons/${iconId}.png"/>`) ;

            // iconId.textContent = icon;
            icon.innerHTML = `<img src = "icons/${iconId}.png"/>`;

            weatherDisplay.appendChild(icon);

            console.log(icon);
          });
      });
    }
  });
};

//GOOGLE MAPS API

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.487144, lng: -1.886977 },
    zoom: 13
  });
  var card = document.getElementById("pac-card");
  var input = document.getElementById("pac-input");
  var types = document.getElementById("type-selector");
  var strictBounds = document.getElementById("strict-bounds-selector");

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener("place_changed", function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          ""
      ].join(" ");
    }

    infowindowContent.children["place-icon"].src = place.icon;
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener("click", function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener("changetype-all", []);
  setupClickListener("changetype-address", ["address"]);
  setupClickListener("changetype-establishment", ["establishment"]);
  setupClickListener("changetype-geocode", ["geocode"]);

  document
    .getElementById("use-strict-bounds")
    .addEventListener("click", function() {
      console.log("Checkbox clicked! New state=" + this.checked);
      autocomplete.setOptions({ strictBounds: this.checked });
    });
}

//FETCH WITH UNSPLASH API
const backgroundRender = query => {
  const clientId = `ae8ebd2fbc68b90afdd9a661d6db0246867c4b7853cb4140566b12cd7e714791`;
  const deviceOrientation =
    window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  console.log(deviceOrientation);
  const url = `https://api.unsplash.com/photos/random?client_id=${clientId}&query=${query}&orientation=${deviceOrientation}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.urls.regular);
      const bodyBackground = document.querySelector("body");
      bodyBackground.style.backgroundImage = `url(${data.urls.regular})`;
    });
};

const greetingScreen = () => {
  let today = new Date();
  let hourNow = today.getHours();
  const greeting = document.querySelector(`.greeting`);

  if (hourNow > 18) {
    greeting.textContent = `Good evening!`;
  } else if (hourNow > 12) {
    greeting.textContent = `Good afternoon!`;
  } else if (hourNow > 0) {
    greeting.textContent = `Good morning!`;
  } else {
    greeting.textContent = `Welcome!`;
  }
};

//BUTTON GO BACK TO LISTS SLIDER FROM TASKS SLIDER
const goBackToListsFromTasks = () => {
  const buttonGoBackToLists = document.querySelector("[btn_go_back]");

  buttonGoBackToLists.addEventListener("click", () => {
    const listsSlider = document.querySelector("[lists_slider_container]");
    const tasksSlider = document.querySelector("[tasks_slider_container]");

    listsSlider.style.transform = "translateX(0%)";
    tasksSlider.style.transform = "translateX(-100%)";
  });
};

//EXECUTING ALL FUNCTIONS
const app = () => {
  const btnNewList = document.querySelector("#btn_new_list");
  const modalCreateList = document.querySelector("#list_creation_modal");
  const closeNewListModalButton = document.querySelector(
    "#close_new_list_modal"
  );
  const modalCreateTask = document.querySelector("#task_creation_modal");
  const closeNewTaskModal = document.querySelector("#close_new_task_modal");
  const btnActionCreateNewTeask = document.querySelector("#btn_new_task");

  const listNameInput = document.querySelector("#list_name_input").value;
  const btnSubmitNewList = document.querySelector("#btn_submit_new_list");
  const taskNameInput = document.querySelector("#task_name_input").value;
  const btnSubmitNewTask = document.querySelector("#btn_submit_new_task");
  // const postcodeInput = document.querySelector("#postcode_input");
  // const btnSubmitNewPostcode = document.querySelector("#btn_submit_postcode");

  weatherApiInfoLoader(backgroundRender);
  greetingScreen();
  navSlide();
  sliderListsToggle();
  navSlideHomeLink();
  // tasksFromList();
  modal(btnNewList, modalCreateList, closeNewListModalButton);
  modal(btnActionCreateNewTeask, modalCreateTask, closeNewTaskModal);
  // modal(btnActionFindPostcode, modalPostcode, closePostcodeModal);
  goBackToListsFromTasks();
  btnSubmtitAnimationToggle(btnSubmitNewList, listNameInput);
  btnSubmtitAnimationToggle(btnSubmitNewTask, taskNameInput);
  // btnSubmtitAnimationToggle(btnSubmitNewPostcode, postcodeInput);
};

app();
