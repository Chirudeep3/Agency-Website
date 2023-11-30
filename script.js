const inputDate = document.getElementById('demo');
const setDateButton = document.getElementById('setDateButton');
const adminWindow = document.getElementById('adminWindow');
const selectedDateText = document.getElementById('selectedDateText');

setDateButton.addEventListener('click', async () => {
    const selectedDate = inputDate.value;
    if (selectedDate) {
        await addSelectedDate(selectedDate);
        showAdminWindow(selectedDate);
    }
});

async function addSelectedDate(date) {
    const response = await fetch('/add-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
    });
    return response.json();
}

async function getSelectedDates() {
    const response = await fetch('/get-dates');
    return response.json();
}

async function showAdminWindow(date) {
    selectedDateText.textContent = date;
    adminWindow.style.display = 'block';
}

// Fetch previously selected dates and display in the admin window
window.onload = async () => {
    const dates = await getSelectedDates();
    if (dates.length > 0) {
        selectedDateText.textContent = dates.join(', ');
        adminWindow.style.display = 'block';
    }
};
