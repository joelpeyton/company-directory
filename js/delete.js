import { renderPage, showAlert } from "./helper.js";
import { readAll } from "./readAll.js";

function deleteEmployee(id) {
    const yesBtn = document.getElementById("yesBtn");
    yesBtn.onclick = function() {    
        fetch("php/delete.php?id=" + id)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then( () => {
            renderPage("directory");
            readAll();
            showAlert("success", 5);
        })
        .catch(error => {
            console.error("There has been a problem with your fetch operation:", error);
        });
    }

    const noBtn = document.getElementById("noBtn");
    noBtn.onclick = function() {
        renderPage("directory");
        readAll();
        showAlert("error", 6);
    }
}

export { deleteEmployee };