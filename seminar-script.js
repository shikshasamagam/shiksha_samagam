document.addEventListener('DOMContentLoaded', function() {
    fetch('seminars.json')
        .then(response => response.json())
        .then(data => {
            const seminarList = document.getElementById('seminar-list');

            data.seminars.forEach(seminar => {
                const seminarEntry = document.createElement('div');
                seminarEntry.className = 'event-entry';

                seminarEntry.innerHTML = `
                    <div>${seminar.name}</div>
                    <div>${formatDate(seminar.date)}</div> 
                    <div>${seminar.location}</div>
                    <div>${seminar.speaker}</div> 
                    <div>${seminar.topic}</div> 
                    <div>
                        <a href="${seminar.registrationLink}" target="_blank" class="register-btn">Register Now</a>
                    </div>
                `;

                seminarList.appendChild(seminarEntry);
            });
        })
        .catch(error => console.error('Error loading seminar data:', error));
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}