import { getDepts, structureEvents } from "./structure.js"; 
import { nameSearch, deptSearch, locationSearch, searchEvents } from "./search.js";
import { renderPage } from "./helper.js";

// menu
menuEvents();

// structure
getDepts();
structureEvents();

// search
searchEvents();
nameSearch();
deptSearch();
locationSearch();  

// local functions
function menuEvents() {
    const structureBtn = document.getElementById("structureBtn");
    const searchBtn = document.getElementById("searchBtn");
    const createBtn = document.getElementById("createBtn");

    structureBtn.onclick = function() {
        if (!structureBtn.classList.contains("active")) {
            document.getElementById("structure").style.display = "block";
            document.getElementById("searchBar").style.display = "none";
            document.getElementById("employees").style.display = "none";
            structureBtn.classList.add("active");
            searchBtn.classList.remove("active");
        }
    }

    searchBtn.onclick = function() {
        if (!searchBtn.classList.contains("active")) {
            document.getElementById("searchBar").style.display = "block";
            document.getElementById("structure").style.display = "none";
            searchBtn.classList.add("active");
            structureBtn.classList.remove("active");
        }
    }

    createBtn.onclick = function() {
        document.getElementById("structure").style.display = "none";
        renderPage("add");
    };

}