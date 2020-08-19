import { readAll } from "./readAll.js";
import { renderPage } from "./helper.js";

readAll();

const createBtn = document.getElementById("createBtn");
createBtn.onclick = function() {
    renderPage("add");
};
