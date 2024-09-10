function changeTheme() {
  const toggleTheme = document.querySelector('.header__button-wrapper')

  toggleTheme.addEventListener('click', () => {
    if (document
      .documentElement
      .hasAttribute('data-theme')) {
      document
      .documentElement
      .removeAttribute('data-theme')
      localStorage.removeItem('theme')
    }else{
      document
      .documentElement
      .setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
  })

  if (localStorage.getItem('theme') !== null) {
		document.documentElement.setAttribute('data-theme', 'dark')
	}
}

changeTheme()


const formInput = document.querySelector('.main__header-form-input')

function filterCountries() {
	const countries = document.querySelectorAll('.main__body-card')

	countries.forEach(country => {
		const countryName = country.querySelector('.main__body-title').textContent
		if (
			countryName.trim().toLocaleLowerCase().indexOf(formInput.value) === -1
		) {
			country.style.display = 'none'
		} else {
			country.style.display = 'block'
		}
	})
}

formInput.addEventListener('input', filterCountries)


const formSelect = document.querySelector('.main__header-form-select')

function selectRegion() {
  const region = formSelect.value
  const countries = document.querySelectorAll('.main__body-card')

  countries.forEach(country => {
    const countryRegion = country.querySelector('i').textContent

   if(countryRegion === region || region === 'All') {
      country.style.display = 'block'
    }
    else{
      country.style.display = 'none'
    }
  })
}

formSelect.addEventListener('change', selectRegion)

function showCountries(countries) {
  countries.forEach(country => {
    // console.log(country)
    document.querySelector('.main__body-wrapper').insertAdjacentHTML(
			'afterbegin',
    `<div class="card main__body-card">
      <i style="display: none">${country.continents[0]}</i>
      <img class="main__body-img" src="${country.flags.png}" alt="Flag of ${country.name.common}">
      <div class="card-body main__body-body p-0">
        <h3 class="card-title main__body-title mb-0">
          ${country.name.common}
        </h3>
      </div>
      <ul class="main__body-list mb-0">
        <li class="main__body-list-item population">
          <b>
            Population: ${country.population}
          </b>
        </li>
        <li class="main__body-list-item region">
          <b>
            Region: ${country.region}
          </b>
        </li>
         <li class="main__body-list-item capital">
          <b>
            Capital: ${country.capital} 
          </b>
        </li>
      </ul>
    </div>
    `
		)
  })
}


async function getCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  console.log(data);

  data.sort((a, b) => b.name.common.localeCompare(a.name.common))
  
  showCountries(data)
}

getCountries()

