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
        renderPage("employee");
        const employee = jsonResponse.data[0];
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

function renderPage(page) {
    cancelBtn();
    const directory = document.getElementById("directory");
    const employee = document.getElementById("employee");
    const container = document.querySelector(".container-fluid");

    if (page == "employee") {
        directory.style.display = "none";
        employee.style.display = "block";
        container.style.paddingLeft = "0px";
        container.style.paddingRight = "0px";
    } else {
        directory.style.display = "block";
        employee.style.display = "none";
        container.style.paddingLeft = "15px";
        container.style.paddingRight = "15px";
    }
}

function cancelBtn() {
    const cancel = document.getElementById("cancelBtn");
    cancel.onclick = function() {
        renderPage("directory");
    }
}

export { readOne };