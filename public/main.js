
// Find the favorite buttons on the page.
const favoriteButtons = document.querySelectorAll('.favorite-button'); 
const deleteButtons = document.querySelectorAll('.delete-button'); 


// Listen for a click on each button.
Array.from(favoriteButtons).forEach(function(button) {
  button.addEventListener('click', function() {
    const id = this.dataset.id
    const favorite = this.dataset.favorite === 'true'

    fetch('/songs', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: id,
    favorite: !favorite
  })
})
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Could not update favorite status')
    }

    window.location.reload()
  })
  .catch(function(error) {
    console.error(error)
    alert('Could not update favorite status. Please try again.')
  })
  })
})

// Delete the song whose button was clicked. 
Array.from(deleteButtons).forEach(function(button) {
  button.addEventListener('click', function() {
    const id = this.dataset.id

    fetch('/songs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Could not delete song')
        }

        window.location.reload()
      })
      .catch(function(error) {
        console.error(error)
        alert('Could not delete song. Please try again.')
      })
  })
})