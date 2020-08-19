function renderPage(page) {
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

export { renderPage };