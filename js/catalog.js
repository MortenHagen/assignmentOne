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
        const characterName = resultObject.name.toLowerCase();
    
        
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
            stickerImg: stickerImgUrl // Add the sticker image URL to the resultObject
        });
    });

    // Call displayResults outside the loop if needed
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
        stickerText: result.id, // Assuming id is defined for all types
        stickerImg: result.stickerImg,
        stickerlogos: result.logo
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
    document.body.appendChild(productPage)
// Exit-button
    const exitButton = document.createElement('button');
    exitButton.classList.add('exit-button__grid');
    exitButton.textContent = 'X';
    productPage.appendChild(exitButton);

// Logo-container
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('product-page__header', 'show', 'offset--8', 'column--2', 'offset-small--5', 'column-small--2');
    productPage.appendChild(logoContainer);

// Logo
    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', stickerInfo.stickerLogos);
    logoContainer.appendChild(logoImg);

// Slideshow-container
    const slideshowContainer = document.createElement('div');
    slideshowContainer.classList.add('product-page__slideshow', 'offset-small--1', 'offset--1', 'column--6');
    productPage.appendChild(slideshowContainer);

// Picture-container
    const pictures = document.createElement('div');
    pictures.classList.add('slideshow__pictures');
    productPage.appendChild(pictures);

// Image 1
    const img1 = document.createElement('img');
    img1.classList.add('productPictures');
    img1.setAttribute('src', stickerInfo.stickerImg);
    pictures.appendChild(img1);
    
// Product information container
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('product-page__info-container', 'offset-small--1', 'offset--7', 'column--4');
    productPage.appendChild(infoContainer);
    infoContainer.innerHTML = `<p>${stickerInfo.name}</p>
    <p>${stickerInfo.height}</p>
    <p>${stickerInfo.mass}</p>
    <p>${stickerInfo.hair}</p>
    <p>${stickerInfo.id}</p>
    <p>${stickerInfo.gender}</p>`
}
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
});}
