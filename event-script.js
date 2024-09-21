document.addEventListener('DOMContentLoaded', function () {
    const pageType = determinePageType();
    if (pageType === 'hackathon') {
        fetchData('hackathons.json', 'hackathon-list', pageType);
    } else if (pageType === 'fest') {
        fetchData('fests.json', 'fest-list', pageType);
    }
});

function determinePageType() {
    if (document.getElementById('hackathon-list')) {
        return 'hackathon';
    } else if (document.getElementById('fest-list')) {
        return 'fest';
    }
    return null;
}

function fetchData(dataUrl, listId, pageType) {
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            const eventList = document.getElementById(listId);
            const eventsKey = Object.keys(data)[0];

            data[eventsKey].forEach(event => {
                const eventEntry = document.createElement('div');
                eventEntry.className = 'hackathon-entry';

                let eventHTML = `
                    <div>${event.name}</div>
                    <div>
                        <p>Start: ${formatDate(event.startDate)}</p>
                        <p>End: ${formatDate(event.endDate)}</p>
                    </div>
                    <div>${event.location}</div>
                `;

                if (pageType === 'hackathon') {
                    eventHTML += `
                        <div>${event.price}</div>
                        <div>${event.theme}</div>
                        <div>${event.teamSize}</div>
                    `;
                } else if (pageType === 'fest') {
                    eventHTML += `
                        <div>${event.keyPerformances}</div>
                        <div>${event.competitions}</div>
                        <div>${event.culturalPrograms}</div>
                    `;
                }

                eventHTML += `
                    <div>
                        <a href="${event.registrationLink}" target="_blank" class="register-btn">Register Now</a>
                    </div>
                `;

                eventEntry.innerHTML = eventHTML;
                eventList.appendChild(eventEntry);
            });
        })
        .catch(error => console.error(`Error loading ${pageType} data:`, error));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}