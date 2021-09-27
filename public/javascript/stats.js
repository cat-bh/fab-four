// Stats form handler
async function statsFormHandler(event) {
    event.preventDefault();
    // get the information from the sign up form
    const activity = document.querySelector('#activity').value.trim();
    const distance = document.querySelector('#distance').value.trim();
    const calories_burned = document.querySelector('#calories_burned').value.trim();
    const calories_intake = document.querySelector('#calories_intake').value.trim();
    const water = document.querySelector('#water').value.trim();
    const user_id = document.querySelector('#user_id').value.trim();
    

    // if all three fields have content
    if (activity && distance) {
        // POST the new user to the user table in the database
        const response = await fetch('/api/stats', {
            method: 'post',
            body: JSON.stringify({
                activity,
                distance,
                calories_burned,
                calories_intake,
                water,
                user_id
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // when the fetch promise is fufilled, check the response status and convey the results
        if (response.ok) {
            alert('Stats data created');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.stats-form').addEventListener('submit', statsFormHandler);