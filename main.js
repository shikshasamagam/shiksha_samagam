// Add JS here
// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    adjustGridBorderColor();
});

// Adjust Grid Border Color Based on Mode
function adjustGridBorderColor() {
    const isDarkMode = body.classList.contains('dark-mode');
    const gridBorderColor = isDarkMode ? '#ffffff' : '#000000';
    document.querySelectorAll('.features-grid, .material-grid').forEach(grid => {
        grid.style.borderColor = gridBorderColor;
    });
}

// Animated Background Elements
const animatedBackground = document.getElementById('animated-background');

function createAnimatedElement() {
    const elem = document.createElement('div');
    elem.className = 'animated-elem';
    elem.style.left = `${Math.random() * 100}vw`;
    animatedBackground.appendChild(elem);

    setTimeout(() => {
        animatedBackground.removeChild(elem);
    }, 5000);
}

setInterval(createAnimatedElement, 1000);

// Populate Subjects Based on Branch and Semester
const branchSelect = document.getElementById('branchSelect');
const semesterSelect = document.getElementById('semesterSelect');
const subjectSelect = document.getElementById('subjectSelect');
const semesterContainer = document.getElementById('semesterContainer');
const subjectContainer = document.getElementById('subjectContainer');
const goButton = document.getElementById('goButton');

const subjects = {
    cse: {
        1: ["Mathematics 1", "Physics", "Chemistry", "Programming in C", "Engineering Graphics"],
        2: ["Mathematics 2", "Electrical Engineering", "Mechanical Engineering", "Data Structures", "Digital Logic"],
        // Add more semesters and subjects for CSE
    },
    ece: {
        1: ["Mathematics 1", "Physics", "Chemistry", "Programming in C", "Engineering Graphics"],
        2: ["Mathematics 2", "Electrical Engineering", "Electronic Devices", "Network Analysis", "Signals and Systems"],
        // Add more semesters and subjects for ECE
    },
    // Add more branches and subjects
};

branchSelect.addEventListener('change', () => {
    const branch = branchSelect.value;
    if (branch) {
        semesterContainer.classList.remove('hidden');
    } else {
        semesterContainer.classList.add('hidden');
        subjectContainer.classList.add('hidden');
        goButton.classList.add('hidden');
    }
    semesterSelect.value = '';
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
});

semesterSelect.addEventListener('change', () => {
    const branch = branchSelect.value;
    const semester = semesterSelect.value;
    if (branch && semester) {
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
        subjects[branch][semester].forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.toLowerCase().replace(/ /g, '-');
            option.textContent = subject;
            subjectSelect.appendChild(option);
        });
        subjectContainer.classList.remove('hidden');
        goButton.classList.remove('hidden');
    } else {
        subjectContainer.classList.add('hidden');
        goButton.classList.add('hidden');
    }
});

goButton.addEventListener('click', () => {
    const branch = branchSelect.value;
    const semester = semesterSelect.value;
    const subject = subjectSelect.value;

    if (branch && semester && subject) {
        // Logic to display study materials based on selected branch, semester, and subject
        alert(`Selected Branch: ${branch}, Semester: ${semester}, Subject: ${subject}`);
    }
});
