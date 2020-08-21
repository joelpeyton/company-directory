import { createCard, removeCards, renderPage } from "./helper.js";

function searchEvents() {
    const searchNameBtn = document.getElementById("searchNameBtn");
    searchNameBtn.onclick = function(event) {
        searchBy(event);
    };

    const searchDeptBtn = document.getElementById("searchDepartmentBtn");
    searchDeptBtn.onclick = function(event) {
        searchBy(event);
    };

    const searchLocationBtn = document.getElementById("searchLocationBtn");
    searchLocationBtn.onclick = function(event) {
        searchBy(event);
    };
}

function searchBy(event) {
    const btnId = event.target.id.slice(6, -3);
    const forms = ["Name", "Department", "Location"];
    
    forms.forEach(formId => {
        const form = document.getElementById("search" + formId);
        if (formId == btnId) {
            form.style.display = "block";
            form.value = formId == "Name" ? "" : 0;
        } else {
            form.style.display = "none";
        }
    })
}

function nameSearch() {
    const search = document.getElementById("searchName");
    search.oninput = function(event) {
        event.preventDefault();
        
        fetch("php/search.php?lastName=" + event.target.value)
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
    };
}

function deptSearch() {
    const search = document.getElementById("searchDepartment");
    search.onchange = function(event) {
        event.preventDefault();
        
        fetch("php/search.php?deptID=" + event.target.value)
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
    };
}

function locationSearch() {
    const search = document.getElementById("searchLocation");
    search.onchange = function(event) {
        event.preventDefault();
        
        fetch("php/search.php?location=" + event.target.value)
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
    };
}

export { nameSearch, deptSearch, locationSearch, searchEvents };