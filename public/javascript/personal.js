// Personal form handler
async function personalFormHandler(event) {
    event.preventDefault();
    // get the information from the sign up form
    const weight = document.querySelector('#weight').value.trim();
    const goal_weight = document.querySelector('#goal_weight').value.trim();
    const user_id = document.querySelector('#user_id').value.trim();
    

    // if all three fields have content
    if (weight && goal_weight) {
        // POST the new user to the user table in the database
        const response = await fetch('/api/personal', {
            method: 'post',
            body: JSON.stringify({
                weight,
                goal_weight,
                user_id
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // when the fetch promise is fufilled, check the response status and convey the results
        if (response.ok) {
            alert('Personal data created');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.personal-form').addEventListener('submit', personalFormHandler);