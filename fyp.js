document.addEventListener('DOMContentLoaded', () => { 
    const enterButton = document.getElementById('enterButton'); // enter button that goes to course.html page 
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            window.location.href = "course.html";
        });
    }

    const courseDropdown = document.getElementById("courseDropdown"); // loads course options into dropdown
    if (courseDropdown) {
        fetch("http://localhost:3000/api/courses") // gets course data from backend
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

document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backButton"); // backbutton to go back to fyp.html when in the chat.html
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "fyp.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    if (!form) return;

    form.addEventListener("submit", (e) => { // allows to open the next html file once course is selected and submitted
        e.preventDefault();

        if (document.getElementById("courseDropdown")) {  
            const course = document.getElementById("courseDropdown").value.trim();
            window.location.href = "signin.html?course=" + encodeURI(course);
            return;
        }
        // collects user details 
        const firstName = document.getElementById("firstName").value.trim();
        localStorage.setItem("username", firstName); // saves first name to later display on fyp.html
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("number").value.trim();

        const query = `?firstName=${encodeURI(firstName)}&lastName=${encodeURI(lastName)}&email=${encodeURI(email)}&number=${encodeURI(number)}`;
        window.location.href = "fyp.html" + query;
    });
});

window.addEventListener("load", function () { // displays the first name saved from local storage in previous code 
    const urlParams = new URLSearchParams(window.location.search);
    let firstName = urlParams.get("firstName");

    if (!firstName) {
        firstName = localStorage.getItem("username");
    }

    const greeting = firstName ? `Hello, ${firstName}!` : "Hello!";
    const greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.innerHTML = `<h2>${greeting}</h2>`;
    }
});


document.addEventListener("DOMContentLoaded", async () => { 
    const erasmusDiv = document.getElementById("erasmus-list");
    if (erasmusDiv) {
        try {
            const res = await fetch("http://localhost:3000/api/universities/erasmus");
            const data = await res.json();
            // displays university info from db
            erasmusDiv.innerHTML = data.map(u => ` 
                <div class="uni">
                    <h3>${u.name}</h3>
                    <p><strong>Country:</strong> ${u.country}</p>
                    <p><strong>Language:</strong> ${u.language}</p>
                    <p>${u.overview}</p>
                    <a href="${u.website}" target="_blank">Partner University Website</a>
                    <img src="${u.image}" class="uni-img">
                    <a href="chat.html" class="chat-link">Chat with current student</a>
                </div>
            `).join("");
        } catch (err) {
            console.error("Error loading Erasmus universities:", err);
        }
    }

    const saDiv = document.getElementById("studyabroad-list");
    if (saDiv) {
        try {
            const res = await fetch("http://localhost:3000/api/universities/studyabroad");
            const data = await res.json();
            // displays info from db 
            saDiv.innerHTML = data.map(u => ` 
                <div class="uni">
                    <h3>${u.name}</h3>
                    <p><strong>Country:</strong> ${u.country}</p>
                    <p><strong>Language:</strong> ${u.language}</p>
                    <p>${u.overview}</p>
                    <a href="${u.website}" target="_blank">Parter University Website</a>
                    <img src="${u.image}" class="uni-img">
                    <a href="chat.html" class="chat-link">Chat with current student</a>
                </div>
            `).join("");
        } catch (err) {
            console.error("Error loading Study Abroad universities:", err);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => { //chatbox feature
    const submitBtn = document.getElementById('submit');
    const input = document.getElementById('todo');
    const list = document.getElementById('list');

    if (submitBtn && input && list) {

       function addTodo() { // function to add message to the chatbox
    const text = input.value.trim();
    if (text === "") return;

    //add user's message
    const newElement = document.createElement('li');
    newElement.className = 'listItem self';
    newElement.textContent = text;
    list.appendChild(newElement);

    list.scrollTop = list.scrollHeight;
    input.value = "";

    // automatic reply after 600ms
    setTimeout(() => {
        const reply = document.createElement('li');
        reply.className = 'listItem reply';
        reply.textContent = "Thanks for your message! A student will get back to you soon.";
        list.appendChild(reply);
        list.scrollTop = list.scrollHeight;
    }, 600);
}


        

        submitBtn.addEventListener('click', addTodo);

        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTodo();
            }
        });
    }
});
