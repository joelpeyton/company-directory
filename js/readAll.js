import { createCard, removeCards, showAlert } from "./helper.js";

// calls php/readAll.php
// returns ALL EMPLOYEES and displays employee cards
function readAll() {
    fetch("php/readAll.php")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        removeCards();
        const employees = jsonResponse.data;    
        for (let i = 0; i < employees.length; i++ ) {
            createCard(employees[i]);
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });
}

export { readAll };
