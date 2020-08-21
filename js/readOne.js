import { renderPage } from "./helper.js";
 
function readOne(id) {
    fetch("php/readOne.php?id=" + id)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        const employee = jsonResponse.data[0];
        renderPage("edit", employee);
        displayEmployee(employee); 
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });
}

function displayEmployee(employee) {
    document.getElementById("employeeFirstName").value = employee.firstName;
    document.getElementById("employeeLastName").value = employee.lastName;
    document.getElementById("employeeJobTitle").value = employee.jobTitle;
    document.getElementById("employeeDepartment").value = employee.departmentID;
    document.getElementById("employeeEmail").value = employee.email;
}

export { readOne };