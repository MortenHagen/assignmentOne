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
            height: resultObject.height,
            mass: resultObject.mass,
            hair: resultObject.hair_color,
            gender: resultObject.gender,
            id: resultObject.birth_year,
            logo: stickerLogo,
            stickerImg: stickerImgUrl,
            planets: resultObject.title, 
            episode_id: resultObject.episode_id,
            opening_crawl: resultObject.opening_crawl,
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
        stickerHeader: result.name,
        stickerText: result.id, // Assuming id is defined for all types
        stickerImg: result.stickerImg,
    }));


    // Creating the stickers
    newSticker.forEach((sticker) => {
        const mainSticker = document.createElement('div');
        mainSticker.setAttribute('data-sticker-filter', sticker.stickerAttribute);
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
            // Product information container
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('product-page__info-container', 'offset-small--1', 'offset--7', 'column--4');
        productPage.appendChild(infoContainer);

        if (stickerInfo.name !== undefined) {
            const nameParagraph = document.createElement('p');
            nameParagraph.textContent = `Name: ${stickerInfo.name}`;
            infoContainer.appendChild(nameParagraph);
        }
        
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
        
        if (stickerInfo.logo !== undefined) {
            const logoParagraph = document.createElement('p');
            logoParagraph.textContent = `Logo: ${stickerInfo.logo}`;
            infoContainer.appendChild(logoParagraph);
        }
        
        if (stickerInfo.planets !== undefined) {
            const planetsParagraph = document.createElement('p');
            planetsParagraph.textContent = `Planets: ${stickerInfo.planets}`;
            infoContainer.appendChild(planetsParagraph);
        }
        
        if (stickerInfo.episode_id !== undefined) {
            const episodeIdParagraph = document.createElement('p');
            episodeIdParagraph.textContent = `Episode ID: ${stickerInfo.episode_id}`;
            infoContainer.appendChild(episodeIdParagraph);
        }
        
        if (stickerInfo.opening_crawl !== undefined) {
            const openingCrawlParagraph = document.createElement('p');
            openingCrawlParagraph.textContent = `Opening Crawl: ${stickerInfo.opening_crawl}`;
            infoContainer.appendChild(openingCrawlParagraph);
        }
    // Exit-button
        const exitButton = document.createElement('button');
        exitButton.classList.add('exit-button__grid');
        exitButton.textContent = 'X';
        productPage.appendChild(exitButton);
    // Picture
        const pictures = document.createElement('div');
        pictures.classList.add('slideshow__pictures');
        productPage.appendChild(pictures);
    // Image 1
        const img1 = document.createElement('img');
        img1.classList.add('productPictures');
        img1.setAttribute('src', stickerInfo.stickerImg);
        pictures.appendChild(img1);
    }

    // Rest of your code...

// Exit button deletes the whole product-page.
    const exitButtonsGrid = document.querySelectorAll('.exit-button__grid');
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
