import { renderPage } from "./helper.js";
import { readAll } from "./readAll.js";

function deleteEmployee(id) {
    fetch("php/delete.php?id=")
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
}

export { deleteEmployee };