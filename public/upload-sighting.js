const form = document.getElementById("eventForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  const location = document.getElementById("location").value;
  const text = document.getElementById("details").value;
  const title = document.getElementById("title").value;
  
  const isoDateString = document.getElementById("datetime").value;
  // Convert the string to a JavaScript Date object
  const date = new Date(isoDateString);
  // Format the date to a readable string
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const readableDate = date.toLocaleString("en-GB", options);
  
  
  // Get form data
  const formData = {
    location: location,
    timeStamp: readableDate,
    text: text,
    title: title,
  };
  
  try {
    // Send form data using fetch API
    const response = await fetch("./api/submit", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    console.log(response, response.ok, response.statusText);
    if (response.ok) {
      renderOutcome(true);
    } else {
      renderOutcome(false);
      console.error("Server Error:", response.statusText);
    }
  } catch (error) {
    renderOutcome(false);
    console.error("Error:", error);
  }
});

function renderOutcome(outcome = false) {
  const formMessage = document.getElementsByClassName("form-message")[0];
  formMessage.innerHTML = "";
  if (outcome) {
    form.reset()
  }
  const messageToRender = outcome
    ? '<p>Your sighting was uploaded. View it <a href="./sightings.html">here</a>.</p>'
    : '<p>The server Ghosted you(!). Please try again.</p>';
    formMessage.innerHTML = messageToRender
  // modal with message
}
