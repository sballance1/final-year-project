document.addEventListener('DOMContentLoaded', () => { 
    const enterButton = document.getElementById('enterButton');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            window.location.href = "course.html";
        }); // the action to attach a new html page to the current page and makes the button functionable
    }

    const courseDropdown = document.getElementById("courseDropdown"); // FIXED: was "dropdown", now matches HTML
    if (courseDropdown) {
        fetch("http://localhost:3000/api/courses")
            .then(res => res.json())
            .then(data => {
                data.forEach(course => {
                    const option = document.createElement("option");
                    option.value = course.course_code;
                    option.textContent = `${course.course_code} - ${course.course_name}`;
                    courseDropdown.appendChild(option);
                });
            })
            .catch(err => console.error("Error loading courses:", err));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // This will prevent a default form submission

        const course = document.getElementById("courseDropdown").value.trim(); // FIXED: was "course", now matches dropdown ID

        const query = `?course=${encodeURI(course)}`;
        window.location.href = "signin.html" + query;
        // This action is taking your details in and once submit is clicked it opens the 
        // new html page
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // This will prevent a default form submission

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("number").value.trim();

        const query = `?firstName=${encodeURI(firstName)}&lastName=${encodeURI(lastName)}&email=${encodeURI(email)}&number=${encodeURI(number)}`;
        window.location.href = "fyp.html" + query;
        // This action is taking your details in and once submit is clicked it opens the 
        // new html page
    });
});

window.addEventListener("load", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get("firstName");

    const greeting = firstName ? `Hello, ${firstName}!` : "Hello!";
    const greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.innerHTML = `<h2>${greeting}</h2>`;
        // This is taking the first name element from above and is printing it on the new webpage
        // and says hello, adds a nice personal touch 
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    // Erasmus universities
    const erasmusDiv = document.getElementById("erasmus-list");
    if (erasmusDiv) {
        try {
            const res = await fetch("http://localhost:3000/api/universities/erasmus");
            const data = await res.json();

            erasmusDiv.innerHTML = data.map(u => `
                <div class="uni">
                    <h3>${u.name}</h3>
                    <p><strong>Country:</strong> ${u.country}</p>
                    <p><strong>Language:</strong> ${u.language}</p>
                    <img src="${u.image}" class="uni-img">
                </div>
            `).join("");
        } catch (err) {
            console.error("Error loading Erasmus universities:", err);
        }
    }

    // Study Abroad universities
    const saDiv = document.getElementById("studyabroad-list");
    if (saDiv) {
        try {
            const res = await fetch("http://localhost:3000/api/universities/studyabroad");
            const data = await res.json();

            saDiv.innerHTML = data.map(u => `
                <div class="uni">
                    <h3>${u.name}</h3>
                    <p><strong>Country:</strong> ${u.country}</p>
                    <p><strong>Language:</strong> ${u.language}</p>
                    <img src="${u.image}" class="uni-img">
                </div>
            `).join("");
        } catch (err) {
            console.error("Error loading Study Abroad universities:", err);
        }
    }
});

