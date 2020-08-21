import { renderPage, clearForm, showAlert } from "./helper.js";
import { readAll } from "./readAll.js";

function create() {
    const createForm = document.getElementById("employeeForm");
    createForm.onsubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        const yesBtn = document.getElementById("yesBtn");
        yesBtn.onclick = function() {
            fetch("php/create.php", {
                method: "post", 
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then( () => {
                clearForm();
                renderPage("directory");
                readAll();
                showAlert("success", 1);
            })
            .catch(error => {
                console.error("There has been a problem with your fetch operation:", error);
            });
        }

        const noBtn = document.getElementById("noBtn");
        noBtn.onclick = function() {
            renderPage("directory");
            readAll();
            showAlert("error", 2);
        }
    };
}

export { create };