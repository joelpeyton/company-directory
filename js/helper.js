import { create } from "./create.js"; 
import { update } from "./update.js";
import { deleteEmployee } from "./delete.js";
import { readAll } from "./readAll.js";

function renderPage(page, employee) {
    const directory = document.getElementById("directory");
    const employeeForm = document.getElementById("employee");
    const container = document.querySelector(".container-fluid");
    const employeeTitle = document.getElementById("employeeTitle");

    if (page == "edit" || page == "add") {
        directory.style.display = "none";
        employeeForm.style.display = "block";
        container.style.paddingLeft = "0px";
        container.style.paddingRight = "0px";
        removeBtns();
    } else {
        directory.style.display = "block";
        employeeForm.style.display = "none";
        container.style.paddingLeft = "15px";
        container.style.paddingRight = "15px";
    }

    if (page == "edit") {
        employeeTitle.innerText = "Edit "; 
        cancelBtn();
        updateBtn(employee.id);
        deleteBtn(employee.id);
    } else {
        employeeTitle.innerText = "Add "; 
        clearForm();
        cancelBtn();
        addBtn();
    }
}

function cancelBtn() {
    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.style.display = "inline-block";
    cancelBtn.onclick = function() {
        renderPage("directory");
        readAll();
    }
}

function updateBtn(id) {
    const updateBtn = document.getElementById("updateBtn");
    updateBtn.style.display = "inline-block";
    updateBtn.onclick = function() {
        update(id);
    }
}

function deleteBtn(id) {
    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.style.display = "inline-block";
    deleteBtn.onclick = function() {
        deleteEmployee(id);
    }
}

function addBtn() {
    const addBtn = document.getElementById("addBtn");
    addBtn.style.display = "inline-block";
    addBtn.onclick = function() {
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

export { renderPage, clearForm };