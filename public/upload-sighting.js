const form = document.getElementById("eventForm");
const formMessageText = document.getElementsByClassName("form-message-text")[0];

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const text = document.getElementById("details").value;
  const title = document.getElementById("title").value;

  if (!location || !text || !title) {
    formMessageText.textContent = `Please complete all fields!`;
    return;
  }

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
    const response = await fetch("./api", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      formMessageText.textContent = "Your sighting was uploaded. View it "
      const link = document.createElement("a")
      link.href = "./sightings.html"
      link.textContent = "here"
      formMessageText.appendChild(link)
      formMessageText.append(".")
      form.reset()
    } else {
      formMessageText.textContent = `The server Ghosted you(!). Please try again.`;
      console.error("Server Error:", response.statusText);
    }
  } catch (error) {
    formMessageText.textContent = `Serious ghouls! Please try again.`;
    // render error message
    console.error("Error:", error);
  }
});

function renderOutcome(outcome = false) {
  const formMessage = document.getElementsByClassName("form-message")[0];
  formMessage.innerHTML = "";
  if (outcome) {
    form.reset();
  }
  const messageToRender = outcome
    ? '<p>Your sighting was uploaded. View it <a href="./sightings.html">here</a>.</p>'
    : "<p>The server Ghosted you(!). Please try again.</p>";
  formMessage.innerHTML = messageToRender;
  // modal with message
}
