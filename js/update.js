import { renderPage } from "./helper.js";
import { readAll } from "./readAll.js";

function update(id) {
    const updateForm = document.getElementById("employeeForm");
    updateForm.onsubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("php/update.php?id=" + id, {
            method: "post", 
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                //displayAlert("Error", "directory", 7);
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(jsonResponse => {
            renderPage("directory");
            readAll();
        })
        .catch(error => {
            //displayAlert("Error", "employee", 7);
            console.error("There has been a problem with your fetch operation:", error);
        });
    };
}

export { update };