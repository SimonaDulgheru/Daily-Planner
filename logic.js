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

//EXECUTING ALL FUNCTIONS
const app = () => {
	navSlide();
	modalCreateList();
	createList();
};

app();
