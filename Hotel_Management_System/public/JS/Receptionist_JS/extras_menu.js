const items = document.querySelectorAll('.box');
var totalCost = 0.00;

/* wrap up the data */
function createExtraItemsDetailsData(total_fnb_bill) {
    const data = {
        total_fnb_bill: total_fnb_bill,
    };
    return data;
}

var refButton = document.getElementById("extras_btn");
refButton.addEventListener("click", function (event) {
    // Checks if the local storage contains previous data, then resets it
    if (localStorage.getItem('extraItemDetails') != null) {
        console.log("Previous data found in local storage extraItemDetails. Clearing it first before proceeding.")
        localStorage.removeItem('extraItemDetails');
        // Creates a new local storage containing the food and drinks costs
        localStorage.setItem('extraItemDetails', JSON.stringify(createExtraItemsDetailsData(totalCost)));
        const extraItemDetails = localStorage.getItem("extraItemDetails");
        console.log("Created new local storage data for extraItemDetails");
        console.log(extraItemDetails);
        // If no food or drinks are selected, then directs to final checkout page 
        if (totalCost == 0 || totalCost == 0.00 || totalCost == '0') {
            window.location.href = "http://localhost:3000/receptionist/final_checkout.html";

        }
        // If food or drinks are selected, then directs to the payment page for food and drinks
        else {
            window.location.href = "http://localhost:3000/receptionist/payment_of_extras.html";
        }
        
    }
    else {
        // Creates local storage if no existing local storage data is found to have food and drinks cost
        localStorage.setItem('extraItemDetails', JSON.stringify(createExtraItemsDetailsData(totalCost)));
        console.log("No previous data in local storage found for extraItemDetails. Creating fresh..");
        const extraItemDetails = localStorage.getItem("extraItemDetails");
        console.log(extraItemDetails);
        // If no food or drinks are selected, then directs to final checkout page
        if (totalCost == 0 || totalCost == 0.00 || totalCost == '0') {
            console.log(typeof(totalCost));
            window.location.href = "http://localhost:3000/receptionist/final_checkout.html";

        }
        // If food or drinks are selected, then directs to the payment page for food and drinks
        else {
            console.log(totalCost);
            window.location.href = "http://localhost:3000/receptionist/payment_of_extras.html";
        }
    }


    event.preventDefault();
});

// Function to update the item count
function updateItemCount() {
    // Count the number of selected items
    const selectedItems = document.querySelectorAll('.box.selected_item').length;

    // Update the item count display
    document.getElementById('total_items').textContent = selectedItems;
    // Update the items count in cart
    document.getElementById('cart_items').textContent = selectedItems;
}

// Add click event listeners to all item elements
items.forEach(item => {
    item.addEventListener('click', function () {
        // Toggle the 'selected_item' class
        this.classList.toggle('selected_item');

        // Change the background color of the item div when it's selected
        if (this.classList.contains('selected_item')) {
            this.style.backgroundColor = 'rgba(0, 84, 29, 0.38)'; // Change to the color you want when selected

            const getDivs = this;
            const getChildren = getDivs.querySelector('.itemDesc');
            const price = getChildren.querySelector('.price').innerText;

            // Calculate the total cost of food and drinks
            const cost = parseFloat(price) + totalCost;
            console.log('Calculated cost on selection:', cost);
            totalCost = cost;

            // Display the cost
            document.getElementById("total_cost").innerText = totalCost;

        } else {
            this.style.backgroundColor = ''; // Reset to default color when not selected
            const getDivs = this;
            const getChildren = getDivs.querySelector('.itemDesc');
            const price = getChildren.querySelector('.price').innerText;
            
            // Calculate the total cost of food and drinks
            const cost = totalCost - parseFloat(price);
            console.log('Calculated cost on de-selection:', cost);
            totalCost = cost;

            // Display the cost
            document.getElementById("total_cost").innerText = totalCost;

        }

        // Update the item count
        updateItemCount();
    });
});