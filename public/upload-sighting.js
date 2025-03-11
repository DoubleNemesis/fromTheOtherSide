const elem = document.getElementById("eventForm");

elem.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const location = document.getElementById("location").value;
  const text = document.getElementById("details").value;
  
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
    hour12: true,
  };
  const readableDate = date.toLocaleString("en-GB", options);


  // Get form data
  const formData = {
    location: location,
    timeStamp: readableDate,
    text: text,
  };

  try {
    // Send form data using fetch API
    const response = await fetch("./api/submit", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    console.log(response, response.ok);
    if (response.ok) {
      const result = await response.json();
      // console.log('Form submitted successfully!');
      // console.log(result);
      renderModal(true);
    } else {
      renderModal(false);
      // console.log('Error submitting form.');
      console.error("Server Error:", response.statusText);
    }
  } catch (error) {
    renderModal(false);
    // console.log('An error occurred while submitting the form.');
    console.error("Error:", error);
  }
});

function renderModal(outcome = false) {
  const messageToRender = outcome
    ? 'Your sighting was uploaded. View it now on the <a href="./index.html">homepage feed</a>.'
    : "Sorry, that didn't work for some reason. Please try again later.";
  elem.innerHTML = messageToRender;
  // modal with message
}
