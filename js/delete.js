import { renderPage, showAlert } from "./helper.js";
import { readAll } from "./readAll.js";

function deleteEmployee(id) {
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

export { deleteEmployee };