
const preloader = document.querySelector('#preloader')
const form = document.querySelector('form');
const inputSearch = document.querySelector('input[type=text]');
const countriesList = document.querySelector('ul.countriesList');
const selectField = document.querySelector('.selectField');
const selectFieldText = document.querySelector('.selectField p');
const arrowImg = document.querySelector('.selectField img');

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

setTimeout(() => {
    preloader.style.display = 'none';
}, 2000);

form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    if(inputSearch.value.trim() === '' || selectFieldText.textContent.trim() === 'Select Country'){
        messageOne.classList.add('error');
        messageOne.textContent = 'Please add both location and country!!!';
        return;
    }

    fetch(`/weather?location=${inputSearch.value},${selectFieldText.textContent}`).then((res) => {
        res.json().then(data => {
            if(data.error) {
                messageOne.classList.add('error');
                messageOne.textContent = data.error
            } else {
                messageOne.classList.remove('error');
                const {location, country, forecast} = data[0];
                messageOne.innerHTML = `${location}, ${country}`;
                messageTwo.innerHTML = `${forecast}`;
                console.log(data[0].location);
                console.log(data[0].country);
                console.log(data[0].forecast);
            } 
        })
    })
});


// gets a list of countries from backend
const getCountriesList = async () => {
    const res = await fetch('/countries');
    const data = await res.json();

    // sort data in alphabitical order
    data.sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
    })

    data.forEach(country => {
        let newOptionItem = document.createElement('li');
        newOptionItem.innerHTML = `<img class='countryImg' src=${country.flags.svg} />${country.name.common}`;
        countriesList.appendChild(newOptionItem);
    })
}

getCountriesList();


selectField.addEventListener('click', () => {
    countriesList.classList.toggle('hidden');
    arrowImg.classList.toggle('rotate');
})

countriesList.addEventListener('click', e => {
    selectFieldText.textContent = e.target.textContent;
    countriesList.classList.add('hidden');
    arrowImg.classList.remove('rotate');
});

