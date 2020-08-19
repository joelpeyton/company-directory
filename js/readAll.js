import { readOne } from "./readOne.js";

// calls php/readAll.php
// returns ALL EMPLOYEES and displays employee cards
function readAll() {
    fetch("php/readAll.php")
    .then(response => {
        if (!response.ok) {
            //displayAlert("Error", "directory", 7);
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
        //displayAlert("Error", "directory", 7);
        console.error("There has been a problem with your fetch operation:", error);
    });
}

function createCard(employee) {
    const employees = document.querySelector("#employees");
    const column = document.createElement("div");
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const list = document.createElement("ul");
    const cardBody = document.createElement("div");
    const button = document.createElement("button");

    cardHeader.className = "card-header";
    cardHeader.innerHTML = "<h5>" + employee.firstName + " " + employee.lastName + "</h5>";

    list.className = "list-group list-group-flush";
    const listItems = [employee.jobTitle, employee.department, employee.location, employee.email];
    const text = ["Job Title: ", "Department: ", "Location: ", "Email: "];
    for (let item in listItems) {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = "<strong>" + text[item] + "</strong>" + listItems[item];
        list.appendChild(listItem);
    }
    
    button.type = "button";
    button.className = "btn btn-secondary";
    button.innerText = "Edit";
    button.onclick = function() {
        readOne(employee.id);
    }

    cardBody.className = "card-body";
    cardBody.appendChild(button);

    card.className = "card";
    card.appendChild(cardHeader);
    card.appendChild(list);
    card.appendChild(cardBody);

    column.className = "col-sm-12 col-md-6 col-lg-4";
    column.appendChild(card);
    employees.appendChild(column);
}

function removeCards() {
    let employees = document.getElementById("employees");
    
    if (employees) {
        employees.remove();
        const directory = document.getElementById("directory");
        employees = document.createElement("div");
        employees.className = "row";
        employees.id = "employees"; 
        directory.appendChild(employees);
    }
}

readAll();

export { readAll };
