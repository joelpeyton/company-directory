import { renderPage, clearForm} from "./helper.js";
import { readAll } from "./readAll.js";

function create(id) {
    const createForm = document.getElementById("employeeForm");
    createForm.onsubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("php/create.php", {
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
            clearForm();
        })
        .catch(error => {
            //displayAlert("Error", "employee", 7);
            console.error("There has been a problem with your fetch operation:", error);
        });
    };
}

export { create };