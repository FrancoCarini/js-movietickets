const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  // If there are selected seats into Local Storage
  if (selectedSeats !== null && selectedSeats.length > 0) {
    // Find into seats array if the index of selected seats are in it
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  // Select movie
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}

populateUI()

let ticketPrice = +movieSelect.value

const updateSelectedCount = () => {
  // Amount of seats that are selected
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  // Copy selected seats (the html element) into an arary
  // Loop through that array and for every seat we ask for the index of the current seat
  // in the original array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

  // Save into Local Storage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Movie change select option
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, ticketPrice)
  updateSelectedCount()
})

// When click on the seats container
container.addEventListener('click', e => {
  // Check if is a seat and is not occupied
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // Add class to select seat
    e.target.classList.toggle('selected')

    // Update count and total price
    updateSelectedCount()
  }
})

// Initial count and total set
updateSelectedCount()