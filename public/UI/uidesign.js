//REMOVES welcome box once you click on the canvas
        
document.body.onclick = function() {
    setInterval(function() {
        document.getElementById('welcomeContainer').style.display = "none";
        document.getElementById('chatInputContainer').style.display = "block";
    }, 1000);
};

    // Function to open the patient detail section and hide others
function openPatientDetail(patient) {
// Hide all sections
hideAllSections();

// Show the patient detail section
document.getElementById('patientDetail').style.display = 'block';

// Add logic to load patient details based on the patient identifier
console.log('Loading details for', patient);
}

// Function to open the orders section
function openOrders() {
hideAllSections();
document.getElementById('orders').style.display = 'block';
}

// Function to open the results section
function openResults() {
hideAllSections();
document.getElementById('results').style.display = 'block';
}

// Function to open the notes section
function openNotes() {
hideAllSections();
document.getElementById('notes').style.display = 'block';
}

// Function to handle writing a note
function writeNote() {
// Logic to handle note writing
console.log('Writing a new note');
}

// Function to handle reviewing notes
function reviewNotes() {
// Logic to handle reviewing notes
console.log('Reviewing notes');
}

// Helper function to hide all sections
function hideAllSections() {
document.getElementById('patientList').style.display = 'none';
document.getElementById('patientDetail').style.display = 'none';
document.getElementById('orders').style.display = 'none';
document.getElementById('results').style.display = 'none';
document.getElementById('notes').style.display = 'none';
document.getElementById('labOrdersContainer').style.display = 'none';
document.getElementById('resultsVitals').style.display = 'none';
document.getElementById('labOrdersContainer').style.display = 'none';
document.getElementById('resultsLabs').style.display = "none";
document.getElementById('resultsImaging').style.display = "none";
document.getElementById('imageOrdersOuterContainer').style.display = "none";    
document.getElementById('medsOrdersOuterContainer').style.display = "none";  
}

// Optional: Function to show patient list (e.g., a 'back' button)
function showPatientList() {
hideAllSections();
document.getElementById('patientList').style.display = 'block';
}

// Opens labs
function openLabs() {
hideAllSections();
document.getElementById('labOrdersContainer').style.display = 'block';
}

function labOrdersInputBtnfxn() {
// erase div list
// add workload to lab waiting list (after 'x' seconds the labs come back)
// Initiate timer for 'x' which will then populate in another "results" section on the <div>
}

function showVitals() {
document.getElementById('results').style.display = 'none';
document.getElementById('resultsVitals').style.display = 'block';
}

function showLabs() {
hideAllSections();
document.getElementById('resultsLabs').style.display = "block";
}

function showImaging() {
hideAllSections();
document.getElementById('resultsImaging').style.display = "block";
}

function openImagingOrders() {
    hideAllSections(); 
    document.getElementById('imageOrdersOuterContainer').style.display = "block";                                
}

function openMedsOrders() {
    hideAllSections(); 
    document.getElementById('medsOrdersOuterContainer').style.display = "block";  
}