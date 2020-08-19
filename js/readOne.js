import { update } from "./update.js";
import { renderPage } from "./helper.js";

function readOne(id) {
    fetch("php/readOne.php?id=" + id)
    .then(response => {
        if (!response.ok) {
            //displayAlert("Error", "directory", 7);
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        const employee = jsonResponse.data[0];
        renderPage("employee");
        cancelBtn();
        updateBtn(employee.id);
        displayEmployee(employee); 
    })
    .catch(error => {
        //displayAlert("Error", "employee", 7);
        console.error("There has been a problem with your fetch operation:", error);
    });
}

function displayEmployee(employee) {
    document.getElementById("employeeFirstName").value = employee.firstName;
    document.getElementById("employeeLastName").value = employee.lastName;
    document.getElementById("employeeJobTitle").value = employee.jobTitle;
    document.getElementById("employeeDepartment").value = employee.departmentID;
    document.getElementById("employeeLocation").value = employee.locationID;
    document.getElementById("employeeEmail").value = employee.email;
}

function cancelBtn() {
    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.onclick = function() {
        renderPage("directory");
    }
}

function updateBtn(id) {
    const updateBtn = document.getElementById("updateBtn");
    updateBtn.onclick = function() {
        update(id);
    }
}

export { readOne };