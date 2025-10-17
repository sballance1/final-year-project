document.addEventListener('DOMContentLoaded', () => { 
    const enterButton = document.getElementById('enterButton');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            window.location.href = "signin.html";
        }); // the action to attach a new html page to the current page and makes the button functionable
    }
});

    document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // This will prevent a default form submission

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();


    const query = `?firstName=${encodeURI(firstName)}&lastName=${encodeURI(lastName)}&email=${encodeURI(email)}`;
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
    //  and says hello, adds a nice personal touch 
  }
});
