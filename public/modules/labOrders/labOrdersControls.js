// Import the lab orders from labOrders.js
import { LO } from "./labOrders.js";

// Assuming patientLabOrderArray is an array to store selected lab orders
export function setupLabOrdersInput(patientLabOrderArray, legacyPatientLabOrderArray) {
    const labOrders = []; // creates an array
    Array.prototype.push.apply(labOrders, LO()); // Populate labOrders from LO
    // console.log(patientLabOrderArray, "is what it starts as")

    legacyPatientLabOrderArray = [];
    console.log("legacy: ", legacyPatientLabOrderArray)

    document.getElementById('labOrdersInput').addEventListener('input', function() {
        const input = this.value;
        const autocompleteContainer = document.getElementById('autocompleteSuggestions');
        autocompleteContainer.innerHTML = ''; // Clear existing suggestions

        if (input.trim() !== '') {
            const suggestions = labOrders.filter(order => order.name.toLowerCase().includes(input.toLowerCase()));

            suggestions.forEach(suggestion => {

                const div = document.createElement('div');
                div.style.paddingTop = "10px";
                div.innerText = suggestion.name;
                div.addEventListener('click', function() {
                    // Handle the selection of a suggestion
                    const isDuplicate = patientLabOrderArray.some(order => order.name === suggestion.name);
//creates a const that checks for duplicates
                    if (isDuplicate) {
                        (()=>{
                            snackbar('warning', '<b>Warning:</b> Duplicate order found. Order not placed.', 3000);
                        })();
                    }
                    if (!isDuplicate) { //checks to see if there is a duplicate before moving on with below
                        
                        const orderedListContainer = document.getElementById('orderedLabsListContainer'); //creates a variable referencing the location
                        const listItem = document.createElement('div'); //creates a new element "div"
                        listItem.innerText = `${suggestion.name}`//Adds the name to the newly created "div"
                        listItem.style.paddingTop = "10px"; //font-size
                        orderedListContainer.appendChild(listItem); //appends the new "div"

                        // If it's not a duplicate, add it to the array
                        patientLabOrderArray.push({
                            name: `${suggestion.name}`,
                            cost: `${suggestion.cost}`, 
                            time: `${suggestion.time}`,
                            actualValue: `${suggestion.actualValue}`,
                        });
                    

                        legacyPatientLabOrderArray.push({
                            name: `${suggestion.name}`,
                            cost: `${suggestion.cost}`, 
                            time: `${suggestion.time}`,
                            actualValue: `${suggestion.actualValue}`,
                        })

                        final.labs.push({
                            name: `${suggestion.name}`,
                            cost: `${suggestion.cost}`, 
                            time: `${suggestion.time}`,
                            actualValue: `${suggestion.actualValue}`,
                        })
                        // console.log("legacy post-push:", legacyPatientLabOrderArray)
                    }
                    // console.log(patientLabOrderArray[patientLabOrderArray.length-1]["time"]);
                    // console.log("This is from the other thing (new)", patientLabOrderArray);

                    // Clear input and suggestions
                    document.getElementById('labOrdersInput').value = '';
                    autocompleteContainer.innerHTML = '';

                    function displayLabOrders(patientLabOrderArray, containerId) {
                        // Select the container element

                        // document.getElementById('resultsLabs').innerHTML = ""

                        const container = document.getElementById(containerId);
                        // console.log("DISPLAYLABORDERS ACTIVATED")
                      
                        legacyPatientLabOrderArray.forEach((order) => {
                          // Create a placeholder for the lab order
                          const orderDiv = document.createElement('div');
                          orderDiv.innerHTML = `<p>${order.name} is pending...</p>`;
                          container.appendChild(orderDiv);
                          console.log(orderDiv.innerHTML)
                      
                          // Set a timeout to update the lab order after the set time
                          setTimeout(() => {
                            // Parse the actualValue string into individual items
                            const values = order.actualValue.split(',');
                            const listItems = values.map(value => `<li>${value.trim()}</li>`).join('');
                            
                            // Update the lab order display
                            orderDiv.innerHTML = `<div style="color: white">${order.name}</div><ul>${listItems}<hr/><hr/></ul>`;
                          }, order.time * 30000); // Convert minutes to milliseconds
                        });
                      }
    
                    displayLabOrders(legacyPatientLabOrderArray, "resultsLabs")
                    legacyPatientLabOrderArray=[];
                    
                });
                autocompleteContainer.appendChild(div);
                
                // //Now I will create a running list of lab results from this encounter
                // const resultDiv = document.getElementById('resultLabsContainer');

                // // Iterate through the array
                // patientLabOrderArray[patientLabOrderArray.length-1]["actualValue"].forEach((item, index) => {

                //     // Create a text node for each element
                //     const textNode = document.createTextNode(item);
                
                //     // Append the text node to the div
                //     resultDiv.appendChild(textNode);
                
                //     // Optionally, append a separator (like a line break) if not the last element
                //     if (index < arr.length - 1) {
                //     resultDiv.appendChild(document.createElement('br'));
                //     }
                // });

            
            });
        }
    })
    

function snackbar(type, msg, time){
    const para = document.createElement('P');
    para.classList.add('snackbar');
    para.innerHTML = `${msg} <span> &times </span>`;

    if(type === 'error'){
        para.classList.add('error');
    }
    else if(type ==='success'){
        para.classList.add('success');
    }
    else if(type ==='warning'){
        para.classList.add('warning');
    }
    else if(type ==='info'){
        para.classList.add('info');
    }

    errorMessageDuplicates.appendChild(para);
    para.classList.add('fadeout');

    setTimeout(()=>{
            errorMessageDuplicates.removeChild(para)
    }, time)

}
const errorMessageDuplicates = document.getElementById('errorMessageDuplicates');
} 
    


export function showLabs(patientLabOrderArray) {
    // console.log("You ordered", patientLabOrderArray[patientLabOrderArray.length-1]["name"], "which will take", patientLabOrderArray[patientLabOrderArray.length-1]["time"], "hours to result.")
    console.log("This is what im looking for", patientLabOrderArray)
}