document.addEventListener("DOMContentLoaded", function() {

	const menuItems = document.querySelectorAll(".main-menu button");
	const images = document.querySelectorAll(".picture-container img");
	const storedValue = localStorage.getItem('storedValue');

	let resultArray = [];
	let stickerContainer;
	let category = "";
	let apiData = {};


// Main page display images when hovering buttons
	menuItems.forEach(item => {
		item.addEventListener("mouseover", function() {
			const dataImg = this.getAttribute("data-menu");
			images.forEach(img => {
				if (img.getAttribute("data-img") === dataImg) {
					img.style.display = "block";
				} else {
					img.style.display = "none";
				}
			});
		});
	});

// Store witch value to fetch
	const mainPageButtons = document.querySelectorAll('button[data-menu]');
	mainPageButtons.forEach(button => {
		button.addEventListener('click', function () {
			const selectedValue = this.dataset.menu;
			localStorage.setItem('storedValue', selectedValue);
		});
	});

// Fetching the selected data
	function getData() {
		const url = `https://swapi.dev/api/${storedValue}`;

		fetch(url)
			.then(response => response.json())
			.then(data => {
				apiData[category] = data;
				renderDatas(data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}
	getData();

// Rendering the data 
	function renderDatas(data) {
		resultArray = [];
		if (stickerContainer) {
			stickerContainer.remove();
		}
		
		data.results.forEach(resultObject => {
			const characterName = (resultObject.name || resultObject.title).toLowerCase().replace('/', ' ');
			const stickerImgUrl = `assets/${characterName}.jpg`;
			const stickerLogo = "assets/Star_Wars_Logo.svg.png";

			resultArray.push({

			// General
				name: resultObject.name || resultObject.title,
				stickerImg: stickerImgUrl,
				stickerLogo: stickerLogo,

			// People
				height: resultObject.height,
				mass: resultObject.mass,
				hair: resultObject.hair_color,
				gender: resultObject.gender,
				birth_year: resultObject.birth_year,

			//Planets
				climate: resultObject.climate,
				orbital_period: resultObject.orbital_period,
				gravity: resultObject.gravity,
				terrain: resultObject.terrain,
				population: resultObject.population,

			// Films
				episode_id: resultObject.episode_id,
				director: resultObject.director,
				producer: resultObject.producer,
				release_date: resultObject.release_date,
				opening_crawl: resultObject.opening_crawl,
				
			// Vehicles
				model: resultObject.model,
				manufacturer: resultObject.manufacturer,
				length: resultObject.length,
				crew: resultObject.crew,
				consumables: resultObject.consumables
			});
		});
		displayResults();
	}


// Search-bar eventlisener-logic 
	let inputLetters = document.getElementById("searchInput")
	inputLetters.addEventListener('input', () => {
		displayResults(); // Just filter and display results based on the stored data
	});

// Creating stickers and pages and the logic within
	function displayResults() {
		const stickerContainer = document.querySelector('.result-container');
		stickerContainer.innerHTML = '';
		const searchValue = document.getElementById('searchInput').value;

// checking and re-rendering the filtered list on each input
	const filteredObjects = resultArray.filter(result =>
		result.name.toLowerCase().includes(searchValue.toLowerCase()));


	// All the individual Sticker information
		const newSticker = filteredObjects.map(result => ({
			stickerHeader: result.name || result.title,
			stickerText: result.gender || result.climate || result.release_date || result.manufacturer,
			stickerImg: result.stickerImg,
			stickerLogos: result.stickerLogo
		}));


	// Creating the stickers
		newSticker.forEach((sticker) => {
			const mainSticker = document.createElement('button');
			mainSticker.classList.add('main-sticker', 'column--4', 'offset-small--1');
			stickerContainer.appendChild(mainSticker);

			const mainStickerImg = document.createElement('div');
			mainStickerImg.classList.add('main-sticker__img');
			mainSticker.appendChild(mainStickerImg);

			const mainStickerImg1 = document.createElement('div');
			mainStickerImg1.classList.add('main-sticker__img1');
			mainStickerImg.appendChild(mainStickerImg1);

			const img = document.createElement('img');
			img.setAttribute('src', sticker.stickerImg);
			mainStickerImg1.appendChild(img);

			const textContainer = document.createElement('div');
			textContainer.classList.add('main-sticker__text-container');
			mainSticker.appendChild(textContainer);

			const spanElement = document.createElement('span');
			spanElement.textContent = sticker.stickerHeader;
			textContainer.appendChild(spanElement);

			const pElement = document.createElement('p');
			pElement.textContent = sticker.stickerText;
			textContainer.appendChild(pElement);
		});
		document.body.appendChild(stickerContainer);

		const mainStickers = document.querySelectorAll('.main-sticker');

		function filterStickers(event) {
			const clickedElement = event.currentTarget; 
			const stickerInfo = resultArray.find(result => result.name === clickedElement.querySelector('.main-sticker__text-container span').textContent);
		
		// Product-page container
			const productPage = document.createElement('div');
			productPage.classList.add('product-page');
			document.body.appendChild(productPage);

		// Header container
			const picturetwo = document.createElement('div');
			picturetwo.classList.add('product-page__header-container');
			productPage.appendChild(picturetwo);

		// Header image		
			const img2 = document.createElement('img');
			img2.classList.add('product-page__header');
			img2.setAttribute('src', "assets/Star_Wars_Logo.svg.png");
			picturetwo.appendChild(img2);

		// Exit-button
			const exitButton = document.createElement('button');
			exitButton.classList.add('product-page__exit-button');
			exitButton.textContent = 'X';
			productPage.appendChild(exitButton);

			const infoPageName = document.createElement('h1');
			infoPageName.classList.add('info-page-name');
			infoPageName.textContent = (stickerInfo.name)
			productPage.appendChild(infoPageName)

		// Product information container
			const infoContainer = document.createElement('div');
			infoContainer.classList.add('product-page__info-container');
			productPage.appendChild(infoContainer);

		// Picture container
			const pictures = document.createElement('div');
			pictures.classList.add('product-page__picture-container');
			productPage.appendChild(pictures);

		// Image 1
			const img1 = document.createElement('img');
			img1.classList.add('productPictures');
			img1.setAttribute('src', stickerInfo.stickerImg);
			pictures.appendChild(img1);
		
			function appendPropertyInfo(propertyName, propertyValue) {
			
				if (propertyValue !== undefined) {
					const valueDiv = document.createElement('div')
					valueDiv.classList.add('value-container', 'column--2', 'column-small--5');
					infoContainer.appendChild(valueDiv);
			
					const propertyLabel = document.createElement('div');
					propertyLabel.classList.add('info-label');
					propertyLabel.textContent = `${propertyName}:`;
					valueDiv.appendChild(propertyLabel);
			
					const valueParagraph = document.createElement('div');
					valueParagraph.classList.add('info-value');
					valueParagraph.textContent = `${propertyValue}`;
					valueDiv.appendChild(valueParagraph);
				}
			}

			appendPropertyInfo('Height', stickerInfo.height);
			appendPropertyInfo('Mass', stickerInfo.mass);
			appendPropertyInfo('Hair Color', stickerInfo.hair);
			appendPropertyInfo('Gender', stickerInfo.gender);
			appendPropertyInfo('Birth Year', stickerInfo.birth_year);
			appendPropertyInfo('Climate', stickerInfo.climate);
			appendPropertyInfo('Orbital Period', stickerInfo.orbital_period);
			appendPropertyInfo('Gravity', stickerInfo.gravity);
			appendPropertyInfo('Terrain', stickerInfo.terrain);
			appendPropertyInfo('Population', stickerInfo.population);
			appendPropertyInfo('Episode ID', stickerInfo.episode_id);
			appendPropertyInfo('Director', stickerInfo.director);
			appendPropertyInfo('Producer', stickerInfo.producer);
			appendPropertyInfo('Release Date', stickerInfo.release_date);
			appendPropertyInfo('Opening Crawl', stickerInfo.opening_crawl);
			appendPropertyInfo('Model', stickerInfo.model);
			appendPropertyInfo('Manufacturer', stickerInfo.manufacturer);
			appendPropertyInfo('Length', stickerInfo.length);
			appendPropertyInfo('Crew', stickerInfo.crew);
			appendPropertyInfo('Consumables', stickerInfo.consumables);
			
		// Exit button deletes the whole product-page.
			const exitButtonsGrid = document.querySelectorAll('.product-page__exit-button');
			function closeGrid() {
				const productPages = document.querySelectorAll('.product-page');
				productPages.forEach(function (productPage) {
					productPage.remove();
				});
			}
		// Close info-page by clicking X
			exitButtonsGrid.forEach(function (exitButtonGrid) {
				exitButtonGrid.addEventListener('click', closeGrid);
			});
		// close the info-page by pressing escape button
			document.addEventListener('keydown', function (event) {
				if (event.key === 'Escape') {
					closeGrid();
				};
			});
			
		};
			
	// Event listener for creating the spesific productpage for each spesific sticker.
		mainStickers.forEach(function(mainSticker) {
			mainSticker.addEventListener('click', filterStickers);
		});
		
	;}
	
});
