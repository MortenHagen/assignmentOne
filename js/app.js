document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".main-menu button");
    const images = document.querySelectorAll(".picture-container img");

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

    const buttons = document.querySelectorAll('button[data-menu]');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedValue = this.dataset.menu;
            localStorage.setItem('storedValue', selectedValue);
            console.log("Stored Value:", selectedValue); // Just for testing, you can remove this line
        });
    });

let countryName = "";
let resultArray = [];
let stickerContainer;
let category = "";
let apiData = {}; // New variable to store fetched API data


		
const storedValue = localStorage.getItem('storedValue');
	if (storedValue) {
		console.log("Stored Value (Retrieved on page load):", storedValue); // Just for testing, you can remove this line
	}

function getData() {
	const url = `https://swapi.dev/api/${storedValue}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			apiData[category] = data; // Store the fetched data
			renderDatas(data);
			console.log(data);
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
}
getData();

function renderDatas(data) {
	console.log(data);
	resultArray = [];
	if (stickerContainer) {
		stickerContainer.remove();
	}
	
	data.results.forEach(resultObject => {
		// Extract the name and convert it to lowercase
		const characterName = (resultObject.name || resultObject.title).toLowerCase();
	
		// Construct the image URL based on the character's name
		const stickerImgUrl = `assets/${characterName}.jpg`;
		const stickerLogo = "assets/Star_Wars_Logo.svg.png";

		resultArray.push({
			name: resultObject.name || resultObject.title,

		// People
			height: resultObject.height,
			mass: resultObject.mass,
			hair: resultObject.hair_color,
			gender: resultObject.gender,
			id: resultObject.birth_year,
			stickerImg: stickerImgUrl,

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



let inputLetters = document.getElementById("searchInput")
inputLetters.addEventListener('input', () => {
	displayResults(); // Just filter and display results based on the stored data
});

function displayResults() {
	const stickerContainer = document.querySelector('.result-container');
	stickerContainer.innerHTML = '';

	const searchValue = document.getElementById('searchInput').value;

	const filteredObjects = resultArray.filter(result =>
		result.name.toLowerCase().includes(searchValue.toLowerCase())
	);

	// All the individual Sticker information
	const newSticker = filteredObjects.map(result => ({
		stickerHeader: result.name || result.title,
		stickerText: result.gender || result.climate || result.release_date || result.model,// Assuming id is defined for all types
		stickerImg: result.stickerImg,
	}));


	// Creating the stickers
	newSticker.forEach((sticker) => {
		const mainSticker = document.createElement('div');
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
	}
	
	);

	document.body.appendChild(stickerContainer);

// Creating the productpage and it's functions/logic within.
const mainStickers = document.querySelectorAll('.main-sticker');




function filterStickers(event) {
	const clickedElement = event.target;
	const stickerInfo = resultArray.find(result => result.name === clickedElement.querySelector('.main-sticker__text-container span').textContent);

	if (stickerInfo) {

	// Product-page container
		const productPage = document.createElement('div');
		productPage.classList.add('product-page');
		document.body.appendChild(productPage);

		// Exit-button
		const exitButton = document.createElement('button');
		exitButton.classList.add('product-page__exit-button');
		exitButton.textContent = 'X';
		productPage.appendChild(exitButton);

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


		if (stickerInfo.height !== undefined) {
			const heightParagraph = document.createElement('p');
			heightParagraph.textContent = `Height: ${stickerInfo.height}`;
			infoContainer.appendChild(heightParagraph);
		}
		
		if (stickerInfo.mass !== undefined) {
			const massParagraph = document.createElement('p');
			massParagraph.textContent = `Mass: ${stickerInfo.mass}`;
			infoContainer.appendChild(massParagraph);
		}
		
		if (stickerInfo.hair !== undefined) {
			const hairParagraph = document.createElement('p');
			hairParagraph.textContent = `Hair Color: ${stickerInfo.hair}`;
			infoContainer.appendChild(hairParagraph);
		}
		
		if (stickerInfo.gender !== undefined) {
			const genderParagraph = document.createElement('p');
			genderParagraph.textContent = `Gender: ${stickerInfo.gender}`;
			infoContainer.appendChild(genderParagraph);
		}
		
		if (stickerInfo.id !== undefined) {
			const idParagraph = document.createElement('p');
			idParagraph.textContent = `Birth Year: ${stickerInfo.id}`;
			infoContainer.appendChild(idParagraph);
		}
		
		if (stickerInfo.climate !== undefined) {
			const climateParagraph = document.createElement('p');
			climateParagraph.textContent = `Climate: ${stickerInfo.climate}`;
			infoContainer.appendChild(climateParagraph);
		}
		
		if (stickerInfo.orbital_period !== undefined) {
			const orbitalPeriodParagraph = document.createElement('p');
			orbitalPeriodParagraph.textContent = `Orbital Period: ${stickerInfo.orbital_period}`;
			infoContainer.appendChild(orbitalPeriodParagraph);
		}
		
		if (stickerInfo.gravity !== undefined) {
			const gravityParagraph = document.createElement('p');
			gravityParagraph.textContent = `Gravity: ${stickerInfo.gravity}`;
			infoContainer.appendChild(gravityParagraph);
		}
		
		if (stickerInfo.terrain !== undefined) {
			const terrainParagraph = document.createElement('p');
			terrainParagraph.textContent = `Terrain: ${stickerInfo.terrain}`;
			infoContainer.appendChild(terrainParagraph);
		}
		
		if (stickerInfo.population !== undefined) {
			const populationParagraph = document.createElement('p');
			populationParagraph.textContent = `Population: ${stickerInfo.population}`;
			infoContainer.appendChild(populationParagraph);
		}
		
		if (stickerInfo.episode_id !== undefined) {
			const episodeIdParagraph = document.createElement('p');
			episodeIdParagraph.textContent = `Episode ID: ${stickerInfo.episode_id}`;
			infoContainer.appendChild(episodeIdParagraph);
		}
		
		if (stickerInfo.director !== undefined) {
			const directorParagraph = document.createElement('p');
			directorParagraph.textContent = `Director: ${stickerInfo.director}`;
			infoContainer.appendChild(directorParagraph);
		}
		
		if (stickerInfo.producer !== undefined) {
			const producerParagraph = document.createElement('p');
			producerParagraph.textContent = `Producer: ${stickerInfo.producer}`;
			infoContainer.appendChild(producerParagraph);
		}
		
		if (stickerInfo.release_date !== undefined) {
			const releaseDateParagraph = document.createElement('p');
			releaseDateParagraph.textContent = `Release Date: ${stickerInfo.release_date}`;
			infoContainer.appendChild(releaseDateParagraph);
		}
		
		if (stickerInfo.opening_crawl !== undefined) {
			const openingCrawlParagraph = document.createElement('p');
			openingCrawlParagraph.textContent = `Opening Crawl: ${stickerInfo.opening_crawl}`;
			infoContainer.appendChild(openingCrawlParagraph);
		}
		
		if (stickerInfo.model !== undefined) {
			const modelParagraph = document.createElement('p');
			modelParagraph.textContent = `Model: ${stickerInfo.model}`;
			infoContainer.appendChild(modelParagraph);
		}
		
		if (stickerInfo.manufacturer !== undefined) {
			const manufacturerParagraph = document.createElement('p');
			manufacturerParagraph.textContent = `Manufacturer: ${stickerInfo.manufacturer}`;
			infoContainer.appendChild(manufacturerParagraph);
		}
		
		if (stickerInfo.length !== undefined) {
			const lengthParagraph = document.createElement('p');
			lengthParagraph.textContent = `Length: ${stickerInfo.length}`;
			infoContainer.appendChild(lengthParagraph);
		}
		
		if (stickerInfo.crew !== undefined) {
			const crewParagraph = document.createElement('p');
			crewParagraph.textContent = `Crew: ${stickerInfo.crew}`;
			infoContainer.appendChild(crewParagraph);
		}
		
		if (stickerInfo.consumables !== undefined) {
			const consumablesParagraph = document.createElement('p');
			consumablesParagraph.textContent = `Consumables: ${stickerInfo.consumables}`;
			infoContainer.appendChild(consumablesParagraph);
		}
		

	}

	// Rest of your code...

// Exit button deletes the whole product-page.
	const exitButtonsGrid = document.querySelectorAll('.product-page__exit-button');
	function closeGrid() {
		const productPages = document.querySelectorAll('.product-page');
		productPages.forEach(function (productPage) {
			productPage.remove();
		});
	}
	exitButtonsGrid.forEach(function (exitButtonGrid) {
		exitButtonGrid.addEventListener('click', closeGrid);
	});
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			closeGrid();
		}
	});
};
		

// Event listener for creating the spesific productpage for each spesific sticker.
mainStickers.forEach(function(mainSticker) {
	mainSticker.addEventListener('click', filterStickers);
	})
;}
});
