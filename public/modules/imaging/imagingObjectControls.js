import { imagingObject } from "./imagingObject.js";

export function setupImageOrdersInput(patientImageOrderArray, legacyPatientImageOrderArray) {
    const imageOrders = []; // Creates an array
    Array.prototype.push.apply(imageOrders, imagingObject()); // Populate imageOrders from imagingObject

    legacyPatientImageOrderArray = [];
    console.log("imgOrders:", imageOrders);

    document.getElementById('imageOrdersInput').addEventListener('input', function() {
        const input = this.value;
        const autocompleteContainer = document.getElementById('autocompleteSuggestionsImaging');
        autocompleteContainer.innerHTML = ''; // Clear existing suggestions

        if (input.trim() !== '') {
            const suggestions = imageOrders.filter(order => order.name.toLowerCase().includes(input.toLowerCase()));
            console.log(imageOrders.name)
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.style.paddingTop = "10px";
                div.style.backgroundColor = "white";
                div.style.color = "black";
                div.style.position= "fixed";
                div.style.zIndex = 1;
                div.style.width = "300px";
                
                div.innerText = suggestion.name;

                div.addEventListener('click', function() {
                    // Check for duplicate orders
                    console.log("clicked!")
                    console.log(patientImageOrderArray)
                    const isDuplicate = patientImageOrderArray.some(order => order.name === suggestion.name);

                    if (isDuplicate) {
                        snackbar('warning', '<b>Warning:</b> Duplicate imaging order found. Order not placed.', 3000);
                    } else {
                        const orderedContainer = document.getElementById('orderedImageContainer');
                        const listItem = document.createElement('div');
                        listItem.innerText = `${suggestion.name}`;
                        listItem.style.paddingTop = "10px";
                        orderedContainer.appendChild(listItem);

                        // Add to patient image order arrays
                        patientImageOrderArray.push({
                            name: `${suggestion.name}`,
                            cost: `${suggestion.cost}`,
                            time: `${suggestion.time}`,
                            description: `${suggestion.description}`,
                        });

                        legacyPatientImageOrderArray.push({
                            name: `${suggestion.name}`,
                            cost: `${suggestion.cost}`,
                            time: `${suggestion.time}`,
                            description: `${suggestion.description}`,
                        });

                        // Assuming 'final' is a predefined object for final orders
                        final.imaging.push({
                            name: `${suggestion.name}`,
                            cost: `${suggestion.cost}`,
                            time: `${suggestion.time}`,
                            description: `${suggestion.description}`,
                        });
                    }

                    // Clear input and suggestions
                    document.getElementById('imageOrdersInput').value = '';
                    autocompleteContainer.innerHTML = '';

                    // Call displayOrders function here
                    displayOrders(legacyPatientImageOrderArray, "resultsImaging");
                    // Reset legacyPatientImageOrderArray after displaying
                    legacyPatientImageOrderArray = [];
                });
                autocompleteContainer.appendChild(div);
            });
        }
    });

    function displayOrders(patientImageOrderArray, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Clear existing orders

        patientImageOrderArray.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.style.paddingTop = "10px";
            orderDiv.innerHTML = `<p>${order.name}: ${order.description}</p>`;
            container.appendChild(orderDiv);
        });
    }

    const errorMessageDuplicates = document.getElementById('errorMessageDuplicates');

    function snackbar(type, msg, time) {
        const para = document.createElement('P');
        para.classList.add('snackbar');
        para.innerHTML = `${msg} <span> &times; </span>`;

        if (type === 'error') {
            para.classList.add('error');
        } else if (type === 'success') {
            para.classList.add('success');
        } else if (type === 'warning') {
            para.classList.add('warning');
        } else if (type === 'info') {
            para.classList.add('info');
        }

        errorMessageDuplicates.appendChild(para);
        para.classList.add('fadeout');

        setTimeout(() => {
            errorMessageDuplicates.removeChild(para);
        }, time);
    }
}
