// ----------------------- NASA API key -------------------------------
let apiKey = 'caSE0mGUEJ4bgYF3vb2Qv8N2Pd9jzHPVX8bB9w01';

// ----------------------- Show Loading -------------------------------
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

async function getData(date) {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    showLoading();
    try {    
        let result = await fetch(url);
        let jsonResult = await result.json();

// ----------------------- Get json result ----------------------------
        console.log("Raw JSON data from NASA API:", jsonResult);

        let title = jsonResult.title;
        let mediaUrl = jsonResult.url;
        let explanation = jsonResult.explanation;
        let mediaType = jsonResult.media_type;

        console.log("Title:", title);
        console.log("Media URL:", mediaUrl);
        console.log("Explanation:", explanation);
        console.log("Media Type:", mediaType);
        
        // NASA APOD information
        const content = document.querySelector("#apod-info");
        
        // Including Media APOD
        content.innerHTML = `
            <h2 class="apod-title">${title}</h2>
            ${mediaType === 'image' 
                ? `<img src="${mediaUrl}" alt="NASA Astronomy Picture of the Day" class="apod-media apod-image">`
                : `<iframe src="${mediaUrl}" class="apod-media apod-video" allowfullscreen></iframe>`
            }
            <p class="apod-explanation">${explanation}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.querySelector("#apod-info").innerHTML = `<p>Error loading APOD data: ${error.message}. Please try again later.</p>`;
    } finally {
        hideLoading();
    }
}

// ----------------------- Select Date Button ---------------------------
function handleFetchClick() {
    const datePicker = document.querySelector("#date-picker");
    const selectedDate = datePicker.value;
    
    if (selectedDate) {
        getData(selectedDate);
    } else {
        alert("Please select a date first.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.querySelector("#fetch-apod");
    const datePicker = document.querySelector("#date-picker");
    
    // Date constraints
    const today = new Date();
    const maxDate = today.toISOString().split("T")[0];
    datePicker.max = maxDate;
    datePicker.min = "1995-06-16";
    datePicker.value = maxDate;

    fetchButton.addEventListener('click', handleFetchClick);

    // Start loading when entered
    handleFetchClick();
});