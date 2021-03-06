import { create } from "./create.js"; 
import { update } from "./update.js";
import { deleteEmployee } from "./delete.js";
import { readOne } from "./readOne.js"; 
import { getDepts } from "./structure.js";
import { readAll } from "./readAll.js";

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

function renderPage(page, employee) {
    const structure = document.getElementById("structure");
    const directory = document.getElementById("directory");
    const employeeForm = document.getElementById("employee");
    const container = document.querySelector(".container-fluid");
    const employeeTitle = document.getElementById("employeeTitle");
    const structureBtn = document.getElementById("structureBtn");

    if (page == "edit") {
        displayEditAdd();
        employeeTitle.innerText = "Edit "; 
        removeBtns();
        cancelBtn();
        updateBtn(employee.id);
        deleteBtn(employee.id);
    } else if (page == "add") {
        displayEditAdd();
        employeeTitle.innerText = "Add "; 
        clearForm();
        removeBtns();
        cancelBtn();
        addBtn();
    } else { 
        directory.style.display = "block";
        container.style.paddingLeft = "15px";
        container.style.paddingRight = "15px";

        if (structureBtn.classList.contains("active")) {
            structure.style.display = "block";
            employeeForm.style.display = "none";
            getDepts();
        } else {
            structure.style.display = "none";
            employeeForm.style.display = "none";
            readAll();
        }
    } 

    function displayEditAdd() {
        directory.style.display = "none";
        employeeForm.style.display = "block";
        container.style.paddingLeft = "0px";
        container.style.paddingRight = "0px";
    }
}

function cancelBtn() {
    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.style.display = "inline-block";
    cancelBtn.onclick = function() {
        renderPage("directory");
    }
}

function updateBtn(id) {
    const updateBtn = document.getElementById("updateBtn");
    updateBtn.style.display = "inline-block";
    updateBtn.onclick = function() {
        document.getElementById("confirmText").innerText = "update";
        update(id);
    }
}

function deleteBtn(id) {
    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.style.display = "inline-block";
    deleteBtn.onclick = function() {
        document.getElementById("confirmText").innerText = "delete";
        deleteEmployee(id);
    }
}

function addBtn() {
    const addBtn = document.getElementById("addBtn");
    addBtn.style.display = "inline-block";
    addBtn.onclick = function() {
        document.getElementById("confirmText").innerText = "add";
        create();
    }
}

function removeBtns() {
    const buttons = ["cancelBtn", "updateBtn", "deleteBtn", "addBtn"];
    buttons.forEach(element => {
        document.getElementById(element).style.display = "none";
    });
}

function clearForm() {
    const elements = ["FirstName", "LastName", "JobTitle", "Department", "Email"];
    elements.forEach(element => {
        document.getElementById("employee" + element).value = "";
    });
}

function resetSearchBy() {
    const forms = ["Name", "Department", "Location"];
    
    forms.forEach(formId => {
        const form = document.getElementById("search" + formId);
        if (formId == "Name") {
            form.style.display = "block";
            form.value = "";
        } else {
            form.style.display = "none";
            form.value = 0;
        }
    })
}

function hideEmployeesList() {
    const employeeCollection = document.getElementsByClassName("employeeStructure");
    for (let i = 0; i < employeeCollection.length; i++) {
        employeeCollection[i].style.display = "none";
    }
}

function showAlert(alertType, code, size) {
    const alert = document.querySelector(".alert");
    alert.style.display = "block";
    alert.classList.remove("alert");
    
    alertType == "success" ? alert.className = "alert alert-success fade show" : alert.className = "alert alert-danger fade show";

    switch (code) {
        case 1: 
            alert.innerText = "Employee successfully added.";
            break;
        case 2:
            alert.innerText = "Employee not added.";
            break;
        case 3:
            alert.innerText = "Employee successfully updated.";
            break;
        case 4:
            alert.innerText = "Employee not updated.";
            break;
        case 5:
            alert.innerText = "Employee successfully deleted.";
            break;
        case 6:
            alert.innerText = "Employee not deleted.";
            break;
        case 7:
            alert.innerText = "Unable to access database.";
            break;
        case 8:
            alert.innerText = "No search results found.";
            break;
        case 9:
            alert.innerText = "Number of results found: " + size;
            break;
    }

    setTimeout(function() {
        alert.style.display = "none";
    }, 5000);
}
export { createCard, removeCards, renderPage, clearForm, resetSearchBy, hideEmployeesList, showAlert };