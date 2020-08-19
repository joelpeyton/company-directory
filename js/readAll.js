//import { displayAlert, createTableData } from "./helper.js";

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
        if (jsonResponse.status.code == "200") {
            const employees = jsonResponse.data;
            
            for (let i = 0; i < employees.length; i++ ) {
                createCard(employees[i]);
            }
            
            //displayAlert("Success", "results", 9, employees.length);
        } 
        else {
            //displayAlert("Error", "directory", 7);
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
        const directory = document.getElementById("directory");
        directory.style.display = "none";
        const employee = document.getElementById("employee");
        employee.style.display = "block";
        const container = document.querySelector(".container-fluid");
        container.style.paddingLeft = "0px";
        container.style.paddingRight = "0px";
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

readAll();
