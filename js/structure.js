function getDepts() {
    for (let i = 1; i <= 12; i++) {
        getDept(i);
    }
}

function getDept(id) {
    fetch("php/search.php?deptID=" + id)
    .then(response => { 
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonResponse => {
        const employees = jsonResponse.data;
        for (let i = 0; i < employees.length; i++ ) {
            let employee = employees[i].firstName + " " + employees[i].lastName;
            createStructure(employee, id);
        }
    })
    .catch(error => {
        console.error("There has been a problem with your fetch operation:", error);
    });
}

function createStructure(name, id) {
    const dept = document.getElementById(id);
    
    const div = document.createElement("div");
    div.className = "col-8 offset-3";

    const employee = document.createElement("div");
    employee.className = "structure structure-employee";
    employee.innerHTML = `<h5>${name}</h5>`;
    
    div.appendChild(employee);
    dept.appendChild(div);

    const space = document.createElement("div");
    space.className = "col-1";
    dept.appendChild(space);

    let deptCollection = dept.children;
        for (let i = 1; i < deptCollection.length; i++) {
            let child = deptCollection[i];
            child.style.display = "none";
        }
}

function toggleLocations(ids) {
    ids.forEach(id => {
        let dept = document.getElementById(id);
        if (dept.style.display == "none") {
            dept.style.display = "block";
        } else {
            dept.style.display = "none";
        }
    })
}

function structureEvents() {
    const london = document.getElementById("london");
    london.onclick = function() {
        const ids = ["1", "4", "5"];
        toggleLocations(ids); 
    }
    
    const newYork = document.getElementById("newYork");
    newYork.onclick = function() {
        const ids = ["2", "3"];
        toggleLocations(ids);
    }
    
    const paris = document.getElementById("paris");
    paris.onclick = function() {
        const ids = ["6", "7", "12"];
        toggleLocations(ids);
    }
    
    const munich = document.getElementById("munich");
    munich.onclick = function() {
        const ids = ["8", "9"];
        toggleLocations(ids);
    }
    
    const rome = document.getElementById("rome");
    rome.onclick = function() {
        const ids = ["10", "11"];
        toggleLocations(ids);
    }
    
    for (let i = 1; i <= 12; i++) {
        const dept = document.getElementById(i);
        const div = dept.querySelector(".structure-dept")
        div.onclick = function() {
            let deptCollection = dept.children;
            for (let i = 1; i < deptCollection.length; i++) {
                let child = deptCollection[i];
                if (child.style.display == "none") {
                    child.style.display = "block";
                } else {
                    child.style.display = "none";
                }
            }
        } 
    }
    
}

export {getDepts, structureEvents };


