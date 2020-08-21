import { renderPage, showAlert } from "./helper.js";
import { readAll } from "./readAll.js";

function update(id) {
    const updateForm = document.getElementById("employeeForm");
    updateForm.onsubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        const yesBtn = document.getElementById("yesBtn");
        yesBtn.onclick = function() {    
            fetch("php/update.php?id=" + id, {
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
                renderPage("directory");
                readAll();
                showAlert("success", 3);
            })
            .catch(error => {
                console.error("There has been a problem with your fetch operation:", error);
            });  
        }

        const noBtn = document.getElementById("noBtn");
        noBtn.onclick = function() {
            renderPage("directory");
            readAll();
            showAlert("error", 4);
        }
    };
}

export { update };